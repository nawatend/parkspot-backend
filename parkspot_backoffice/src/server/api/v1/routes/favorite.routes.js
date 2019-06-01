/*
Import the internal libraries:
- FavoriteController
*/
import {
    FavoriteController,
} from '../controller';

// Create instance of FavoriteController otherwise you can't use it
const favoriteController = new FavoriteController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/favorites:
     *   get:
     *     tags:
     *       - Categories
     *     description: Returns all favorites
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of favorites
     */
    parentRouter.get('/favorites', favoriteController.index);
    /**
     * @swagger
     * /api/v1/favorites/create:
     *   get:
     *     tags:
     *       - Favorite
     *     description: Returns specific viewmodel such as favorites
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/favorites/create/', favoriteController.create);
    /**
     * @swagger
     * /api/v1/favorites/{id}:
     *   get:
     *     tags:
     *       - Favorite
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Favorite id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/favorites/:id', favoriteController.show);
    /**
     * @swagger
     * /api/v1/favorites:
     *   post:
     *     tags:
     *       - Favorite
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Favorite object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/favorites', favoriteController.store);
    /**
     * @swagger
     * /api/v1/favorites/{id}/edit:
     *   get:
     *     tags:
     *       - Favorite
     *     description: Returns specific viewmodel such as post, favorites
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Favorite id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit post by id
     */
    parentRouter.get('/favorites/:id/edit', favoriteController.edit);
    /**
     * @swagger
     * /api/v1/favorites/{id}:
     *   put:
     *     tags:
     *       - Favorite
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Favorite id
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
    parentRouter.put('/favorites/:id', favoriteController.update);
    /**
     * @swagger
     * /api/v1/favorites/{id}:
     *   delete:
     *     tags:
     *       - Favorite
     *     description: Delete specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Favorite id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete post
     */
    parentRouter.delete('/favorites/:id', favoriteController.destroy);
};

export default initializeEndpoints;
