import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const {
    Schema,
} = mongoose;

const AvoidZoneSchema = new Schema({

    name: {
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

AvoidZoneSchema.methods.slugify = function () {
    this.slug = slug(this.address);
};

AvoidZoneSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

AvoidZoneSchema.virtual('id').get(function () {
    return this._id;
});


AvoidZoneSchema.plugin(mongoosePaginate);
export default mongoose.model('AvoidZone', AvoidZoneSchema);
