const express = require("express");
const productsRepo = require("../respositories/products");
const productsIndexTemplate = require("../routes/admin/views/index");

const router = express.Router();

router.get("/", async(req,res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

module.exports = router;