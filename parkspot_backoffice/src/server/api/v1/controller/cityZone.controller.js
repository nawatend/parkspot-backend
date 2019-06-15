/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { CityZone } from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class CityZoneController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const {
                limit,
                skip,
            } = req.query;
            let cityZones = null;
            if (limit && skip) {
                // const options = {
                //     page: parseInt(skip, 10) || 1,
                //     limit: parseInt(limit, 10) || 10,
                //     populate: 'info',
                //     sort: {
                //         created_at: -1,
                //     },
                // };
                // cityZones = await CityZone.paginate({}, options);
            } else {
                cityZones = await CityZone.find().populate('city').populate('zone').sort({
                    created_at: -1,
                })
                    .exec();
            }


            if (cityZones === undefined || cityZones === null) {
                throw new APIError(404, 'Collection for cityZones not found!');
            }
            return res.status(200).json(cityZones);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving cityZones', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const item = await CityZone.findById(id).populate('zone').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `CityZone with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving cityZones', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            zones: [],
            cities: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        console.log('CityZones stored');
        try {
            const cityZoneCreate = new CityZone({
                cityId: req.body.cityId,
                zoneId: req.body.zoneId,

            });
            const cityZone = await cityZoneCreate.save();

            return res.status(201).json(cityZone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the CityZone!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const cityZone = await CityZone.findById(id).exec();

            if (!cityZone) {
                throw new APIError(404, `CityZone with id: ${id} not found!`);
            } else {
                const vm = {
                    cityZone,
                    zones: [],
                    cities: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the CityZone with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            // console.log(req.body);
            const cityZoneUpdate = req.body;
            const cityZone = await CityZone.findOneAndUpdate({
                _id: id,
            }, cityZoneUpdate, {
                new: true,
            }).exec();


            if (!cityZone) {
                throw new APIError(404, `CityZone with id: ${id} not found!`);
            }
            return res.status(200).json(cityZone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the CityZone with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            let cityZone = null;

            let {
                mode,
            } = req.query;
            if (mode) {
                cityZone = await CityZone.findByIdAndUpdate({
                    _id: id,
                }, {
                    deleted_at: (mode === 'softdelete' ? Date.now() : null),
                }, {
                    new: true,
                });
            } else {
                mode = 'delete';
                cityZone = await CityZone.findOneAndRemove({
                    _id: id,
                });
            }

            if (!cityZone) {
                throw new APIError(404, `CityZone with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the CityZone with id: ${id}!`,
                    cityZone,
                    mode,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the CityZone with id: ${id}!`, next);
        }
    }
}

export default CityZoneController;
