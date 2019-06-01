/*
Import the internal libraries:
- UserController
*/
import { UserController } from '../controller';

// Create instance of UserController otherwise you can't use it
const userController = new UserController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/users:
     *   get:
     *     tags:
     *       - Users
     *     description: Returns all users
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of users
     */
    parentRouter.get('/users', userController.index);
    /**
     * @swagger
     * /api/v1/users/create:
     *   get:
     *     tags:
     *       - User
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create user
     */
    parentRouter.get('/users/create/', userController.create);
    /**
     * @swagger
     * /api/v1/users/{id}:
     *   get:
     *     tags:
     *       - User
     *     description: Returns specific user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get user by id
     */
    parentRouter.get('/users/:id', userController.show);
    /**
     * @swagger
     * /api/v1/users:
     *   user:
     *     tags:
     *       - User
     *     description: Save user
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: user
     *         description: User object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved user
     */
    parentRouter.post('/users', userController.store);
    /**
     * @swagger
     * /api/v1/users/{id}/edit:
     *   get:
     *     tags:
     *       - User
     *     description: Returns specific viewmodel such as user, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit user by id
     */
    parentRouter.get('/users/:id/edit', userController.edit);
    /**
     * @swagger
     * /api/v1/users/{id}:
     *   put:
     *     tags:
     *       - User
     *     description: Update specific user detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User id
     *         in: path
     *         required: true
     *         type: string
     *       - name: user object
     *         description: user data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update user
     */
    parentRouter.put('/users/:id', userController.update);
    /**
     * @swagger
     * /api/v1/users/{id}:
     *   delete:
     *     tags:
     *       - User
     *     description: Delete specific user detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: User id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete user
     */
    parentRouter.delete('/users/:id', userController.destroy);
};

export default initializeEndpoints;
