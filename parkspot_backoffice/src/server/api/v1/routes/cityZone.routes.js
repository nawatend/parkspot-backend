/*
Import the internal libraries:
- CityZoneController
*/
import { CityZoneController } from '../controller';

// Create instance of CityZoneController otherwise you can't use it
const cityZoneController = new CityZoneController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/cityZones:
     *   get:
     *     tags:
     *       - CityZones
     *     description: Returns all cityZones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of cityZones
     */
    parentRouter.get('/cityZones', cityZoneController.index);
    /**
     * @swagger
     * /api/v1/cityZones/create:
     *   get:
     *     tags:
     *       - CityZone
     *     description: Returns specific viewmodel such as zones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create cityZone
     */
    parentRouter.get('/cityZones/create/', cityZoneController.create);
    /**
     * @swagger
     * /api/v1/cityZones/{id}:
     *   get:
     *     tags:
     *       - CityZone
     *     description: Returns specific cityZone
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: CityZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get cityZone by id
     */
    parentRouter.get('/cityZones/:id', cityZoneController.show);
    /**
     * @swagger
     * /api/v1/cityZones:
     *   cityZone:
     *     tags:
     *       - CityZone
     *     description: Save cityZone
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: cityZone
     *         description: CityZone object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved cityZone
     */
    parentRouter.post('/cityZones', cityZoneController.store);
    /**
     * @swagger
     * /api/v1/cityZones/{id}/edit:
     *   get:
     *     tags:
     *       - CityZone
     *     description: Returns specific viewmodel such as cityZone, zones
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: CityZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit cityZone by id
     */
    parentRouter.get('/cityZones/:id/edit', cityZoneController.edit);
    /**
     * @swagger
     * /api/v1/cityZones/{id}:
     *   put:
     *     tags:
     *       - CityZone
     *     description: Update specific cityZone detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: CityZone id
     *         in: path
     *         required: true
     *         type: string
     *       - name: cityZone object
     *         description: cityZone data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update cityZone
     */
    parentRouter.put('/cityZones/:id', cityZoneController.update);
    /**
     * @swagger
     * /api/v1/cityZones/{id}:
     *   delete:
     *     tags:
     *       - CityZone
     *     description: Delete specific cityZone detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: CityZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete cityZone
     */
    parentRouter.delete('/cityZones/:id', cityZoneController.destroy);
};

export default initializeEndpoints;
