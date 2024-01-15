const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true },
    amount: { type: Number, required: true, default: 0 },
    content: { type: String, required: true },
    category: { type: Types.ObjectId, ref: "Catrgory", required: true },
    province: { type: String, required: false },
    city: { type: String, required: false },
    district: { type: String, required: false },
    address: { type: String, required: false },
    coordinate: { type: [Number], required: true }, //51.4887654654 ,43.548787658
    images: { type: [String], required: false, default: [] },
    options: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
);

const PostModel = model("post", PostSchema);
module.exports = PostModel;
