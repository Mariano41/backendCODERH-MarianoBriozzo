const fs = require("fs");

class ProductManager {
  #products;
  file;

  constructor(file) {
    this.file = file;
    this.#products = [];
    this.id = 0;
  }


  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFileSync(this.file, "utf-8");
        this.#products = JSON.parse(data);
        if (data) {
          this.#products = JSON.parse(data);

          if (
            !title ||
            !description ||
            !price ||
            !thumbnail ||
            !code ||
            !stock
          ) {
            console.log("Todos los campos son obligatorios");
            return;
          }

          const codigoExistente = this.#products.find(
            (product) => product.code === code
          );
          if (codigoExistente) {
            console.error("El código de producto esta repetido");
            return;
          }

          const producto = {
            id: this.id++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
          };
          this.#products.push(producto);
          await fs.promises.writeFile(
            this.file,
            JSON.stringify(this.#products, null, "\t")
          );
          console.log("Producto agregado correctamente");
        } else {

          await fs.promises.writeFile(
            this.file,
            JSON.stringify([products], null, "\t")
          );
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProducts() { 
    try {
    if (fs.existsSync(this.file)) {
      const data = await fs.promises.readFile(this.file, "utf-8");
      if (data) {
        this.#products = JSON.parse(data);
        return this.#products;
      }
    } else {
      console.log("Archivo inexistente");
    }
  } catch (error) {
    throw new Error(error);
  }
}
  


  async getProductById(id) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.#products = JSON.parse(data);
          const product = await this.#products.find((prod) => prod.id === id);
          if (product) {
            console.log("El producto existe, es el siguiente: ", product);
            return ;
          } else {
            console.log(`Producto no encontrado`);
          }
        }
      } else {
        console.log("No existe el archivo");
      }
    } catch (error) {
      throw new Error("Error: ", error);
    }
  }


  async updateProductById(id, product) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.#products = JSON.parse(data);
          const index = this.#products.findIndex((prod) => prod.id === id);
          if (index !== -1) {
            this.#products[index] = { ...this.#products[index], ...product };
            await fs.promises.writeFile(
              this.file,
              JSON.stringify(this.#products, null, "\t")
            );
            console.log("Product Updated");
          } else {
            console.log("Not found");
          }
        } else {
          console.log("No existe el archivo");
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async removeProductById(id) {
    try {
      if (fs.existsSync(this.file)) {
        const data = await fs.promises.readFile(this.file, "utf-8");
        if (data) {
          this.#products = JSON.parse(data);
          const index = this.#products.findIndex((prod) => prod.id === id);
          if (index !== -1) {
            this.#products.splice(index, 1);
            await fs.promises.writeFile(
              this.file,
              JSON.stringify(this.#products, null, "\t")
            );
            console.log("Producto eliminado");
          }
        } else {
          console.log("Not found");
        }
      } else {
        console.log("No existe el archivo");
      }
    } catch (error) {
      throw new Error(error);
    }
 }}



const producto = new ProductManager("Productos.JSON");

const productos = producto.getProducts();

(async function () {
await producto.addProduct({
 title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
});
await producto.addProduct({
 title: "producto prueba 2",
 description: "Este es un producto prueba 2",
 price: 201,
 thumbnail: "Sin imagen 2",
 code: "abc1234",
 stock: 26
});
await producto.addProduct({
title:  "producto prueba 3",
description:  "Este es un producto prueba 3",
price:  202,
thumbnail:  "Sin imagen 3",
code: "abc1234",
stock:  28 //error de mismo codigo de producto
}); 
await producto.addProduct({
    title:  "producto prueba 3",
//error de faltan campos
    }); 
})();


(async function () { console.log(await producto.getProducts()); })();


(async function () { console.log(await producto.getProductById(1)); })();
(async function () { console.log(await producto.getProductById(23)); })();





(async function () { await producto.updateProductById(1, { title: "Producto 1 actualizado" }) })();

(async function () { await producto.removeProductById(3) })();