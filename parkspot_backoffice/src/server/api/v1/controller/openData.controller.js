/*
Import the external libraries:
- uuidv4
*/

/*
Import the internal libraries:
- * from database
- errorHandler
*/
import fetch from 'node-fetch';
import {
    APIError,
    handleAPIError,
} from '../../../utilities';


class PostController {
    // List all the models
    getUnderground = async (req, res, next) => {
        try {
            let data = null;

            await fetch('https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json')
                .then(response => response.json())
                .then((json) => {
                    data = json;
                    if (data === undefined || data === null) {
                        throw new APIError(404, 'No Data for underground parking found!');
                    }
                    return res.status(200).json(data);
                });
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving data', next);
        }
    };


    getParkAndRide = async (req, res, next) => {
        try {
            let data = null;

            await fetch('https://datatank.stad.gent/4/mobiliteit/parkinglocaties')
                .then(response => response.json())
                .then((json) => {
                    data = json;
                    if (data === undefined || data === null) {
                        throw new APIError(404, 'No Data for underground parking found!');
                    }
                    return res.status(200).json(data);
                });
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving data', next);
        }
    };

    getGentZones = async (req, res, next) => {
        try {
            let data = null;

            await fetch('https://datatank.stad.gent/4/mobiliteit/parkeertariefzonestoekomstig')
                .then(response => response.json())
                .then((json) => {
                    data = json;
                    if (data === undefined || data === null) {
                        throw new APIError(404, 'No Data for underground parking found!');
                    }
                    return res.status(200).json(data);
                });
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving data', next);
        }
    };


    getElectricPark = async (req, res, next) => {
        try {
            let data = null;

            await fetch('https://datatank.stad.gent/4/mobiliteit/deelwagenspartago.json')
                .then(response => response.json())
                .then((json) => {
                    data = json;
                    if (data === undefined || data === null) {
                        throw new APIError(404, 'No Data for underground parking found!');
                    }
                    return res.status(200).json(data);
                });
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving data', next);
        }
    };

    getHandicapPark = async (req, res, next) => {
        try {
            let data = null;

            await fetch('https://datatank.stad.gent/4/mobiliteit/parkeerplaatsenpersonenmeteenbeperking.geojson')
                .then(response => response.json())
                .then((json) => {
                    data = json;
                    if (data === undefined || data === null) {
                        throw new APIError(404, 'No Data for underground parking found!');
                    }
                    return res.status(200).json(data);
                });
        } catch (err) {
            return handleAPIError(500, err.message || 'Some error occurred while retrieving data', next);
        }
    };
}

export default PostController;
