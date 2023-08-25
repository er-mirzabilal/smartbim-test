const fs = require("fs");
const multer = require("multer");
const path = require("path");

const Product = path.join(__dirname, "../../models/product.json");

class ProductService {
  static findAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(Product, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the JSON file:", err);
          reject(err);
        }

        try {
          // Parse JSON data
          const jsonData = JSON.parse(data);

          // Store data in an array
          const dataArray = [];

          // Assuming jsonData is an array of objects
          for (const item of jsonData) {
            dataArray.push(item);
          }

          console.log("Data stored in array:", dataArray);
          resolve(dataArray);
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          reject(parseError);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(Product, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the JSON file:", err);
          reject(err);
        }

        try {
          // Parse JSON data
          const jsonData = JSON.parse(data);
          const result = jsonData.find((item) => item.id === id);

          console.log("Found Product:", result);
          resolve(result);
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          reject(parseError);
        }
      });
    });
  }

  static update(id, payload) {
    return new Promise((resolve, reject) => {
      fs.readFile(Product, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the JSON file:", err);
          reject(err);
        }

        try {
          const dataArray = JSON.parse(data);
          const result = dataArray.find((item) => item.id === id);
          const updatedObject = {
            id: id,
            name: payload?.name,
            price: payload?.price,
            description: payload?.description,
            image: result?.image,
          };
           console.log(updatedObject);
          const updatedArray = dataArray.map((item) =>
            item.id === id ? updatedObject : item
          );

          fs.writeFile(
            Product,
            JSON.stringify(updatedArray, null, 2),
            "utf8",
            (writeErr) => {
              if (writeErr) {
                console.error("Error writing to JSON file:", writeErr);
                reject(writeErr);
              } else {
                console.log("Product updated successfully.");
                resolve(updatedObject);
              }
            }
          );
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          reject(parseError);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(Product, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the JSON file:", err);
          reject(err);
        }

        try {
          const dataArray = JSON.parse(data);
          const result = dataArray.find((item) => item.id === id);

          const imageName = result?.image || ""; // Replace with the actual image file name
          const imagePath = path.join(
            __dirname,
            "../../assets/images",
            imageName
          ); // Path to the image file

          // Check if the file exists
          fs.access(imagePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error("Image does not exist or cannot be accessed:", err);
            }

            // Delete the image file
            fs.unlink(imagePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Error deleting image:", unlinkErr);
              }
              console.log("Image deleted successfully.");
            });
          });

          const filteredArray = dataArray.filter((item) => item.id !== id);

          fs.writeFile(
            Product,
            JSON.stringify(filteredArray, null, 2),
            "utf8",
            (writeErr) => {
              if (writeErr) {
                console.error("Error writing to JSON file:", writeErr);
                reject(writeErr);
              } else {
                console.log("Product deleted successfully.");
                resolve(result);
              }
            }
          );
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          reject(parseError);
        }
      });
    });
  }

  static create(payload, file) {
    return new Promise((resolve, reject) => {
      fs.readFile(Product, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading the JSON file:", err);
          reject(err);
        }

        try {
          const dataArray = JSON.parse(data);
          // Find the highest existing ID
          const highestId = dataArray.reduce(
            (maxId, product) => Math.max(maxId, product.id),
            0
          );

          const newObject = {
            id: highestId + 1, // Incremented id value
            name: payload?.name,
            description: payload?.description,
            price: payload?.price,
            image: "",
          };

          // Handle file upload
          if (file) {
            newObject.image = file?.filename;
          }
          console.log(payload, file);
          dataArray.push(newObject);

          fs.writeFile(
            Product,
            JSON.stringify(dataArray, null, 2),
            "utf8",
            (writeErr) => {
              if (writeErr) {
                console.error("Error writing to JSON file:", writeErr);
                reject(writeErr);
              } else {
                console.log("New product added successfully.");
                resolve(newObject);
              }
            }
          );
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          reject(parseError);
        }
      });
    });
  }
}

module.exports = ProductService;
