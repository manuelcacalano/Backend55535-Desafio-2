const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }
    writeFile = async data => {
        try {
            await fs.promises.writeFile(
                this.path, JSON.stringify(data, null, 2)
            )
        } catch (error) {
            console.log(error)
        }
    }
    getProducts = async () => {
        try {
            const productsList = await fs.promises.readFile(this.path, 'utf-8')
            const products = productsList === "" ? [] :  JSON.parse(productsList)
            return products
        } catch (error) {
            if(error.message.includes('ENOENT: no such file or directory')) return []
            console.log(error)
        }
    }
    addProducts = async product => {
        try {
            if (this.#validator(product)) {
            let products = await this.getProducts()
            let newId
            let newCode = products.find(prod => prod.code === product.code)
            products.length === 0 ? newId = 1 : newId = products[products.length - 1].id + 1
            if(!Object.values(product).every(value => value)){
                return console.log('Falta completar algún campo')
            }
            if(newCode) return console.log('Ya existe un producto con ese codigo')
            const newProduct = {...product, id:newId}
            products.push(newProduct)
            await this.writeFile(products)
            return this.getProducts()
        }
        } catch (error) {
            console.log(error)
        }
    }
    updateProducts = async (id, data) => {
        try {
            const products = await this.getProducts()
            let product = await this.getProductById(id)
            if(!product) return
            Object.assign(products[id-1], data)
            await this.writeFile(products)
        } catch (error) {
            console.log(error)
        }
    }
    getProductById = async id => {
        try {
            let products = await this.getProducts()
            const product = products.find(prod => prod.id === id)
            return product ? product : console.log('No se encontró el producto')
        } catch (error) {
            console.log(error)
        }
    }
    deleteProduct = async id => {
        try {
            let products = await this.getProducts()
            let product = await this.getProductById(id)
            if(!product) return
            const obj = products.filter(obj => obj.id !== id)
            console.log(`El producto con el id: ${product.id} fue eliminado correctamente`);
            await this.writeFile(obj)
        } catch (error) {
            console.log(error)
        }
    }

    #validator(product) {
        if( product.hasOwnProperty('title') &&
            product.hasOwnProperty('description') &&
            product.hasOwnProperty('price') &&
            product.hasOwnProperty('thumbnail') &&
            product.hasOwnProperty('code') &&
            product.hasOwnProperty('stock')
            ){
                return true
            }
            return console.log('Para añadir un producto debes completar todas sus caracteristicas')
        }
}





module.exports = ProductManager