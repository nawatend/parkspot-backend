/*
Import external libraries:
- config
*/
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';
import bcrypt from 'bcrypt';

/*
Import internal libraries:
- config
*/
import config from '../../../../config';

/*
Constants
*/
const {
    Schema,
} = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    localProvider: {
        password: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },

    facebookProvider: {
        id: {
            type: String,
            required: false,
        },
        token: {
            type: String,
            required: false,
        },
    },
    published_at: {
        type: Date,
        required: false,
    },
    deleted_at: {
        type: Date,
        required: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

UserSchema.methods.slugify = function () {
    this.slug = slug(this.email);
};

UserSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

UserSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('localProvider.password')) return next();

    try {
        return bcrypt.genSalt(config.auth.bcrypt.SALT_WORK_FACTOR, (errSalt, salt) => {
            if (errSalt) throw errSalt;

            // console.log(user.localProvider.password);
            return bcrypt.hash(user.localProvider.password, salt, (errHash, hash) => {
                if (errHash) throw errHash;

                user.localProvider.password = hash;
                return next();
            });
        });
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    const user = this;
    
    bcrypt.compare(candidatePassword, user.localProvider.password, (err, isMatch) => {
        if (err) {
            console.log(err);
            return cb(err, null);
        }
        // console.log(isMatch);
        return cb(null, isMatch);
    });
};

UserSchema.virtual('id').get(function () {
    return this._id;
});

UserSchema.plugin(mongoosePaginate);
export default mongoose.model('User', UserSchema);
