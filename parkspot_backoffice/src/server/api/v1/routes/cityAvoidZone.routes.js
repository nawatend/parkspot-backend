/*
Import the internal libraries:
- CityAvoidZoneController
*/
import { CityAvoidZoneController } from '../controller';

// Create instance of CityAvoidZoneController otherwise you can't use it
const cityAvoidZoneController = new CityAvoidZoneController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/cityAvoidZones:
     *   get:
     *     tags:
     *       - CityAvoidZones
     *     description: Returns all cityAvoidZones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of cityAvoidZones
     */
    parentRouter.get('/cityAvoidZones', cityAvoidZoneController.index);
    /**
     * @swagger
     * /api/v1/cityAvoidZones/create:
     *   get:
     *     tags:
     *       - CityAvoidZone
     *     description: Returns specific viewmodel such as zones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create cityAvoidZone
     */
    parentRouter.get('/cityAvoidZones/create/', cityAvoidZoneController.create);
    /**
     * @swagger
     * /api/v1/cityAvoidZones/{id}:
     *   get:
     *     tags:
     *       - CityAvoidZone
     *     description: Returns specific cityAvoidZone
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: CityAvoidZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get cityAvoidZone by id
     */
    parentRouter.get('/cityAvoidZones/:id', cityAvoidZoneController.show);
    /**
     * @swagger
     * /api/v1/cityAvoidZones:
     *   cityAvoidZone:
     *     tags:
     *       - CityAvoidZone
     *     description: Save cityAvoidZone
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: cityAvoidZone
     *         description: CityAvoidZone object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved cityAvoidZone
     */
    parentRouter.post('/cityAvoidZones', cityAvoidZoneController.store);
    /**
     * @swagger
     * /api/v1/cityAvoidZones/{id}/edit:
     *   get:
     *     tags:
     *       - CityAvoidZone
     *     description: Returns specific viewmodel such as cityAvoidZone, zones
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: CityAvoidZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit cityAvoidZone by id
     */
    parentRouter.get('/cityAvoidZones/:id/edit', cityAvoidZoneController.edit);
    /**
     * @swagger
     * /api/v1/cityAvoidZones/{id}:
     *   put:
     *     tags:
     *       - CityAvoidZone
     *     description: Update specific cityAvoidZone detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: CityAvoidZone id
     *         in: path
     *         required: true
     *         type: string
     *       - name: cityAvoidZone object
     *         description: cityAvoidZone data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update cityAvoidZone
     */
    parentRouter.put('/cityAvoidZones/:id', cityAvoidZoneController.update);
    /**
     * @swagger
     * /api/v1/cityAvoidZones/{id}:
     *   delete:
     *     tags:
     *       - CityAvoidZone
     *     description: Delete specific cityAvoidZone detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: CityAvoidZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete cityAvoidZone
     */
    parentRouter.delete('/cityAvoidZones/:id', cityAvoidZoneController.destroy);
};

export default initializeEndpoints;
