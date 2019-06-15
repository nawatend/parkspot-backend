import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


const { Schema } = mongoose;
mongoose.set('useFindAndModify', false);

const CityZoneSchema = new Schema(
    {
        cityId: { type: Schema.Types.ObjectId, ref: 'City', required: false },

        zoneId: {
            type: Schema.Types.ObjectId,
            ref: 'Zone',
            required: false,
        },


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


CityZoneSchema.pre('validate', next => next());

CityZoneSchema.virtual('id').get(function () { return this._id; });


CityZoneSchema.virtual('city', {
    ref: 'City',
    localField: 'cityId',
    foreignField: '_id',
    justOne: true,
});
CityZoneSchema.virtual('zone', {
    ref: 'Zone',
    localField: 'zoneId',
    foreignField: '_id',
    justOne: true,
});
CityZoneSchema.plugin(mongoosePaginate);
export default mongoose.model('CityZone', CityZoneSchema);
