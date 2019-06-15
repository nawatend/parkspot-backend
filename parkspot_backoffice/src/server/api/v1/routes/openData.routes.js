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
     * /api/v1/openDatas:
     *   get:
     *     tags:
     *       - OpenDatas
     *     description: Returns all openDatas
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of openDatas
     */
    parentRouter.get('/openDatas/underground', openDataController.getUnderground);
    /**
     * @swagger
     * /api/v1/openDatas/create:
     *   get:
     *     tags:
     *       - OpenData
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create openData
     */
    parentRouter.get('/openDatas/parkandride', openDataController.getParkAndRide);
    /**
     * @swagger
     * /api/v1/openDatas/create:
     *   get:
     *     tags:
     *       - OpenData
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create openData
     */
    parentRouter.get('/openDatas/gentzones', openDataController.getGentZones);
    /**
     * @swagger
     * /api/v1/openDatas/create:
     *   get:
     *     tags:
     *       - OpenData
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create openData
     */
    parentRouter.get('/openDatas/electricpark', openDataController.getElectricPark);
    /**
     * @swagger
     * /api/v1/openDatas/create:
     *   get:
     *     tags:
     *       - OpenData
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create openData
     */

    parentRouter.get('/openDatas/handicappark', openDataController.getHandicapPark);
    /**
     * @swagger
     * /api/v1/openDatas/create:
     *   get:
     *     tags:
     *       - OpenData
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create openData
     */
};

export default initializeEndpoints;
