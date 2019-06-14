import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import slug from 'slug';


const {
    Schema,
} = mongoose;

const ZoneSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 128,
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

ZoneSchema.methods.slugify = function () {
    this.slug = slug(this.name);
};

ZoneSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

ZoneSchema.virtual('id').get(function () {
    return this._id;
});


ZoneSchema.plugin(mongoosePaginate);
export default mongoose.model('Zone', ZoneSchema);
