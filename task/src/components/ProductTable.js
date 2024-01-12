import { useEffect, useState } from "react";

const ProductTable = ({ products }) => {

    useEffect(()=>{
        console.log("peoducts ", products)
    }, [products])
 
  return (
    <div className="product-table">
      <div></div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
