import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


const { Schema } = mongoose;
mongoose.set('useFindAndModify', false);

const SettingSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },

        zoneId: {
            type: Schema.Types.ObjectId,
            ref: 'Zone',
            required: false,
        },
        price_per_hour: { type: Number, min: 0, max: 10 },
        distance_from_destination: { type: Number, min: 0, max: 1000 },
        bankcontact: { type: Boolean, default: false },
        low_emission_zone: { type: Boolean, default: false },
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


SettingSchema.pre('validate', next => next());

SettingSchema.virtual('id').get(function () { return this._id; });
SettingSchema.virtual('zone', {
    ref: 'Zone',
    localField: 'zoneId',
    foreignField: '_id',
    justOne: true,
});

SettingSchema.plugin(mongoosePaginate);
export default mongoose.model('Setting', SettingSchema);
