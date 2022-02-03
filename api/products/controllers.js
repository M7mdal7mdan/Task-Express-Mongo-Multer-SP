const Product = require('../../models/Product');

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res,next) => {
  console.log("🚀 ~ file: controllers.js ~ line 22 ~ exports.productCreate= ~ req", req.file)
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      console.log("🚀 ~ file: controllers.js ~ line 25 ~ exports.productCreate= ~  req.body.image",  req.body.image)
    }
    console.log(req.body);
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
    }
    const product = await Product.findByIdAndUpdate(
      { _id: req.product.id },
      req.body,
      { new: true, runValidators: true } // returns the updated product
    );
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
