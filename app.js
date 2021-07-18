const express = require ('express');
const app = express();
const methodOverride =  require('method-override');

const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const rutaProductos = require ('./routes/product');
const rutaCarrito = require ('./routes/cart');
const rutaRegister = require ('./routes/register');
const rutaIndex = require ('./routes/index');


app.use(methodOverride('_method'));
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas
app.listen (3000, console.log("servidor levantado"));


app.use('/', rutaIndex);

app.use('/product', rutaProductos);

app.use('/cart', rutaCarrito);

app.use('/register', rutaRegister);








module.exports = app;