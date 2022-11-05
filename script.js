let comprar = parseInt(prompt('Desea comprar un accesorio o diseño? 1. Si / 2. No'))
class Producto {
    constructor(name,idProduct,price,stock){
    this.name=name;
    this.idProduct=idProduct;
    this.price=price;
    this.stock=stock;
    }
}

class Carrito {
    constructor(){
        this.items = []
        this.discount = {code: '', discount: 0}
    }

    addItem(item){
        this.items.push(item)
        item.stock = item.stock - 1
    }

    setDiscount(discountCode){
        const CODES = [{code: "BRANKHAAMIGO", discount: 0.20}, {code: "BIENVENIDA10", discount: 0.10}]
        const disc = CODES.find(c => c.code === discountCode)
        if(disc){
            this.discount = disc
            return true
        }
        else {
            console.warn("ERROR: Wrong discount code.")
            return false
        }
    }

    getTotal(){
        const subTotal = this.items.map(item => item.price).reduce((total, current) => {return total + current}, 0)
        const total = subTotal * (1-this.discount.discount)
        return total
    }
}

const prodArray = [
    new Producto('Pulsera',1,400,5),
    new Producto('collar',2,1200,7),
    new Producto('Tobillera',3,300,4),
    new Producto('Diseño',4,3000,1)
];

const carrito = new Carrito()
while(comprar === 1){
    let prod = parseInt(prompt('Elija un producto: 1. Pulsera / 2. Collar / 3. Tobillera / 4. Diseño'));
    if(prod > 4 || prod < 1){
        console.warn("ERROR: Product ID invalid")
        continue
    }
    const selectedProduct = prodArray.find( producto => producto.idProduct === prod)
    if(selectedProduct.stock){
        console.log(`El precio del producto es ${selectedProduct.price}`)
        carrito.addItem(selectedProduct)
        console.log(`El subtotal es ${carrito.getTotal()}`) // alt + flechita // alt + shift + flechita
    } else {
        console.log('No hay stock del producto seleccionado');
    }    
    comprar=parseInt(prompt('Quieres seguir comprando? 1. Si / 2. No'))
}
let hasDiscount = parseInt(prompt('Tienes un codigo de descuento? 1. Si / 2. No'))
if(hasDiscount === 1){
    let desc = prompt('Ingrese codigo de descuento: ');
    if(carrito.setDiscount(desc)){
        console.log("Descuento aplicado")
    } else {
        console.log("Codigo invalido")
    }
}
console.log(`El total de su compra es: ${carrito.getTotal()}`);
console.log('Gracias por su compra');
