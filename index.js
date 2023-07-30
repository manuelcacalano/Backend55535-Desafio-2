const ProductManager = require('./ProductManager.js')
const products = new ProductManager('./products.json')

async function app() {

    const product1 = {
        title: 'Producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: '1',
        stock: 25
    }
    const product2 = {
        title: 'Producto prueba 2',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: '2',
        stock: 25
    }
    const product3 = {
        title: 'Producto prueba 3',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: '3',
        stock: 25
    }
    const product4 = {
        title: 'Producto prueba 4',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: '4',
        stock: 25
    }


//Añado productos

await products.addProducts(product1).then(data => console.log(data))
await products.addProducts(product2).then(data => console.log(data))
await products.addProducts(product3).then(data => console.log(data))
await products.addProducts(product4).then(data => console.log(data))

//Obtengo productos
await products.getProducts().then(data => console.log(data))

//Obtengo productos por ID
await products.getProductById(3).then(data => console.log(data))

//Actualizo un producto
await products.updateProducts(4, {
        title: 'Producto prueba 4 actualizado',
        description: 'Este es un producto prueba actualizado',
        price: 201,
        thumbnail: 'Sin imagen',
        code: '5',
        stock: 26
    })
    await products.getProductById(4).then(data => console.log(data))
//Elimino un producto
    await products.deleteProduct(4)
}
app()