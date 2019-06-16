/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { CityAvoidZone } from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class CityAvoidZoneController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const {
                limit,
                skip,
            } = req.query;
            let cityAvoidZones = null;
            if (limit && skip) {
                // const options = {
                //     page: parseInt(skip, 10) || 1,
                //     limit: parseInt(limit, 10) || 10,
                //     populate: 'info',
                //     sort: {
                //         created_at: -1,
                //     },
                // };
                // cityAvoidZones = await CityAvoidZone.paginate({}, options);
            } else {
                cityAvoidZones = await CityAvoidZone.find().populate('city').populate('avoidZone').sort({
                    created_at: -1,
                })
                    .exec();
            }


            if (cityAvoidZones === undefined || cityAvoidZones === null) {
                throw new APIError(404, 'Collection for cityAvoidZones not found!');
            }
            return res.status(200).json(cityAvoidZones);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving cityAvoidZones', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const item = await CityAvoidZone.findById(id).populate('avoidZone').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `CityAvoidZone with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving cityAvoidZones', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            avoidZones: [],
            cities: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        console.log('CityAvoidZones stored');
        try {
            const cityAvoidZoneCreate = new CityAvoidZone({
                cityId: req.body.cityId,
                avoidZoneId: req.body.avoidZoneId,

            });
            const cityAvoidZone = await cityAvoidZoneCreate.save();

            return res.status(201).json(cityAvoidZone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the CityAvoidZone!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const cityAvoidZone = await CityAvoidZone.findById(id).exec();

            if (!cityAvoidZone) {
                throw new APIError(404, `CityAvoidZone with id: ${id} not found!`);
            } else {
                const vm = {
                    cityAvoidZone,
                    avoidZones: [],
                    cities: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the CityAvoidZone with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            // console.log(req.body);
            const cityAvoidZoneUpdate = req.body;
            const cityAvoidZone = await CityAvoidZone.findOneAndUpdate({
                _id: id,
            }, cityAvoidZoneUpdate, {
                new: true,
            }).exec();


            if (!cityAvoidZone) {
                throw new APIError(404, `CityAvoidZone with id: ${id} not found!`);
            }
            return res.status(200).json(cityAvoidZone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the CityAvoidZone with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            let cityAvoidZone = null;

            let {
                mode,
            } = req.query;
            if (mode) {
                cityAvoidZone = await CityAvoidZone.findByIdAndUpdate({
                    _id: id,
                }, {
                    deleted_at: (mode === 'softdelete' ? Date.now() : null),
                }, {
                    new: true,
                });
            } else {
                mode = 'delete';
                cityAvoidZone = await CityAvoidZone.findOneAndRemove({
                    _id: id,
                });
            }

            if (!cityAvoidZone) {
                throw new APIError(404, `CityAvoidZone with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the CityAvoidZone with id: ${id}!`,
                    cityAvoidZone,
                    mode,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the CityAvoidZone with id: ${id}!`, next);
        }
    }
}

export default CityAvoidZoneController;
