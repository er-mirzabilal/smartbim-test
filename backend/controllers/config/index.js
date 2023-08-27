const ConfigService = require("../../services/config");
const { handleResponse, handleError } = require("../../utils/responses");

exports.getConfig = async (req, res) => {
  ConfigService.find()
    .then((config) => {
      handleResponse(res, 200, "Success", config);
    })
    .catch((err) => {
      handleError(res, err);
    });
};
