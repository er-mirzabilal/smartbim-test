const ProductService = require("../../services/product");
const { handleResponse, handleError } = require("../../utils/responses");

exports.getAll = async (req, res) => {
  ProductService.findAll()
    .then((products) => {
      handleResponse(res, 200, "All Products", products);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  ProductService.findById(Number(id))
    .then((product) => {
      handleResponse(res, 200, "Success", product);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  ProductService.update(Number(id), data)
    .then((product) => {
      handleResponse(res, 200, "Product updated successfully", product);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  ProductService.delete(Number(id))
    .then((product) => {
      handleResponse(res, 200, "Product deleted successfully", product);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

exports.saveProduct = async (req, res) => {
  const payload = req.body;
  const image = req.file;
  ProductService.create(payload, image)
    .then((product) => {
      handleResponse(res, 200, "Product added successfully", product);
    })
    .catch((err) => {
      handleError(res, err);
    });
};
