import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function SingleProductDetail() {

    const {id} = useParams();
    const [product, setProduct] = useState({})
    // const [isLoading, setIsLoading] = useState({})

    // set up useState
    // set up useEffect -> api call
    
    useEffect(() => {
        axios.get(`https://ecommerce-sagartmg2.vercel.app/api/products/${id}`)
        .then(res => {
            setProduct(res.data.data)
        })
        
    },[])
    
    return (
        <div className='container'>
            <h2>Show Product details...</h2>
            {
                ! product.name
                &&
                <p>Loading.....</p>
            }
            {JSON.stringify(product)}

            <button className='btn'>Add to cart...</button>
            
        </div>
    )
}
