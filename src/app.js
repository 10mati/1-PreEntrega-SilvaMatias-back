import express from "express";
import ProductsManager from "./Products/ProductManager.js";
import ProductRouter  from "./routes/product.routes.js";
import cartRouter  from "./routes/carts.routes.js";
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'



const app = express();
const PORT = 8080
const productsManager = new ProductsManager();

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

app.use("/api/products", ProductRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter)
app.use("/realtimeproducts", viewsRouter)


const httpServer = app.listen(PORT, () => {
    console.log(`Servidor con express Puerto ${PORT}`);
})

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('User connected');
  
    socket.on('new-product', async (product) => {
        console.log('New product:', product);
        await productsManager.addProducts(product);
        socket.emit('new-product-list', await productsManager.getProduct());
    });
  
    socket.on('delete-product', async (productId) => {
        console.log('Delete product:', productId);
         await productsManager.deleteProduct(productId);
        socket.emit('new-product-list', await productsManager.getProduct());
        
    });
  
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
