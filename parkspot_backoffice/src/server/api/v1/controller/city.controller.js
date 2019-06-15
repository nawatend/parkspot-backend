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
    City,
} from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class CityController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const {
                limit,
                skip,
            } = req.query;
            let cities = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: {
                        created_at: -1,
                    },
                };
                cities = await City.paginate({}, options);
            } else {
                cities = await City.find().sort({
                    created_at: -1,
                }).exec();
            }

            if (cities === undefined || cities === null) {
                throw new APIError(404, 'Collection for cities not found!');
            }
            return res.status(200).json(cities);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving cities', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const item = await City.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `City with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving cities', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            cities: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const cityCreate = new City({
                name: req.body.name,

            });
            const city = await cityCreate.save();
            return res.status(201).json(city);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the City!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const city = await City.findById(id).exec();

            if (!city) {
                throw new APIError(404, `City with id: ${id} not found!`);
            } else {
                const vm = {
                    city,
                    cities: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the City with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const cityUpdate = req.body;
            const city = await City.findOneAndUpdate({
                _id: id,
            }, cityUpdate, {
                new: true,
            }).exec();

            if (!city) {
                throw new APIError(404, `City with id: ${id} not found!`);
            }
            return res.status(200).json(city);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the City with id: ${id}!`, next);
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
                favorite = await City.findByIdAndUpdate({
                    _id: id,
                }, {
                    deleted_at: (mode === 'softdelete' ? Date.now() : null),
                }, {
                    new: true,
                });
            } else {
                mode = 'delete';
                favorite = await City.findOneAndDelete({
                    _id: id,
                });
            }

            if (!favorite) {
                throw new APIError(404, `City with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the City with id: ${id}!`,
                    favorite,
                    mode,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the City with id: ${id}!`, next);
        }
    }
}

export default CityController;
