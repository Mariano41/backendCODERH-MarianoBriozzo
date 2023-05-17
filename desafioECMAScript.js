class ProductManager {

    #products;

    constructor() {
        this.#products = [];
        this.id = 0;
    }

    getProducts() {
        return this.#products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return

        }

        const producto = {
            id: this.id++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock

        }

        this.#products.push(producto)

    }

    getProductById(id) {
        const existeProducto = this.#products.find((elemento) => {
            return elemento.id == id
        })

        if (existeProducto) {
            const prod = existeProducto.title;
            console.log(`El producto existe, es el siguiente: ${prod}`)
        } else {
            console.log("Not found")
        }

    }
}


const producto = new ProductManager()

const productos = producto.getProducts();

producto.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.log(productos)

producto.getProductById(0) //Producto que existe
producto.getProductById(2) //Producto que NO existe