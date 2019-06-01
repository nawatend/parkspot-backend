/*
Import the internal libraries:
- BlogController
*/
import { BlogController } from '../controller';

// Create instance of BlogController otherwise you can't use it
const blogController = new BlogController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/blogs:
     *   get:
     *     tags:
     *       - Blogs
     *     description: Returns all blogs
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of blogs
     */
    parentRouter.get('/blogs', blogController.index);
    /**
     * @swagger
     * /api/v1/blogs/create:
     *   get:
     *     tags:
     *       - Blog
     *     description: Returns specific viewmodel such as blogs
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/blogs/create/', blogController.create);
    /**
     * @swagger
     * /api/v1/blogs/{id}:
     *   get:
     *     tags:
     *       - Blog
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Blog id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/blogs/:id', blogController.show);
    /**
     * @swagger
     * /api/v1/blogs:
     *   post:
     *     tags:
     *       - Blog
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Blog object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/blogs', blogController.store);
    /**
     * @swagger
     * /api/v1/blogs/{id}/edit:
     *   get:
     *     tags:
     *       - Blog
     *     description: Returns specific viewmodel such as post, blogs
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Blog id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit blog by id
     */
    parentRouter.get('/blogs/:id/edit', blogController.edit);
    /**
     * @swagger
     * /api/v1/blogs/{id}:
     *   put:
     *     tags:
     *       - Blog
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Blog id
     *         in: path
     *         required: true
     *         type: string
     *       - name: nlog object
     *         description: blog data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update blog
     */
    parentRouter.put('/blogs/:id', blogController.update);
    /**
     * @swagger
     * /api/v1/blogs/{id}:
     *   delete:
     *     tags:
     *       - Blog
     *     description: Delete specific blog
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Blog id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete blog
     */
    parentRouter.delete('/blogs/:id', blogController.destroy);
};

export default initializeEndpoints;
