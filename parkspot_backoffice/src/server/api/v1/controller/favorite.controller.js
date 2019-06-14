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
    Favorite,
} from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class FavoriteController {
    // List all the models
    index = async (req, res, next) => {
        try {
            // const { limit, skip } = req.query;
            let favorites = null;

            favorites = await Favorite.find().sort({
                created_at: -1,
            }).exec();
            if (favorites === undefined || favorites === null) {
                throw new APIError(404, 'Collection for favorites not found!');
            }
            return res.status(200).json(favorites);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving favorites', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const favorite = await Favorite.findById(id).exec();
            if (favorite === undefined || favorite === null) {
                throw new APIError(404, `Favorite with id: ${id} not found!`);
            }
            return res.status(200).json(favorite);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving favorites', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            favoriteData: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const favoriteCreate = new Favorite({
                user_id: req.body.user_id,
                address: req.body.address,
            });
            const favorite = await favoriteCreate.save();

            console.log('Favorite created');
            return res.status(201).json(favorite);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the Favorite!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const favorite = await Favorite.findById(id).exec();

            if (!favorite) {
                throw new APIError(404, `Favorite with id: ${id} not found!`);
            } else {
                const vm = {
                    favorite,
                    favoriteData: [],

                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Favorite with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const favoriteUpdate = req.body;
            const favorite = await Favorite.findOneAndUpdate({
                _id: id,
            }, favoriteUpdate, {
                new: true,
            }).exec();

            if (!favorite) {
                throw new APIError(404, `Favorite with id: ${id} not found!`);
            }
            return res.status(200).json(favorite);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Favorite with id: ${id}!`, next);
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
                favorite = await Favorite.findByIdAndUpdate({
                    _id: id,
                }, {
                    deleted_at: (mode === 'softdelete' ? Date.now() : null),
                }, {
                    new: true,
                });
            } else {
                mode = 'delete';
                favorite = await Favorite.findOneAndDelete({
                    _id: id,
                });
            }

            if (!favorite) {
                throw new APIError(404, `Favorite with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the Favorite with id: ${id}!`,
                    favorite,
                    mode,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the Favorite with id: ${id}!`, next);
        }
    }
}

export default FavoriteController;
