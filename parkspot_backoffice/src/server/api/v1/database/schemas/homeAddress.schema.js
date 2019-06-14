import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const {
    Schema,
} = mongoose;

const HomeAddressSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true,
        max: 512,
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
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

HomeAddressSchema.methods.slugify = function () {
    this.slug = slug(this.address);
};

HomeAddressSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

HomeAddressSchema.virtual('id').get(function () {
    return this._id;
});


HomeAddressSchema.plugin(mongoosePaginate);
export default mongoose.model('HomeAddress', HomeAddressSchema);
