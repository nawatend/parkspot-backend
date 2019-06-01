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
    Country,
} from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class CountryController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const {
                limit,
                skip,
            } = req.query;
            let countries = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: {
                        created_at: -1,
                    },
                };
                countries = await Country.paginate({}, options);
            } else {
                countries = await Country.find().sort({
                    created_at: -1,
                }).exec();
            }

            if (countries === undefined || countries === null) {
                throw new APIError(404, 'Collection for countries not found!');
            }
            return res.status(200).json(countries);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving countries', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const item = await Country.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Country with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving countries', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            countries: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const countryCreate = new Country({
                name: req.body.name,

            });
            const country = await countryCreate.save();
            return res.status(201).json(country);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Country!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const country = await Country.findById(id).exec();

            if (!country) {
                throw new APIError(404, `Country with id: ${id} not found!`);
            } else {
                const vm = {
                    country,
                    countries: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Country with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const countryUpdate = req.body;
            const country = await Country.findOneAndUpdate({
                _id: id,
            }, countryUpdate, {
                new: true,
            }).exec();

            if (!country) {
                throw new APIError(404, `Country with id: ${id} not found!`);
            }
            return res.status(200).json(country);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Country with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const country = await Country.findOneAndRemove({
                _id: id,
            });

            if (!country) {
                throw new APIError(404, `Country with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the Country with id: ${id}!`,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Country with id: ${id}!`, next);
        }
    }
}

export default CountryController;
