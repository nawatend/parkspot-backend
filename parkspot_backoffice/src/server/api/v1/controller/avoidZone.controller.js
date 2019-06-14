/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import {
    AvoidZone,
} from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class AvoidZoneController {
    // List all the models
    index = async (req, res, next) => {
        try {
            // const { limit, skip } = req.query;
            let avoidZones = null;

            avoidZones = await AvoidZone.find().sort({
                created_at: -1,
            }).exec();
            if (avoidZones === undefined || avoidZones === null) {
                throw new APIError(404, 'Collection for avoidZones not found!');
            }
            return res.status(200).json(avoidZones);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving avoidZones', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const avoidZone = await AvoidZone.findById(id).exec();
            if (avoidZone === undefined || avoidZone === null) {
                throw new APIError(404, `AvoidZone with id: ${id} not found!`);
            }
            return res.status(200).json(avoidZone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving avoidZones', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            avoidZoneData: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const avoidZoneCreate = new AvoidZone({
                user_id: req.body.user_id,
                address: req.body.address,
            });
            const avoidZone = await avoidZoneCreate.save();

            console.log('AvoidZone created');
            return res.status(201).json(avoidZone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the AvoidZone!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const avoidZone = await AvoidZone.findById(id).exec();

            if (!avoidZone) {
                throw new APIError(404, `AvoidZone with id: ${id} not found!`);
            } else {
                const vm = {
                    avoidZone,
                    avoidZoneData: [],

                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the AvoidZone with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const avoidZoneUpdate = req.body;
            const avoidZone = await AvoidZone.findOneAndUpdate({
                _id: id,
            }, avoidZoneUpdate, {
                new: true,
            }).exec();

            if (!avoidZone) {
                throw new APIError(404, `AvoidZone with id: ${id} not found!`);
            }
            return res.status(200).json(avoidZone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the AvoidZone with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            let avoidZone = null;

            let {
                mode,
            } = req.query;
            if (mode) {
                avoidZone = await AvoidZone.findByIdAndUpdate({
                    _id: id,
                }, {
                    deleted_at: (mode === 'softdelete' ? Date.now() : null),
                }, {
                    new: true,
                });
            } else {
                mode = 'delete';
                avoidZone = await AvoidZone.findOneAndDelete({
                    _id: id,
                });
            }

            if (!avoidZone) {
                throw new APIError(404, `AvoidZone with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the AvoidZone with id: ${id}!`,
                    avoidZone,
                    mode,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the AvoidZone with id: ${id}!`, next);
        }
    }
}

export default AvoidZoneController;
