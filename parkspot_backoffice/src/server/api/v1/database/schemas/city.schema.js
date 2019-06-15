import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const {
    Schema,
} = mongoose;

const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 128,
    },
    slug: {
        type: String, lowercase: true, required: true,
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

CitySchema.methods.slugify = function () {
    this.slug = slug(this.name);
};

CitySchema.methods.makeShortForm = function () {
    this.shortForm = this.name.substring(0, 2);
};
CitySchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

CitySchema.virtual('id').get(function () {
    return this._id;
});


CitySchema.plugin(mongoosePaginate);
export default mongoose.model('City', CitySchema);
