let comprar = parseInt(prompt('Desea comprar un accesorio o diseño? 1. Si / 2. No'))
class Producto {
    constructor(name,id_product,price,stock){
    this.name=name;
    this.id_product=id_product;
    this.price=price;
    this.stock=stock;
    }
}
const prodArray = [];
const prod1 = new Producto('Pulsera',1,400,5);
prodArray.push(prod1);
const prod2 = new Producto('collar',2,1200,7);
prodArray.push(prod2);
const prod3 = new Producto('Tobillera',3,300,4);
prodArray.push(prod3);
const prod4 = new Producto('Diseño',4,3000,1);
prodArray.push(prod4)
let subTotal = 0
while(comprar === 1){
    let prod=parseInt(prompt('Elija un producto: 1. Pulsera / 2. Collar / 3. Tobillera / 4. Diseño'));
      /*  if(prod===prod1.id_product && prod1.stock > 0){
            subTotal = subTotal + prod1.price;
            prod1.stock = prod1.stock - 1;
            alert('El precio es '+subTotal);
            comprar=parseInt(prompt('Quieres seguir comprando? 1. Si / 2. No'))
        } else if(prod === prod2.id_product && prod2.stock > 0){
            subTotal = subTotal + prod2.price;
            prod2.stock = prod2.stock - 1;
            alert('El precio es '+subTotal);
            comprar=parseInt(prompt('Quieres seguir comprando? 1. Si / 2. No'))
        } else if(prod === prod3.id_product && prod3.stock > 0){
            subTotal = subTotal + prod3.price;
            prod3.stock = prod3.stock - 1;
            alert('El precio es '+subTotal);
            comprar=parseInt(prompt('Quieres seguir comprando? 1. Si / 2. No'))
        }else if(prod === prod4.id_product && prod4.stock > 0){
            subTotal = subTotal + prod4.price;
            prod4.stock = prod4.stock - 1;
            alert('El precio es '+subTotal);
            comprar=parseInt(prompt('Quieres seguir comprando? 1. Si / 2. No'))
        } else {
        comprar=parseInt(prompt('Quieres seguir comprando? 1. Si / 2. No'))
        }*/
        if(prodArray[prod-1].stock > 0){
            subTotal=subTotal + prodArray[prod-1].price;
            prodArray[prod-1].stock = prodArray[prod-1].stock - 1;
            alert('El precio del producto seleccionado es '+prodArray[prod-1].price);
            alert('El subtotal de tu compra es: '+subTotal);
        }else {
            alert('No hay stock del producto seleccionado');
        }    
        comprar=parseInt(prompt('Quieres seguir comprando? 1. Si / 2. No'))
}
let cod_desc = parseInt(prompt('Tienes un codigo de descuento? 1. Si / 2. No'))
if(cod_desc === 1){
    let desc = prompt('Ingrese codigo de descuento: ');
    subTotal = descuento(subTotal,desc);
    alert('El total de su compra es: '+subTotal);
}else {
    alert('El total de su compra es :'+subTotal);
}
function descuento(monto,desc){
    if(desc === 'DESCU1'){
        monto = monto * 0.85;
        return monto;
    } else if(desc === 'BRANKHAAMIGO'){
        monto = monto * 0.80;
        return monto;
    }else{
        alert('El codigo de descuento es incorrecto');
        return monto;
    }
}
alert('Gracias por su compra');
