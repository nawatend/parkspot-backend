/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import { Setting } from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class SettingController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const {
                limit,
                skip,
            } = req.query;
            let settings = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    populate: 'zone',
                    sort: {
                        created_at: -1,
                    },
                };
                settings = await Setting.paginate({}, options);
            } else {
                settings = await Setting.find().populate('zone').sort({
                    created_at: -1,
                }).exec();
            }

            if (settings === undefined || settings === null) {
                throw new APIError(404, 'Collection for settings not found!');
            }
            return res.status(200).json(settings);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving settings', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const item = await Setting.findById(id).populate('zone').exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Setting with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving settings', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            zones: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const settingCreate = new Setting({
                user_id: req.body.user_id,
                zoneId: req.body.zoneId,
                price_per_hour: req.body.price_per_hour,
                distance_from_destination: req.body.distance_from_destination,
                bankcontact: req.body.bankcontact,
                low_emission_zone: req.body.low_emission_zone,
                underground: req.body.underground,
            });
            const setting = await settingCreate.save();
            console.log('Settings stored');
            return res.status(201).json(setting);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Setting!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const setting = await Setting.findById(id).exec();

            if (!setting) {
                throw new APIError(404, `Setting with id: ${id} not found!`);
            } else {
                const vm = {
                    setting,
                    zones: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Setting with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            console.log(req.body);
            const settingUpdate = req.body;
            const setting = await Setting.findOneAndUpdate({
                _id: id,
            }, settingUpdate, {
                new: true,
            }).exec();


            if (!setting) {
                throw new APIError(404, `Setting with id: ${id} not found!`);
            }
            return res.status(200).json(setting);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Setting with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            let setting = null;

            let {
                mode,
            } = req.query;
            if (mode) {
                setting = await Setting.findByIdAndUpdate({
                    _id: id,
                }, {
                    deleted_at: (mode === 'softdelete' ? Date.now() : null),
                }, {
                    new: true,
                });
            } else {
                mode = 'delete';
                setting = await Setting.findOneAndRemove({
                    _id: id,
                });
            }

            if (!setting) {
                throw new APIError(404, `Setting with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the Setting with id: ${id}!`,
                    setting,
                    mode,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Setting with id: ${id}!`, next);
        }
    }
}

export default SettingController;
