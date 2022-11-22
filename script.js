//Clase producto
class Producto {
    constructor(name,idProduct,price,stock){
    this.name=name;
    this.idProduct=idProduct;
    this.price=price;
    this.stock=stock;
    }
}

//Clase carrito
class Carrito {
    constructor(){
        this.items = []
        this.discount = {code: '', discount: 0}
    }

    addItem(item){
        if(item.stock > 0){
            this.items.push(item)
            item.stock = item.stock - 1
            return true
        } else {
            return false
        }
    }
//Funcion setDiscount calcula segun el codigo de descuento, el total
    setDiscount(discountCode){
        const CODES = [{code: "BRANKHAAMIGO", discount: 0.20}, {code: "BIENVENIDA10", discount: 0.10}]
        const disc = CODES.find(c => c.code === discountCode)
        if(disc){
            this.discount = disc
            return true
        }
        else {
            this.discount = {code: '', discount: 0}
            return false
        }
    }

    //Funcion getTotal calcula el total de los items
    getSubTotal(){
        return this.items.map(item => item.price).reduce((total, current) => {return total + current}, 0)
    }

    //Funcion getTotal calcula el total de los items
    getTotal(){
        const subTotal = this.items.map(item => item.price).reduce((total, current) => {return total + current}, 0)
        const total = subTotal * (1-this.discount.discount)
        return total
    }

    reset(){
        this.items = []
        this.discount = {code: '', discount: 0}
    }
}

const prodArray = [
    new Producto('Pulsera',1,400,5),
    new Producto('collar',2,1200,7),
    new Producto('Tobillera',3,300,4),
    new Producto('Diseño',4,3000,1)
];

const carrito = new Carrito()

function domInit(){
    // Rellenar select
    const selectedProd = document.getElementById('lista')
    prodArray.forEach((elemento) => {
        const optionProd = document.createElement('option')
        optionProd.innerText = `${elemento.name}: $${elemento.price}`
        optionProd.setAttribute('id', `${elemento.idProduct}`)
        optionProd.setAttribute('value', `${elemento.idProduct}`)
        selectedProd.appendChild(optionProd)
      })

    // Agregar producto
    const addProdButton = document.getElementById('addProd');
    addProdButton.onclick = () => {
        // console.log("add prod -->", selectedProd.value)
        // Forma larga
        // const product = prodArray.find( (producto) => {
        //     if(selectedProd.value === producto.idProduct){
        //         return true;
        //     }else {
        //         return false;
        //     }

        // })
        
        // Forma corta
        const selectedProductId = parseInt(selectedProd.value)
        const product = prodArray.find( product => selectedProductId === product.idProduct )
        if(carrito.addItem(product)){
            const listaProd = document.getElementById('carritoItems')
            // Vacio la lista
            listaProd.innerHTML = ''
            // Agrego los productos que estan en el carrito
            carrito.items.forEach((item) => {
                const elemento = document.createElement('li')
                elemento.innerText= `${item.name}: $${item.price}` 
                listaProd.appendChild(elemento)

            })
            // Actualizamos el total de la compra
            updateTotalDOM(carrito)
        } else {
            console.warn("ERROR: No hay mas stock del producto.")
        }

    }

    // Set discount code
    const validar = document.getElementById('validarDesc')
    validarDesc.onclick = () =>{
        const discountCode = document.getElementById('discountCode').value
        if(carrito.setDiscount(discountCode)) {
            // Actualizamos el total de la compra
            updateTotalDOM(carrito)
        } else {
            console.warn("ERROR: Wrong discount code.")
        }
    }

    // Finalizar la compra
    const finalizar = document.getElementById('finalizar')
    finalizar.onclick = () => {
        console.log(`El total de su compra es: ${carrito.getTotal()}`);
        console.log('Gracias por su compra');
        // Reseteo carrito y DOM
        resetCarrito(carrito)
    }
}

domInit()

function updateTotalDOM(carrito){
    // Actualizamos el total de la compra
    const totalCarrito = document.getElementById('carritoTotal')
    if(carrito.discount.code) {
        totalCarrito.innerHTML = `$${carrito.getSubTotal()} ---> <b>$${carrito.getTotal()}</b>`
    } else {
        totalCarrito.innerHTML = `$${carrito.getTotal()}`
    }
}

function resetCarrito(carrito){
    carrito.reset()
    document.getElementById('carritoItems').innerHTML = ''
    document.getElementById('discountCode').innerHTML = ''
    updateTotalDOM()
}

//Formulario usuario
const formUser = document.getElementById('formulario')
const titulo = document.getElementById('titulo')
const nameUser = document.getElementById('nombre')
const secondNameUser = document.getElementById('apellido')
const infoUser = {}
formUser.onsubmit = (e) =>{
    e.preventDefault(),
    infoUser.nombre = nameUser.value,
    infoUser.apellido = secondNameUser.value,
    localStorage.setItem('infoUser',JSON.stringify(infoUser))
}

const userStorage = JSON.parse(localStorage.getItem('infoUser'))
console.log(userStorage)
if(userStorage.nombre !== "" || userStorage.apellido !== ""){
    titulo.innerText = `Hola nuevamente, ${userStorage.nombre} ${userStorage.apellido}`
} 