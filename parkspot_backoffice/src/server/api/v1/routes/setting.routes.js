/*
Import the internal libraries:
- SettingController
*/
import {
    SettingController,
} from '../controller';

// Create instance of SettingController otherwise you can't use it
const settingController = new SettingController();

const initializeEndpoints = (parentRouter, authService) => {
    /**
     * @swagger
     * /api/v1/settings:
     *   get:
     *     tags:
     *       - Settings
     *     description: Returns all settings
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: An array of settings
     */
    parentRouter.get('/settings', settingController.index);
    /**
     * @swagger
     * /api/v1/settings/create:
     *   get:
     *     tags:
     *       - Setting
     *     description: Returns specific viewmodel such as zones
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Create setting
     */
    parentRouter.get('/settings/create/', settingController.create);
    /**
     * @swagger
     * /api/v1/settings/{id}:
     *   get:
     *     tags:
     *       - Setting
     *     description: Returns specific setting
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Setting id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Get setting by id
     */
    parentRouter.get('/settings/:id', settingController.show);
    /**
     * @swagger
     * /api/v1/settings:
     *   setting:
     *     tags:
     *       - Setting
     *     description: Save setting
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: setting
     *         description: Setting object
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Return saved setting
     */
    parentRouter.post('/settings', settingController.store);
    /**
     * @swagger
     * /api/v1/settings/{id}/edit:
     *   get:
     *     tags:
     *       - Setting
     *     description: Returns specific viewmodel such as setting, zones
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Setting id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Edit setting by id
     */
    parentRouter.get('/settings/:id/edit', settingController.edit);
    /**
     * @swagger
     * /api/v1/settings/{id}:
     *   put:
     *     tags:
     *       - Setting
     *     description: Update specific setting detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Setting id
     *         in: path
     *         required: true
     *         type: string
     *       - name: setting object
     *         description: setting data
     *         in: body
     *         required: true
     *     responses:
     *       200:
     *         description: Update setting
     */
    parentRouter.put('/settings/:id', settingController.update);
    /**
     * @swagger
     * /api/v1/settings/{id}:
     *   delete:
     *     tags:
     *       - Setting
     *     description: Delete specific setting detail
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: Setting id
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Delete setting
     */
    parentRouter.delete('/settings/:id', settingController.destroy);
};

export default initializeEndpoints;
