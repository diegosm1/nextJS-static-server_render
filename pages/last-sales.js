import { useEffect, useState } from "react";
import useSWR from 'swr'

function LastSalesPage(props) {

    const [sales, setsales] = useState(props.sales);

    
    // const [loading, setloading] = useState(false)

    const fetcher = (...args) => fetch(...args).then(res => res.json());

    const { data, error } = useSWR('https://curso-react-bfcaf-default-rtdb.firebaseio.com/sales.json', fetcher);

    useEffect(() => {
        const transformedSales = []
        if (data) {
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
                setsales(transformedSales);
            }
        }
    }, [data])




    // useEffect(() => {
    //     setloading(true)
    //     fetch('https://curso-react-bfcaf-default-rtdb.firebaseio.com/sales.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const transformedSales = [];
    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 })
    //             }
    //             setsales(transformedSales);
    //             setloading(false)
    //         })


    // }, []);

    if (error) {
        return <p>Failed to Load.</p>
    }

    if (!data) {
        return <p>Is Loading...</p>
    }

    if (!sales) {
        return <p>Loading...</p>
    }


    // if (loading) {
    //     return <p>Cargando...</p>
    // }



    return (
        <ul>
            {sales.map(sale => (
                <li key={sale.id}>
                    <h1>{sale.username}</h1>
                    <h2>{sale.volume}</h2>
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {

    const response =  await fetch('https://curso-react-bfcaf-default-rtdb.firebaseio.com/sales.json');

    const data = await response.json();

    const dataTransformed = [];

    for (const key in data ){
        dataTransformed.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        });
    }   
    return {
        props: {
            sales: dataTransformed
        }
    }
}

export default LastSalesPage;