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
    LocalStorage,
} from 'node-localstorage';

import fetch from 'node-fetch';
import {
    APIError,
    handleAPIError,
    distance,
    compare,
    toOneJSONStructure,
    ascendArray,
} from '../../../utilities';
import ParkMachines from '../../../assets/openData/park_machines';

const localStorage = new LocalStorage('./scratch');

/* ///////////////////////////////////////////////////////////////
machine = parking automate, parkings underground, P&R

*/ // ////////////////////////////////////////////////////////////

const getTop6UndergroundParkings = async (body, next) => {
    try {
        const data = [];

        await fetch('https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json')
            .then(response => response.json())
            .then((json) => {
                if (data === undefined || data === null) {
                    throw new APIError(404, 'No Data for underground parking found!');
                }


                json.forEach((machine) => {
                    if (body.settings.distance_from_destination
                        >= distance(body.destinationGeo.lat, body.destinationGeo.long, machine.latitude, machine.longitude, 'METER')) {
                        // console.log(distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));

                        data.push({
                            address: machine.address,
                            name: machine.name,
                            coordinates: {
                                lat: machine.latitude,
                                long: machine.longitude,
                            },
                            price: {
                                day: 1.8,
                                night: 1.8,
                            },
                            open: '24/7',
                            chance: (machine.parkingStatus.availableCapacity / machine.parkingStatus.totalCapacity) * 100,
                            type: 'Underground',
                            onFootDistance: distance(body.destinationGeo.lat, body.destinationGeo.long, machine.latitude, machine.longitude, 'METER'),
                        });
                    }
                });


                localStorage.setItem('undergroundParks', '');
                localStorage.setItem('undergroundParks', JSON.stringify(data));
                // console.log(data);
                return data;
            });
    } catch (err) {
        return handleAPIError(500, err.message || 'Some error occurred while retrieving data', next);
    }
};

