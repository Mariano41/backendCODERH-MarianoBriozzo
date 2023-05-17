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

        const producto = {
            id:this.id++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock

        }

        this.#products.push(producto)

   } 
}





if (!title || !description || !price || !thumbnail || !code || !stock) {
    this.title= title;
    this.description= description;
    this.price= price;
    this.thumbnail= thumbnail;
    this.code= code;
    this.stock= stock;
    this.id = this.id++; 

    return
   
}





let producto1 = new ProductManager("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

console.log(producto1)