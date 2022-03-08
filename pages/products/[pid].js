import React from 'react';
import fs from 'fs/promises';
import path from 'path';
function ProductDetailPage({ loadedProduct }) {

    if(!loadedProduct) {
        return <p>is Loaded...</p>
    }

    return (
        <>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </>
    );
}

const  getData =  async() => {
    

    const filePath = path.join(process.cwd(), 'data', 'dummy_data.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data
}

export async function getStaticProps(context) {

    //contiene las rutas dentro de las rutas dinamicas
    const { params } = context;
    //extraemos el id a traves de la propiedad params en [pid] que es el nombre del archivo dinamico
    const productId = params.pid;

    const data  = await getData();

    const product = data.products.find(product => product.id === productId);

    if(!product) {
        return {
            notFound: true
        }
    } 
    return {
        props: {
            loadedProduct: product
        }
    };

}

export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map(product => product.id); //mapeamos para obtener el id de cada producto
    const pathsWithParams = ids.map(id => ({params: {pid: id}})); //trasnformamos cada id en un array de objetos 
    return {
        paths: pathsWithParams, //rutas de cada pagina para pre-cargarlas
        fallback: true // permite que las paginas que no se han precargado previamente en los paths se muestren 
    };
}

export default ProductDetailPage;