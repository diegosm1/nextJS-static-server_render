import React from 'react'
import fs from 'fs/promises' //permite leer la data de una archivo del lado del servidor en el lado del cliente
import path from 'path' //permite obtener una ruta especifica en base a los metodos
import Link from 'next/link'
// import fs from 'fs'; //permite leer la informacion sincona dentro de los archivos 


function Home({ products }) {

  return (
    <ul>
      {products.map(product => <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>)}
    </ul>
  )
}

//podemos 
export async function getStaticProps(context) {
  console.log('(Re-)Generacion')
  const filePath = path.join(process.cwd(), 'data', 'dummy_data.json');
  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }

  // propiedad de validacion.
  if (data.products.length === 0) {
    return { notFound: true }
  };

  return { //este tipo de metodo simepre retorna un objeto x
    props: {
      products: data.products,
    },
    revalidate: 10, //es en cuanto tiempo una pagina debe de re-generarse para produccion

  }
}

export default Home;