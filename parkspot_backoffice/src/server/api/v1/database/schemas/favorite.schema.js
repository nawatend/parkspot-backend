import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


const {
    Schema,
} = mongoose;

const FavoriteSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        max: 128,
    },
    address: {
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

FavoriteSchema.methods.makeShortForm = function () {
    this.shortForm = this.name.substring(0, 2);
};
FavoriteSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.makeShortForm();
    }
    return next();
});

FavoriteSchema.virtual('id').get(function () {
    return this._id;
});


FavoriteSchema.plugin(mongoosePaginate);
export default mongoose.model('Favorite', FavoriteSchema);
