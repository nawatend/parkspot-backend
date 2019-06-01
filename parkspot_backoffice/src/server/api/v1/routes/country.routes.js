/*
Import the internal libraries:
- CountryController
*/
import {
    CountryController,
} from '../controller';

// Create instance of CountryController otherwise you can't use it
const countryController = new CountryController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/countries:
     *   get:
     *     tags:
     *       - Categories
     *     description: Returns all countries
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of countries
     */
    parentRouter.get('/countries', countryController.index);
    /**
     * @swagger
     * /api/v1/countries/create:
     *   get:
     *     tags:
     *       - Country
     *     description: Returns specific viewmodel such as countries
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/countries/create/', countryController.create);
    /**
     * @swagger
     * /api/v1/countries/{id}:
     *   get:
     *     tags:
     *       - Country
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Country id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/countries/:id', countryController.show);
    /**
     * @swagger
     * /api/v1/countries:
     *   post:
     *     tags:
     *       - Country
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Country object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/countries', countryController.store);
    /**
     * @swagger
     * /api/v1/countries/{id}/edit:
     *   get:
     *     tags:
     *       - Country
     *     description: Returns specific viewmodel such as post, countries
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Country id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit post by id
     */
    parentRouter.get('/countries/:id/edit', countryController.edit);
    /**
     * @swagger
     * /api/v1/countries/{id}:
     *   put:
     *     tags:
     *       - Country
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Country id
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
    parentRouter.put('/countries/:id', countryController.update);
    /**
     * @swagger
     * /api/v1/countries/{id}:
     *   delete:
     *     tags:
     *       - Country
     *     description: Delete specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Country id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete post
     */
    parentRouter.delete('/countries/:id', countryController.destroy);
};

export default initializeEndpoints;
