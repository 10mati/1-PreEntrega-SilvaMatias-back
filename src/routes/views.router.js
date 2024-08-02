import express from 'express'
import ProductManager from '../Products/ProductManager.js'


const router = express.Router();
const productsManager = new ProductManager();

router.get("/", async (req, res) => {
    const id = req.params.id;
    const limit = req.query.limit;
    try {
        if (!!id) {
            res.send(await productsManager.getProductById(id));
        } else {
             res.render("home", { products: await productsManager.getProduct(limit) });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: -1, description: "Error fetching products" });
    }
});

router.get("/realtimeproducts", async (req, res) => {
    return res.render("realtimeproducts");
});



export default router;

