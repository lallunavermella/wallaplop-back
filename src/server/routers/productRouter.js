const express = require("express");
const { Joi, validate } = require("express-validation");
const multer = require("multer");

const upload = multer({
  dest: "uploads",
});

const {
  getAllProducts,
  getUserProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getProduct,
} = require("../controllers/productControllers");
const auth = require("../middlewares/auth");

const router = express();

const CreateProductSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    price: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    adress: Joi.string(),
  }),
};

const UpdateProductSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    price: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    userID: Joi.string().forbidden(),
    adress: Joi.string(),
  }),
};

router.get("/list", getAllProducts);
router.get("/user", auth, getUserProducts);
router.get("/:idProduct", getProduct);
router.delete("/:idProduct", auth, deleteProduct);
router.post(
  "/create",
  auth,
  upload.single("picture"),
  validate(CreateProductSchema),
  createProduct
);
router.put("/:idProduct", auth, validate(UpdateProductSchema), updateProduct);

module.exports = router;
