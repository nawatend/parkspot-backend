import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


const {
    Schema,
} = mongoose;

const CountrySchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 128,
    },
    shortForm: {
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

CountrySchema.methods.makeShortForm = function () {
    this.shortForm = this.name.substring(0, 2);
};
CountrySchema.pre('validate', function (next) {
    this.makeShortForm();

    return next();
});

CountrySchema.virtual('id').get(function () {
    return this._id;
});


CountrySchema.plugin(mongoosePaginate);
export default mongoose.model('Country', CountrySchema);
