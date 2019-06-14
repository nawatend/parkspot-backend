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
    Zone,
} from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class ZoneController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const {
                limit,
                skip,
            } = req.query;
            let zones = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: {
                        created_at: -1,
                    },
                };
                zones = await Zone.paginate({}, options);
            } else {
                zones = await Zone.find().sort({
                    created_at: -1,
                }).exec();
            }

            if (zones === undefined || zones === null) {
                throw new APIError(404, 'Collection for zones not found!');
            }
            return res.status(200).json(zones);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving zones', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const item = await Zone.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Zone with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving zones', next);
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
            const zoneCreate = new Zone({
                name: req.body.name,

            });
            const zone = await zoneCreate.save();
            return res.status(201).json(zone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Zone!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const zone = await Zone.findById(id).exec();

            if (!zone) {
                throw new APIError(404, `Zone with id: ${id} not found!`);
            } else {
                const vm = {
                    zone,
                    zones: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Zone with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const zoneUpdate = req.body;
            const zone = await Zone.findOneAndUpdate({
                _id: id,
            }, zoneUpdate, {
                new: true,
            }).exec();

            if (!zone) {
                throw new APIError(404, `Zone with id: ${id} not found!`);
            }
            return res.status(200).json(zone);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Zone with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            let favorite = null;

            let {
                mode,
            } = req.query;
            if (mode) {
                favorite = await Zone.findByIdAndUpdate({
                    _id: id,
                }, {
                    deleted_at: (mode === 'softdelete' ? Date.now() : null),
                }, {
                    new: true,
                });
            } else {
                mode = 'delete';
                favorite = await Zone.findOneAndDelete({
                    _id: id,
                });
            }

            if (!favorite) {
                throw new APIError(404, `Zone with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the Zone with id: ${id}!`,
                    favorite,
                    mode,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Zone with id: ${id}!`, next);
        }
    }
}

export default ZoneController;
