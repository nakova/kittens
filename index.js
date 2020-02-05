const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/admin/auth");
const adminProductsRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const catsRouter = require('./routes/carts');


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ["fjfjfjfjfjfjfjfj"]
}));
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(catsRouter);

app.listen(3000, () => {
    console.log("Listening");
});