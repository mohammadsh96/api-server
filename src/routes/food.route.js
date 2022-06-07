"use strict";
const express = require("express");

const { FoodTable } = require("../models/index");
const FoodRouter = express.Router();

FoodRouter.get("/food", getFood);
FoodRouter.get("/food/:id", getOneFood);
FoodRouter.post("/food", createFood);
FoodRouter.put("/food/:id", updateFood);
FoodRouter.delete("/food/:id", deleteFood);

async function getFood(req, res) {
    const allFood = await FoodTable.read();
    console.log("helloooo")
    res.status(200).json(allFood);
}


async function getOneFood(req, res) {
    const foodId = parseInt(req.params.id);
    let person = await FoodTable.read(foodId);
    res.status(200).json(person);
}


async function createFood(req, res) {
    let newFood = req.body;
    let FoodId = await FoodTable.create(newFood);
    res.status(201).json(FoodId);
}

async function updateFood(req, res) {
    
    let foodId = parseInt(req.params.id);
    let updateFood = req.body; 
    
    let foundFood = await FoodTable.read(foodId);
    if (foundFood) {

        let updatedFood = await foundFood.update(updateFood);
        res.status(201).json(updatedFood);
    } else {

        res.status(404);
    }
}
async function deleteFood(req, res) {
    
    let foodId = parseInt(req.params.id);
    let deleteFood = await FoodTable.delete(foodId);
res.status(204).json(deleteFood); 
}
module.exports = FoodRouter;