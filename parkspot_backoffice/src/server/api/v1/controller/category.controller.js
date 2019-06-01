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
    Category,
} from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class CategoryController {
    // List all the models
    index = async (req, res, next) => {
        try {
            const {
                limit,
                skip,
            } = req.query;
            let categories = null;
            if (limit && skip) {
                const options = {
                    page: parseInt(skip, 10) || 1,
                    limit: parseInt(limit, 10) || 10,
                    sort: {
                        created_at: -1,
                    },
                };
                categories = await Category.paginate({}, options);
            } else {
                categories = await Category.find().sort({
                    created_at: -1,
                }).exec();
            }

            if (categories === undefined || categories === null) {
                throw new APIError(404, 'Collection for categories not found!');
            }
            return res.status(200).json(categories);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving categories', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const item = await Category.findById(id).exec();
            if (item === undefined || item === null) {
                throw new APIError(404, `Category with id: ${id} not found!`);
            }
            return res.status(200).json(item);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving categories', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            categories: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const categoryCreate = new Category({
                title: req.body.title,
                synopsis: req.body.synopsis,
                body: req.body.body,
            });
            const category = await categoryCreate.save();
            return res.status(201).json(category);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Category!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const category = await Category.findById(id).exec();

            if (!category) {
                throw new APIError(404, `Category with id: ${id} not found!`);
            } else {
                const vm = {
                    category,
                    categories: [],
                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Category with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const categoryUpdate = req.body;
            const category = await Category.findOneAndUpdate({
                _id: id,
            }, categoryUpdate, {
                new: true,
            }).exec();

            if (!category) {
                throw new APIError(404, `Category with id: ${id} not found!`);
            }
            return res.status(200).json(category);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Category with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const category = await Category.findOneAndRemove({
                _id: id,
            });

            if (!category) {
                throw new APIError(404, `Category with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the Category with id: ${id}!`,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Category with id: ${id}!`, next);
        }
    }
}

export default CategoryController;
