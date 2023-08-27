const ConfigService = require("../../services/config");
const { handleResponse, handleError } = require("../../utils/responses");
const ProductService = require("../../services/product");

exports.getConfig = async (req, res) => {
    const { id } = req.params;
    ConfigService.findById(Number(id))
        .then((product) => {
            handleResponse(res, 200, "Success", product);
        })
        .catch((err) => {
            handleError(res, err);
        });
};
