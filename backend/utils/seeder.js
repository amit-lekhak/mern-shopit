const Product = require("../models/product");
const data = require("../data/products.json");
const connectDatabase = require("../config/database");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seeder = async () => {
  try {
    await Product.deleteMany();
    console.log("All products deleted");

    await Product.insertMany(data);
    console.log("Products inserted");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seeder();
