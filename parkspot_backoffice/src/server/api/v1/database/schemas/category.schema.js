import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const {
    Schema,
} = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 128,
    },
    description: {
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
    published_at: {
        type: Date,
        required: false,
    },
    deleted_at: {
        type: Date,
        required: false,
    },
    parentCategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
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

CategorySchema.methods.slugify = function () {
    this.slug = slug(this.name);
};
CategorySchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

CategorySchema.virtual('id').get(function () {
    return this._id;
});
CategorySchema.virtual('subCategories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parentCategoryId',
    justOne: false,
});

CategorySchema.plugin(mongoosePaginate);
export default mongoose.model('Category', CategorySchema);
