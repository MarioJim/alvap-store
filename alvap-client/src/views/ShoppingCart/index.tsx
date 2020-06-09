import React, { useState, useEffect } from 'react';
import { getFromApi } from '../../utils';
import Swipeout from 'rc-swipeout';
import { withCookies, Cookies } from 'react-cookie';

interface Props {
  cookies: Cookies;
}

const ShoppingCart: React.FunctionComponent<Props> = ({ cookies }) => {
  const [products, setProducts] = useState<any[]>([]);
  const cart = cookies.get('cart');
  useEffect(() => {
    getFromApi(`/carts/${cart}`).then((res) => {
      console.log(res);
      setProducts(res);
    });
  }, [cart]);
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '5%' }}>Carrito compras</h1>
      {products.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.71456rem',
            marginTop: '5%',
          }}
        >
          Carrito vacío
        </div>
      ) : (
        products.map((producto) => (
          <div>
            <Swipeout
              right={[
                {
                  text: 'delete',
                  onPress: () => console.log('delete'),
                  style: { backgroundColor: 'red', color: 'white' },
                },
              ]}
            >
              <span>{producto.nombre}</span>
              <span>${producto.precio}</span>
            </Swipeout>
          </div>
        ))
      )}
    </div>
  );
};

export default withCookies(ShoppingCart);
