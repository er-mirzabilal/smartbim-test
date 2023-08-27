const fs = require("fs");
const path = require("path");

const Config = path.join(__dirname, "../../models/config.json");

class ConfigService {
  static find() {
    return new Promise((resolve, reject) => {
      fs.readFile(Config, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the JSON file:", err);
          reject(err);
        }

        try {
          // Parse JSON data
          const jsonData = JSON.parse(data);

          console.log("Data :", jsonData);
          resolve(jsonData);
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          reject(parseError);
        }
      });
    });
  }
  static findById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(Config, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the JSON file:", err);
          reject(err);
        }

        try {
          // Parse JSON data
          const jsonData = JSON.parse(data);
          const result = jsonData.find((item) => item.id === id);

          console.log("Found config:", result);
          resolve(result);
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          reject(parseError);
        }
      });
    });
  }
}

module.exports = ConfigService;
