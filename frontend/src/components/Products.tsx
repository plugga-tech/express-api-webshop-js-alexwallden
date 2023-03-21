import axios from 'axios'
import React, { useState } from 'react'
import { environment } from '../../environment'

const Products = () => {
  const [products, setProducts] = useState()

  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get(`${environment.API_URL}/products`);
      console.log(data);
    } catch (err: any) {
      console.log(err.response.data);
      
    } 
  }

  return (
    <div>
      
    </div>
  )
}

export default Products
