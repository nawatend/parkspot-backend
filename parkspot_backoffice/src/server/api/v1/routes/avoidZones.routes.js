/*
Import the internal libraries:
- AvoidZoneController
*/
import {
    AvoidZoneController,
} from '../controller';

// Create instance of AvoidZoneController otherwise you can't use it
const avoidZoneController = new AvoidZoneController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/avoidZones:
     *   get:
     *     tags:
     *       - Categories
     *     description: Returns all avoidZones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of avoidZones
     */
    parentRouter.get('/avoidZones', avoidZoneController.index);
    /**
     * @swagger
     * /api/v1/avoidZones/create:
     *   get:
     *     tags:
     *       - AvoidZone
     *     description: Returns specific viewmodel such as avoidZones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/avoidZones/create/', avoidZoneController.create);
    /**
     * @swagger
     * /api/v1/avoidZones/{id}:
     *   get:
     *     tags:
     *       - AvoidZone
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: AvoidZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/avoidZones/:id', avoidZoneController.show);
    /**
     * @swagger
     * /api/v1/avoidZones:
     *   post:
     *     tags:
     *       - AvoidZone
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: AvoidZone object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/avoidZones', avoidZoneController.store);
    /**
     * @swagger
     * /api/v1/avoidZones/{id}/edit:
     *   get:
     *     tags:
     *       - AvoidZone
     *     description: Returns specific viewmodel such as post, avoidZones
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: AvoidZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit post by id
     */
    parentRouter.get('/avoidZones/:id/edit', avoidZoneController.edit);
    /**
     * @swagger
     * /api/v1/avoidZones/{id}:
     *   put:
     *     tags:
     *       - AvoidZone
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: AvoidZone id
     *         in: path
     *         required: true
     *         type: string
     *       - name: post object
     *         description: post data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update post
     */
    parentRouter.put('/avoidZones/:id', avoidZoneController.update);
    /**
     * @swagger
     * /api/v1/avoidZones/{id}:
     *   delete:
     *     tags:
     *       - AvoidZone
     *     description: Delete specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: AvoidZone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete post
     */
    parentRouter.delete('/avoidZones/:id', avoidZoneController.destroy);
};

export default initializeEndpoints;
