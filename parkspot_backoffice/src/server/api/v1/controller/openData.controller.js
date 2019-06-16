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
    distance,
} from '../../../utilities';
import ParkMachines from '../../../assets/openData/park_machines';
import Prices from '../../../assets/openData/price_gent';

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


    getParkingSpots = async (req, res, next) => {
        const gentCenterGeoPoint = {
            lat: 51.053937,
            long: 3.723158,
        };
        // distance in meters
        const cityCenterMaxDistance = 1500;
        const cityEdgeMaxDistance = 3000;
        const cityOutsideMinDistance = 6000;
        const cloneMachines = {
            ...ParkMachines,
        };
        const oneZoneParkings = [];
        const priceChoiceParkings = [];
        const distanceToDestinationParkings = [];
        const bankcontactOptionParkings = [];
        let i = 0;
        cloneMachines.features.forEach((machine) => {
            if (cityEdgeMaxDistance >= distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER')) {
                // console.log(distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));
                oneZoneParkings.push(machine);
                i += 1;
            }
        });
        console.log(i);
        i = 0;
        oneZoneParkings.forEach((machine) => {
            if (req.body.settings.price_per_hour >= machine.properties.tarief.day) {
                priceChoiceParkings.push(machine);
                i += 1;
            }
        });
        console.log(i);
        i = 0;
        priceChoiceParkings.forEach((machine) => {
            if (req.body.settings.distance_from_destination >= distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER')) {
                // console.log(distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));
                distanceToDestinationParkings.push(machine);
                i += 1;
            }
        });
        console.log(i);
        i = 0;
        distanceToDestinationParkings.forEach((machine) => {
            if (req.body.settings.bankcontact === 'true') {
                if (machine.properties.Betaalmodus === 'Cashless') {
                    // console.log(distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));
                    bankcontactOptionParkings.push(machine);
                    i += 1;
                }
            } else if (machine.properties.Betaalmodus === 'Cash') {
                // console.log(distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));
                bankcontactOptionParkings.push(machine);
                i += 1;
            }
        });
        console.log(i);


        return res.status(200).json(bankcontactOptionParkings);
        // switch (machine.properties.Zone) {
        // case 'TARROOD':
        //     machine.properties.tarief = Prices.pricesPerHour[0];
        //     data.push(machine);
        //     break;
        // case 'TARORANJE':

        //     machine.properties.tarief = Prices.pricesPerHour[1];
        //     data.push(machine);
        //     // return machine;
        //     break;
        // case 'TARGEEL':
        //     machine.properties.tarief = Prices.pricesPerHour[2];
        //     data.push(machine);
        //     break;
        // case 'TARGROEN':
        //     machine.properties.tarief = Prices.pricesPerHour[3];
        //     data.push(machine);
        //     break;
        // default:
        //     break;
        // }


        // try {
        //     let topSixParkings = null;

        //     console.log(req.body);

        //     await fetch('https://datatank.stad.gent/4/mobiliteit/parkeerplaatsenpersonenmeteenbeperking.geojson')
        //         .then(response => response.json())
        //         .then((json) => {
        //             topSixParkings = json;
        //             if (topSixParkings === undefined || topSixParkings === null) {
        //                 throw new APIError(404, 'No Data for underground parking found!');
        //             }
        //             return res.status(200).json(topSixParkings);
        //         });
        // } catch (err) {
        //     return handleAPIError(500, err.message || 'Some error occurred while retrieving data', next);
        // }
    };
}

export default PostController;
