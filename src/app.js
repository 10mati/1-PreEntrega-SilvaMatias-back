import express from "express";
import ProductRouter  from "./routes/product.routes.js";
import cartRouter  from "./routes/carts.routes.js";


const app = express();
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/api/products", ProductRouter)
app.use("/api/carts", cartRouter)


app.listen(PORT, () => {
    console.log(`Servidor con express Puerto ${PORT}`);
})