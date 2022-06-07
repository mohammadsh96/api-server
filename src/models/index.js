"use strict";
require('dotenv').config();
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require("sequelize");
const Food = require("./food.model.js");
const Clothes = require("./clothes.model.js");
const Collection = require("./lib/collection")
let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
               ssl: { require: true, rejectUnauthorized: false},  
                native: true
            }
        } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);


const ClothesTable = Clothes(sequelize, DataTypes);
const FoodTable = Food(sequelize, DataTypes);


const clothesCollection = new Collection(ClothesTable);
const foodCollection = new Collection(FoodTable);


// customerTable.hasMany(orderTable, {
//     foreignKey: "customerId",
//     sourceKey: "id"
// });

// orderTable.belongsTo(customerTable, {
//     foreignKey: "customerId",
//     targetKey: "id",
// });

module.exports = {
    db: sequelize,
    Food: Food(sequelize, DataTypes),
    Clothes: Clothes(sequelize, DataTypes),
    ClothesTable:clothesCollection ,
    FoodTable:foodCollection
};
