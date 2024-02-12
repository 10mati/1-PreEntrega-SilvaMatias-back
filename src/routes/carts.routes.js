import { Router } from "express";
import CartManager from "../Products/CartManager.js";


const CartRouter = Router();
const carts = new CartManager

CartRouter.get("/", async (req, res)=>{
    res.send (await carts.readCarts())
    })
    
    
CartRouter.get("/:cid", async (req, res)=>{
    let id = parseInt(req.params.cid)
    res.send(await carts.getCartById(id))
})
    

CartRouter.post("/", async (req, res)=>{
const newCart = req.body;
res.send (await carts.addCart(newCart))
})

CartRouter.post("/:cid/products/pid", async (req, res)=>{
   let cartId = parseInt(req.params.cid)
   let productId = parseInt(req.params.pid)
   res.send (await carts.addProductInCart(cartId, productId))
    })






export default CartRouter;