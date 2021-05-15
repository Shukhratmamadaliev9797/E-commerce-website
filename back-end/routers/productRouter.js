import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import { isAuth, isAdmin, isAdminOrSeller } from "../util.js";

const productRouter = express.Router();
productRouter.get(
  "/top-products",
  expressAsyncHandler(async (req, res) => {
    const topProducts = await Product.find({})
      .sort({ "product.price": -1 })
      .limit(1);

    res.send(topProducts);
  })
);

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};
    const products = await Product.find({ ...sellerFilter }).populate("seller");
    res.send(products);
  })
);
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating seller.numReviews"
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Fount" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdminOrSeller,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "Sample Name" + Date.now(),
      seller: req.user._id,
      sellerName: req.user.name,
      image: "/images/cleaner.jpg",
      price: 0,
      category: "sample category",
      brand: "sample Brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdminOrSeller,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updateProduct = await product.save();
      res.send({ message: "Product updated", product: updateProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

export default productRouter;
