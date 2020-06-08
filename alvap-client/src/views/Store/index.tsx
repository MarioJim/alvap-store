import React, { useEffect, useState } from 'react';
import { getFromApi } from '../../utils';
import Product from './product';

const Store: React.FunctionComponent = () => {
  const [productos, setProductos] = useState<any[]>([]);
  useEffect(() => {
    getFromApi(`/products`).then((res) => {
      console.log(res);
      setProductos(res);
    });
  }, []);
  
  return (
    <div>
      <h1 style={{textAlign:'center'}}>Store page</h1>
      <div>
        {productos.map((producto, i) => (
          <Product p_ID={producto.id} nombre={producto.nombre} precio={producto.precio}/>
        ))}
      </div>
    </div>
  );
};

export default Store;