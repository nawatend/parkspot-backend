/*
Import the internal libraries:
- ZoneController
*/
import {
    ZoneController,
} from '../controller';

// Create instance of ZoneController otherwise you can't use it
const zoneController = new ZoneController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/zones:
     *   get:
     *     tags:
     *       - Categories
     *     description: Returns all zones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of zones
     */
    parentRouter.get('/zones', zoneController.index);
    /**
     * @swagger
     * /api/v1/zones/create:
     *   get:
     *     tags:
     *       - Zone
     *     description: Returns specific viewmodel such as zones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/zones/create/', zoneController.create);
    /**
     * @swagger
     * /api/v1/zones/{id}:
     *   get:
     *     tags:
     *       - Zone
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Zone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/zones/:id', zoneController.show);
    /**
     * @swagger
     * /api/v1/zones:
     *   post:
     *     tags:
     *       - Zone
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Zone object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/zones', zoneController.store);
    /**
     * @swagger
     * /api/v1/zones/{id}/edit:
     *   get:
     *     tags:
     *       - Zone
     *     description: Returns specific viewmodel such as post, zones
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Zone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit post by id
     */
    parentRouter.get('/zones/:id/edit', zoneController.edit);
    /**
     * @swagger
     * /api/v1/zones/{id}:
     *   put:
     *     tags:
     *       - Zone
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Zone id
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
    parentRouter.put('/zones/:id', zoneController.update);
    /**
     * @swagger
     * /api/v1/zones/{id}:
     *   delete:
     *     tags:
     *       - Zone
     *     description: Delete specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Zone id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete post
     */
    parentRouter.delete('/zones/:id', zoneController.destroy);
};

export default initializeEndpoints;
