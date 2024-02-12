import { Router } from "express";
import ProductManager from "../Products/ProductManager.js";


const ProductRouter = Router ()
const product = new ProductManager()


ProductRouter.get("/", async (req, res)=>{
    res.send(await product.getProduct())
    })
    
    ProductRouter.get("/:id", async (req, res)=>{
        let id = parseInt(req.params.id)
        res.send(await product.getProductById(id))
        })
    
    ProductRouter.post("/", async (req,res)=>{
        let newproduct = req.body
        res.send(await product.addProducts(newproduct))
    })
    
    ProductRouter.delete("/:id", async (req, res)=>{
        let id = parseInt(req.params.id)
        res.send(await product.deleteProduct(id))
        })
    
     ProductRouter.put("/:id", async (req, res)=>{
            let id = parseInt(req.params.id)
            let updateProduct = req.body
            res.send(await product.updateProduct(id, updateProduct))
            })


export default ProductRouter;