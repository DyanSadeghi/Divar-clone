/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOption:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - type
 *         - category
 *       properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         category:
 *           type: string
 *         guid:
 *           type: string
 *         required:
 *           type: boolean
 *         type:
 *           type: string
 *           enum:
 *             - number
 *             - string
 *             - boolean
 *             - array
 *         enum:
 *           type: array
 *           items:
 *             type: string
 *     UpdateOption:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         category:
 *           type: string
 *         guid:
 *           type: string
 *         required:
 *           type: boolean
 *         type:
 *           type: string
 *           enum:
 *             - number
 *             - string
 *             - boolean
 *             - array
 *         enum:
 *           type: array
 *           items:
 *             type: string
 */


/**
 * @swagger
 * /option:
 *  post:
 *      summary: create new option
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *      responses:
 *          201:
 *              description: created
 */

/**
 * @swagger
 * /option/{id}:
 *  put:
 *      summary: updated new option by id
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateOption'
 *      responses:
 *          201:
 *              description: created
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: getting all options of category
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /option/by-category-slug/{slug}:
 *  get:
 *      summary: getting all options of slug
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: slug
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: getting all options by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /option/{id}:
 *  delete:
 *      summary: delete all options by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: deleted successfully
 */
/**
 * @swagger
 * /option/:
 *  get:
 *      summary: getting all options 
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: success
 */