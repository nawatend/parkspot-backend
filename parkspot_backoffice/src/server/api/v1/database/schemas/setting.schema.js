import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import slug from 'slug';

const { Schema } = mongoose;

const ZoneSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },

        zoneId: {
            type: Schema.Types.ObjectId,
            default: '1',
            ref: 'Zone',
            required: true,
        },
        price_per_hour: { type: Number, min: 0, max: 10 },
        distance_from_destination: { type: Number, min: 0, max: 1000 },
        bankContact: { type: Boolean, default: false },
        low_emission_zonen: { type: Boolean, default: false },
        underground: { type: Boolean, default: false },

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


ZoneSchema.pre('validate', next => next());

ZoneSchema.virtual('id').get(function () { return this._id; });
ZoneSchema.virtual('zone', {
    ref: 'Zone',
    localField: 'zoneId',
    foreignField: '_id',
    justOne: true,
});

ZoneSchema.plugin(mongoosePaginate);
export default mongoose.model('Zone', ZoneSchema);
