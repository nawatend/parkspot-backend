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
    HomeAddress,
} from '../database';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';

class HomeAddressController {
    // List all the models
    index = async (req, res, next) => {
        try {
            // const { limit, skip } = req.query;
            let homeAddresses = null;

            homeAddresses = await HomeAddress.find().sort({
                created_at: -1,
            }).exec();
            if (homeAddresses === undefined || homeAddresses === null) {
                throw new APIError(404, 'Collection for homeAddresses not found!');
            }
            return res.status(200).json(homeAddresses);
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving homeAddresses', next);
        }
    };

    // Show specific model by id
    show = async (req, res, next) => {
        try {
            const {
                id,
            } = req.params;
            const homeAddress = await HomeAddress.findById(id).exec();
            if (homeAddress === undefined || homeAddress === null) {
                throw new APIError(404, `HomeAddress with id: ${id} not found!`);
            }
            return res.status(200).json(homeAddress);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while retrieving homeAddresses', next);
        }
    }

    // ViewModel for Insert / Create
    create = (req, res) => {
        const vm = {
            homeAddressData: [],
        };
        return res.status(200).json(vm);
    }

    // Store / Create the new model
    store = async (req, res, next) => {
        try {
            const homeAddressCreate = new HomeAddress({
                user_id: req.body.user_id,
                address: req.body.address,
            });
            const homeAddress = await homeAddressCreate.save();

            console.log('HomeAddress created');
            return res.status(201).json(homeAddress);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || 'Some error occurred while saving the HomeAddress!', next);
        }
    }

    // ViewModel for Edit / Update
    edit = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const homeAddress = await HomeAddress.findById(id).exec();

            if (!homeAddress) {
                throw new APIError(404, `HomeAddress with id: ${id} not found!`);
            } else {
                const vm = {
                    homeAddress,
                    homeAddressData: [],

                };
                return res.status(200).json(vm);
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the HomeAddress with id: ${id}!`, next);
        }
    }

    // Update the model
    update = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            const homeAddressUpdate = req.body;
            const homeAddress = await HomeAddress.findOneAndUpdate({
                _id: id,
            }, homeAddressUpdate, {
                new: true,
            }).exec();

            if (!homeAddress) {
                throw new APIError(404, `HomeAddress with id: ${id} not found!`);
            }
            return res.status(200).json(homeAddress);
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the HomeAddress with id: ${id}!`, next);
        }
    }

    // Delete / Destroy the model
    destroy = async (req, res, next) => {
        const {
            id,
        } = req.params;

        try {
            let homeAddress = null;

            let {
                mode,
            } = req.query;
            if (mode) {
                homeAddress = await HomeAddress.findByIdAndUpdate({
                    _id: id,
                }, {
                    deleted_at: (mode === 'softdelete' ? Date.now() : null),
                }, {
                    new: true,
                });
            } else {
                mode = 'delete';
                homeAddress = await HomeAddress.findOneAndDelete({
                    _id: id,
                });
            }

            if (!homeAddress) {
                throw new APIError(404, `HomeAddress with id: ${id} not found!`);
            } else {
                return res.status(200).json({
                    message: `Successful deleted the HomeAddress with id: ${id}!`,
                    homeAddress,
                    mode,
                });
            }
        } catch (err) {
            return handleAPIError(err.status || 500, err.message || `Some error occurred while deleting the HomeAddress with id: ${id}!`, next);
        }
    }
}

export default HomeAddressController;
