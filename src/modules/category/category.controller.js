const autoBind = require("auto-bind");
const CategoryService = require("./category.service");
const CategoryMessage = require("./category.message");
const HttpCodes = require('http-codes');

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = CategoryService;
  }
  async create(req, res, next) {
    try {
      const { name, icon, slug, parent } = req.body;
      await this.#service.create({ name, icon, slug, parent });
      return res.status(HttpCodes.CREATED).json({
        message: CategoryMessage.Created,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const categories = await this.#service.find();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const {id} = req.params
      await this.#service.remove(id);
      return res.json({message: CategoryMessage.Deleted});
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new  CategoryController()