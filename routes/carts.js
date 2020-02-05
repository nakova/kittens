const express=require("express");
const cartsRepo = require("../respositories/carts");
const productsRepo= require('../respositories/products');
const cartShowTemlpate = require("../routes/admin/views/carts/show");

const router = express.Router();

// Receive a post requesr to add an item to cart
router.post("/cart/products", async(req, res) =>{
    // figure out the cart!
    let cart;
    if(!req.session.cartId) {
        //we don't have a card, we need to create one,
        //and store the cart id on req.session.cartId property
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;
    } else {
        //We have a cart1Lets get it from the repository
        cart = await cartsRepo.getOne(req.session.cartId);
    }
    //Eighter increment the quantity for existing product
    //Or add new product to items array
    const existingItem = cart.items.find(item => item.id === req.body.productId)
    if(existingItem) {
        //increment quantity and save 
        existingItem.quantity++;
    } else {
        //addd neww product id to items array
        cart.items.push({ id: req.body.productId, quantity: 1});
    }
    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    res.redirect("/cart");
});

// Receive a GET request to show all items in cart
router.get("/cart", async (req,res) => {
    if(!req.session.cartId){
        return res.redirect("/");
    }
    const cart = await cartsRepo.getOne(req.session.cartId);
    for(let item of cart.items) {
        const product = await productsRepo.getOne(item.id);

        item.product = product;
    }
    res.send(cartShowTemlpate({ items: cart.items}));
});
// Receive a post request to delete item from cart
router.post("/cart/products/delete", async (req, res) => {
    const { itemId } =req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);

    const items = cart.items.filter(item => item.id !== itemId);

    await cartsRepo.update(req.session.cartId, { items });

    res.redirect("/cart");
});
module.exports = router;