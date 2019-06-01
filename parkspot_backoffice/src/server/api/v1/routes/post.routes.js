/*
Import the internal libraries:
- PostController
*/
import {
    PostController,
} from '../controller';

// Create instance of PostController otherwise you can't use it
const postController = new PostController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/posts:
     *   get:
     *     tags:
     *       - Posts
     *     description: Returns all posts
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of posts
     */
    parentRouter.get('/posts', postController.index);
    /**
     * @swagger
     * /api/v1/posts/create:
     *   get:
     *     tags:
     *       - Post
     *     description: Returns specific viewmodel such as categories
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create post
     */
    parentRouter.get('/posts/create/', postController.create);
    /**
     * @swagger
     * /api/v1/posts/{id}:
     *   get:
     *     tags:
     *       - Post
     *     description: Returns specific post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Post id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get post by id
     */
    parentRouter.get('/posts/:id', postController.show);
    /**
     * @swagger
     * /api/v1/posts:
     *   post:
     *     tags:
     *       - Post
     *     description: Save post
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: post
     *         description: Post object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved post
     */
    parentRouter.post('/posts', postController.store);
    /**
     * @swagger
     * /api/v1/posts/{id}/edit:
     *   get:
     *     tags:
     *       - Post
     *     description: Returns specific viewmodel such as post, categories
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Post id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit post by id
     */
    parentRouter.get('/posts/:id/edit', postController.edit);
    /**
     * @swagger
     * /api/v1/posts/{id}:
     *   put:
     *     tags:
     *       - Post
     *     description: Update specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Post id
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
    parentRouter.put('/posts/:id', postController.update);
    /**
     * @swagger
     * /api/v1/posts/{id}:
     *   delete:
     *     tags:
     *       - Post
     *     description: Delete specific post detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Post id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete post
     */
    parentRouter.delete('/posts/:id', postController.destroy);
};

export default initializeEndpoints;
