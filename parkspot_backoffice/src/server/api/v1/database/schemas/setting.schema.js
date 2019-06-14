import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

const ZoneSchema = new Schema(
    {

        zoneId: { type: Schema.Types.ObjectId, ref: 'Zone', required: false },
        avoidZoneId: { type: Schema.Types.ObjectId, ref: 'AvoidZone', required: false },
        pricePerHour: { type: Number, min: 0, max: 10 },
        distanceFromDestination: { type: Number, min: 0, max: 1000 },
        bankContact: { type: Boolean, default: false },

        published_at: { type: Date, required: false },
        deleted_at: { type: Date, required: false },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

ZoneSchema.methods.slugify = function () {
    this.slug = slug(this.title);
};

ZoneSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    return next();
});

ZoneSchema.virtual('id').get(function () { return this._id; });
ZoneSchema.virtual('zone', {
    ref: 'Zone',
    localField: 'zoneId',
    foreignField: '_id',
    justOne: true,
});

ZoneSchema.plugin(mongoosePaginate);
export default mongoose.model('Zone', ZoneSchema);
