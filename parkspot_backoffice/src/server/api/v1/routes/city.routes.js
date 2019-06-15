/*
Import the internal libraries:
- CityController
*/
import {
    CityController,
} from '../controller';

// Create instance of CityController otherwise you can't use it
const cityController = new CityController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/cities:
     *   get:
     *     tags:
     *       - Categories
     *     description: Returns all cities
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of cities
     */
    parentRouter.get('/cities', cityController.index);
    /**
     * @swagger
     * /api/v1/cities/create:
     *   get:
     *     tags:
     *       - City
     *     description: Returns specific viewmodel such as cities
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/cities/create/', cityController.create);
    /**
     * @swagger
     * /api/v1/cities/{id}:
     *   get:
     *     tags:
     *       - City
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: City id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/cities/:id', cityController.show);
    /**
     * @swagger
     * /api/v1/cities:
     *   post:
     *     tags:
     *       - City
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: City object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/cities', cityController.store);
    /**
     * @swagger
     * /api/v1/cities/{id}/edit:
     *   get:
     *     tags:
     *       - City
     *     description: Returns specific viewmodel such as post, cities
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: City id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit post by id
     */
    parentRouter.get('/cities/:id/edit', cityController.edit);
    /**
     * @swagger
     * /api/v1/cities/{id}:
     *   put:
     *     tags:
     *       - City
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: City id
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
    parentRouter.put('/cities/:id', cityController.update);
    /**
     * @swagger
     * /api/v1/cities/{id}:
     *   delete:
     *     tags:
     *       - City
     *     description: Delete specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: City id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete post
     */
    parentRouter.delete('/cities/:id', cityController.destroy);
};

export default initializeEndpoints;