const getTop6ParkAndRide = async (body, next) => {
    try {
        const data = [];

        await fetch('https://datatank.stad.gent/4/mobiliteit/parkinglocaties')
            .then(response => response.json())
            .then((json) => {
                if (data === undefined || data === null) {
                    throw new APIError(404, 'No Data for underground parking found!');
                }
                /* ///////////////////////////////////////////////////////////////
                !!machine = parking automate, parkings underground, P&R
                */ // ////////////////////////////////////////////////////////////
                json.coordinates.forEach((machine) => {
                    if (body.settings.distance_from_destination >= distance(body.destinationGeo.lat, body.destinationGeo.long, machine[1], machine[0], 'METER')) {
                        // address will be filled later down
                        data.push({
                            address: '-',
                            name: 'Park And Ride',
                            coordinates: {
                                lat: machine[1],
                                long: machine[0],
                            },
                            price: {
                                day: 0,
                                night: 0,
                            },
                            open: '24/7',
                            chance: 100,
                            type: 'Park & Ride',
                            onFootDistance: distance(body.destinationGeo.lat, body.destinationGeo.long, machine[1], machine[0], 'METER'),
                        });
                    }
                });

                // console.log(json.coordinates);
                localStorage.setItem('parkAndRideParks', '');
                localStorage.setItem('parkAndRideParks', JSON.stringify(data));
                return data;
            });
    } catch (err) {
        return handleAPIError(500, err.message || 'Some error occurred while retrieving data', next);
    }
};


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
        // to determine avarage distance from center to edge, outside city
        const gentCenterGeoPoint = {
            lat: 51.053937,
            long: 3.723158,
        };
        // distance in meters
        const cityCenterMaxDistance = 1500;
        const cityEdgeMaxDistance = 3000;
        // const cityOutsideMinDistance = 6000;
        const cloneMachines = {
            ...ParkMachines,
        };
        const oneZoneParkings = [];
        const priceChoiceParkings = [];
        const distanceToDestinationParkings = [];
        const bankcontactOptionParkings = [];
        const chanceMin30Parkings = [];

        getTop6ParkAndRide(req.body, next);
        getTop6UndergroundParkings(req.body, next);

        // i for test
        let i = 0;

        // get all parkings in Zone: city center, edge of city , outside city
        if (req.body.settings.zonename !== 'Park & Ride') {
            cloneMachines.features.forEach((machine) => {
                if (req.body.settings.zonename === 'City') {
                    if (cityCenterMaxDistance >= distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER')) {
                        // console.log(distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));
                        oneZoneParkings.push(machine);
                        i += 1;
                    }
                } else if (req.body.settings.zonename === 'Edge of city') {
                    if (cityEdgeMaxDistance >= distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER')
                        && cityCenterMaxDistance <= distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER')) {
                        // console.log(distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));
                        oneZoneParkings.push(machine);
                        i += 1;
                    }
                } else if (req.body.settings.zonename === 'Outside city') {
                    if (cityEdgeMaxDistance <= distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER')) {
                        // console.log(distance(gentCenterGeoPoint.lat, gentCenterGeoPoint.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));
                        oneZoneParkings.push(machine);
                        i += 1;
                    }
                }
            });

            console.log(`Zones:${i}`);
            i = 0;
            oneZoneParkings.forEach((machine) => {
                if (req.body.settings.price_per_hour >= machine.properties.tarief.day) {
                    priceChoiceParkings.push(machine);
                    i += 1;
                }
            });
            console.log(`Price Choice:${i}`);
            i = 0;
            priceChoiceParkings.forEach((machine) => {
                if (req.body.settings.distance_from_destination >= distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER')) {
                    // console.log(distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));

                    machine.distance_to_destination = distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER');
                    distanceToDestinationParkings.push(machine);
                    i += 1;
                }
            });
            console.log(`Max Dis to dest. Zones:${i}`);
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
            console.log(`BankContact Zones:${i}`);
            i = 0;

            bankcontactOptionParkings.forEach((machine) => {
                if (machine.kans >= 30) {
                    // console.log(distance(req.body.destinationGeo.lat, req.body.destinationGeo.long, machine.geometry.coordinates[1], machine.geometry.coordinates[0], 'METER'));
                    chanceMin30Parkings.push(machine);
                    i += 1;
                }
            });


            // ALL GOOD PARKINGS SPOTS

            let undergroundsResults = [];

            if (req.body.settings.underground === 'true' || req.body.settings.underground === true) {
                undergroundsResults = JSON.parse(localStorage.getItem('undergroundParks'));
                // console.log(undergroundsResults);
            }


            const topStreetParkings = chanceMin30Parkings.sort(compare).slice(0, 7);
            const topGoodJSONStructure = [];

            topStreetParkings.forEach((machine) => {
                topGoodJSONStructure.push({
                    address: '-',
                    name: 'Straat Parking',
                    coordinates: {
                        lat: machine.geometry.coordinates[1],
                        long: machine.geometry.coordinates[0],
                    },
                    price: {
                        day: machine.properties.tarief.day,
                        night: machine.properties.tarief.night,
                    },
                    open: '24/7',
                    chance: machine.kans,
                    type: 'Straat Parking',
                    onFootDistance: machine.distance_to_destination,
                });
            });

            const Top6Parkings = toOneJSONStructure(topGoodJSONStructure, undergroundsResults).sort(ascendArray).slice(0, 6);

            // finally done, good GOD me.
            // add address to somespot
            // Get Address of coordinates
            await Top6Parkings.forEach(async (machine) => {
                await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${machine.coordinates.lat}+${machine.coordinates.long}&pretty=1&key=4fd9b61b904e466b8256aa5b4c04cb7b`)
                    .then(response => response.json())
                    .then(async (responseJson) => {
                        try {
                            machine.address = responseJson.results[0].formatted;
                        } catch (error) {
                            console.error(error);
                        }
                    }).then(() => {

                    })
                    .catch(error => console.log(error)); // to catch the errors if any
            });

            // const last = await JSON.parse(localStorage.getItem('dataWithAddress'));
            setTimeout(() => res.status(200).json(Top6Parkings), 2000);

            // const u = getTop6UndergroundParkings(req.body, next);
        }
        if (req.body.settings.zonename === 'Park & Ride') {
            const parkAndRideResults = JSON.parse(localStorage.getItem('parkAndRideParks')).sort(ascendArray).slice(0, 6);


            await parkAndRideResults.forEach(async (machine) => {
                await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${machine.coordinates.lat}+${machine.coordinates.long}&pretty=1&key=4fd9b61b904e466b8256aa5b4c04cb7b`)
                    .then(response => response.json())
                    .then(async (responseJson) => {
                        try {
                            machine.address = responseJson.results[0].formatted;
                        } catch (error) {
                            console.error(error);
                        }
                    }).then(() => {

                    })
                    .catch(error => console.log(error)); // to catch the errors if any
            });

            // const last = await JSON.parse(localStorage.getItem('dataWithAddress'));
            setTimeout(() => res.status(200).json(parkAndRideResults), 2000);
        }
    };
}

export default PostController;
