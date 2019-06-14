import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const {
    Schema,
} = mongoose;

const FavoriteSchema = new Schema({
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

FavoriteSchema.methods.slugify = function () {
    this.slug = slug(this.address);
};

FavoriteSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

FavoriteSchema.virtual('id').get(function () {
    return this._id;
});


FavoriteSchema.plugin(mongoosePaginate);
export default mongoose.model('Favorite', FavoriteSchema);
