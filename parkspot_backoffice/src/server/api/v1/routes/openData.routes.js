/*
Import the internal libraries:
- OpenDataController
*/
import {
    OpenDataController,
} from '../controller';

// Create instance of OpenDataController otherwise you can't use it
const openDataController = new OpenDataController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/openDatas/underground:
     *   get:
     *     tags:
     *       - OpenDatas from underground
     *     description: Returns all openData underground parking
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array with parking geolocation
     */
    parentRouter.get('/openDatas/underground', openDataController.getUnderground);
    /**
     * @swagger
     * /api/v1/openDatas/parkandride:
     *   get:
     *     tags:
     *       - OpenDatas from underground
     *     description: Returns all openData underground parking
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array with parking geolocation
     */
    parentRouter.get('/openDatas/parkandride', openDataController.getParkAndRide);
    /**
     * @swagger
     * /api/v1/openDatas/create:
     *  get:
     *     tags:
     *       - OpenDatas from park and ride
     *     description: Returns all openData park and ride parking
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array with park and ride parking geolocation
     */
    parentRouter.get('/openDatas/gentzones', openDataController.getGentZones);
    /**
     * @swagger
     * /api/v1/openDatas/getzones:
     *   get:
     *     tags:
     *       - OpenDatas from gentzones
     *     description: Returns all openData zones points
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array with polygon points
     */
    parentRouter.get('/openDatas/electricpark', openDataController.getElectricPark);
    /**
     * @swagger
     * /api/v1/openDatas/electricpark:
     *  get:
     *     tags:
     *       - OpenDatas from electricparking
     *     description: Returns all openData electric parking
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array with parking geolocation
     */

    parentRouter.get('/openDatas/handicappark', openDataController.getHandicapPark);
    /**
     * @swagger
     * /api/v1/openDatas/handicappark:
     *   get:
     *     tags:
     *       - OpenDatas from handicap parking
     *     description: Returns all openData handicap  parking
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array with parking geolocation
     */

    parentRouter.post('/searchparkingspots', openDataController.getParkingSpots);
    /**
     * @swagger
     * /api/v1/searchparkingspots:
     *   get:
     *     tags:
     *       - Parkings spot from parking opendata
     *     description: Returns top
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array with parking geolocation
     */
};

export default initializeEndpoints;
