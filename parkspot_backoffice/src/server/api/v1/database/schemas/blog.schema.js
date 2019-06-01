import mongoose from 'mongoose';
import slug from 'slug';

const { Schema } = mongoose;

const BlogSchema = new Schema(
    {
        title: { type: String, required: true, max: 128 },
        description: { type: String, required: true, max: 512 },
        slug: {
            type: String, lowercase: true, unique: true, required: true,
        },
        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post', required: false }],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

BlogSchema.methods.slugify = function () {
    this.slug = slug(this.title);
};

BlogSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

BlogSchema.virtual('id').get(function () { return this._id; });

export default mongoose.model('Blog', BlogSchema);
