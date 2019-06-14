/*
Import the internal libraries:
- HomeAddressController
*/
import {
    HomeAddressController,
} from '../controller';

// Create instance of HomeAddressController otherwise you can't use it
const homeAddressController = new HomeAddressController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/homeAddresses:
     *   get:
     *     tags:
     *       - Categories
     *     description: Returns all homeAddresses
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of homeAddresses
     */
    parentRouter.get('/homeAddresses', homeAddressController.index);
    /**
     * @swagger
     * /api/v1/homeAddresses/create:
     *   get:
     *     tags:
     *       - HomeAddress
     *     description: Returns specific viewmodel such as homeAddresses
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/homeAddresses/create/', homeAddressController.create);
    /**
     * @swagger
     * /api/v1/homeAddresses/{id}:
     *   get:
     *     tags:
     *       - HomeAddress
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: HomeAddress id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/homeAddresses/:id', homeAddressController.show);
    /**
     * @swagger
     * /api/v1/homeAddresses:
     *   post:
     *     tags:
     *       - HomeAddress
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: HomeAddress object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/homeAddresses', homeAddressController.store);
    /**
     * @swagger
     * /api/v1/homeAddresses/{id}/edit:
     *   get:
     *     tags:
     *       - HomeAddress
     *     description: Returns specific viewmodel such as post, homeAddresses
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: HomeAddress id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit post by id
     */
    parentRouter.get('/homeAddresses/:id/edit', homeAddressController.edit);
    /**
     * @swagger
     * /api/v1/homeAddresses/{id}:
     *   put:
     *     tags:
     *       - HomeAddress
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: HomeAddress id
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
    parentRouter.put('/homeAddresses/:id', homeAddressController.update);
    /**
     * @swagger
     * /api/v1/homeAddresses/{id}:
     *   delete:
     *     tags:
     *       - HomeAddress
     *     description: Delete specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: HomeAddress id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete post
     */
    parentRouter.delete('/homeAddresses/:id', homeAddressController.destroy);
};

export default initializeEndpoints;
