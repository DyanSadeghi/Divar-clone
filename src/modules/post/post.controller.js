const autoBind = require("auto-bind");
const HttpCodes = require("http-codes");
const postService = require("./post.service");
const PostMessage = require("./post.message");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { Types } = require("mongoose");
const { default: axios } = require("axios");
const { getAddressDetail } = require("../../common/utils/http");
const { removePropertyInObject } = require("../../common/utils/functions");
const utf8 = require("utf8");

class PostController {
  #service;
  success_message;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }
  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBack = false;
      let match = { parent: null };
      let options, category;
      if (slug) {
        slug = slug.trim();
        category = await CategoryModel.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(PostMessage.NotFound);
        // console.log(category)
        options = await this.#service.getCategoryOptions(category._id);
        if (options.length === 0) options = null;

        showBack = true;
        match = {
          parent: category._id,
        };
      }
      const categories = await CategoryModel.aggregate([
        {
          $match: match,
        },
      ]);

      // console.log(categories);
      res.render("./pages/panel/create-post.ejs", {
        categories,
        showBack,
        category: category?._id.toString(),
        options,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const userId = req.user._id;
      console.log(req.files);
      console.log(req.body);
      const images = req?.files?.map((image) => image?.path?.slice(7));
      const {
        title_post: title,
        description: content,
        lat,
        lng,
        category,
        amount
      } = req.body;
      const { address, province, city, district } = await getAddressDetail(
        lat,
        lng
      );
      const options = removePropertyInObject(req.body, [
        "title_post",
        "description",
        "lat",
        "lng",
        "category",
        "images","amount"
      ]);
      for (let key in options) {
        let value = options[key];
        delete options[key];
        key = utf8.decode(key);
        options[key] = value;
      }
      await this.#service.create({
        userId,
        amount,
        title,
        content,
        coordinate: [lat, lng],
        images,
        category: new Types.ObjectId(category),
        options,
        address,
        province,
        city,
        district,
      });
      this.success_message = PostMessage.Created;
      return res.redirect("/post/my");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async findMyPost(req, res, next) {
    try {
      const userId = req.user._id;
      const posts = await this.#service.find(userId);
      res.render("./pages/panel/posts.ejs", {
        posts,
        count: posts.length,
        success_message: this.success_message,
        error_message: null,
      });
      this.success_message = null;
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);

      this.success_message = PostMessage.Deleted;
      return res.redirect("/post/my");
    } catch (error) {
      next(error);
    }
  }

  async showPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.#service.checkExist(id);

      res.locals.layout = "./layouts/website/main.ejs";
      res.render("./pages/home/post.ejs", { post });
    } catch (error) {
      next(error);
    }
  }
  async postList(req, res, next) {
    try {
        const query = req.query
      const posts = await this.#service.findAll(query);

      res.locals.layout = "./layouts/website/main.ejs";
      res.render("./pages/home/index.ejs", { posts });
      
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new PostController();
