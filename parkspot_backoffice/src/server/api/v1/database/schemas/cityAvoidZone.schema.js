import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


const { Schema } = mongoose;
mongoose.set('useFindAndModify', false);

const CityAvoidZoneSchema = new Schema(
    {
        cityId: { type: Schema.Types.ObjectId, ref: 'City', required: false },

        avoidZoneId: {
            type: Schema.Types.ObjectId,
            ref: 'AvoidZone',
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


CityAvoidZoneSchema.pre('validate', next => next());

CityAvoidZoneSchema.virtual('id').get(function () { return this._id; });


CityAvoidZoneSchema.virtual('city', {
    ref: 'City',
    localField: 'cityId',
    foreignField: '_id',
    justOne: true,
});
CityAvoidZoneSchema.virtual('avoidZone', {
    ref: 'AvoidZone',
    localField: 'avoidZoneId',
    foreignField: '_id',
    justOne: true,
});
CityAvoidZoneSchema.plugin(mongoosePaginate);
export default mongoose.model('CityAvoidZone', CityAvoidZoneSchema);
