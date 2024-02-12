import {promises as fs} from 'fs'
import ProductManager from "./ProductManager.js"

const productsAll = new ProductManager

class CartManager{
    constructor(){
     this.path = "./src/Models/carts.json"
}

readCarts = async ()=> {
    let carts = await fs.readFile(this.path, "utf-8")
    return JSON.parse(carts)
}

writeCarts = async (carts)=> {
    await fs.writeFile(this.path, JSON.stringify(carts));
}

addCart = async (cart)=> {
    let cartOld = await this.readCarts()
    const lastId = cartOld.reduce((maxId, cart) => Math.max(maxId, cart.id), 0) + 1;
    cart.id = lastId;
    let cartConcat = [{id:cart.id, products: []}, ...cartOld]
    await this.writeCarts(cartConcat)
    return "Carrito Agregado"
}

getCartById = async (id)=>{
    let carts = await this.readCarts()
    let cartById = carts.find(cart => cart.id === id)
    if (!cartById) return "Producto no encontrado"
    return cartById
}

/*addProductInCart = async (cartId, productId)=>{
    let carts = await this.readCarts()
    let cartIndex = carts.find((cart) => cart.id === cartId);
    console.log(cartIndex)
    if (cartIndex === -1) return "Producto no encontrado"

    let products = await productsAll.readProducts()
    let productById = products.find((prod) => prod.id === productId)
    console.log(productById)
    if (!productById) return "Producto no encontrado"

   let productIndex = carts[cartIndex].products.findIndex((product) => product.id === productId);

   if (productIndex === -1) {
       carts[cartIndex].products.push({ id: productId, quantity: 1});
   } else {
       carts[cartIndex].products[productIndex].quantity++;
   }
    await this.writeCarts(carts)
    return "Producto Agregado el Carrito"
}*/


addProductInCart = async(cartId, productId)=>{
    let carts = await this.readCarts()
    let cartById = carts.find(cart => cart.id === cartId)
    if (!cartById) return "Producto no encontrado"

    let products = await productsAll.readProducts()
    let productById = products.find(prod => prod.id === productId)
    if (!productById) return "Producto no encontrado"

    /*let cartAll = await this.readCarts()
    let cartFilter = cartAll.filter(prod => prod.id != id)
    let cartsConcat = [{id: cartId, products : [{id: productById, quantity: 1}]}, ...cartFilter]
    await this.writeCarts(cartsConcat)
    return "Producto Agregado al Carrito"*/

    let cartIndex = carts.findIndex(cart => cart.id === cartId)
    let cartFilter = cartIndex.filter(prod => prod.id != cartId)
    let cartsConcat = [{...cartById, products : [{id: productById, quantity: 1}]}, ...cartFilter]
    await this.writeCarts(cartsConcat)
    return "Producto Agregado al Carrito"
}

}
export default CartManager;