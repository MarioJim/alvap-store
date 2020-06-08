import React, {useState, useEffect} from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { getFromApi } from '../../utils';
import Product from '../Store/product';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const ShoppingCart: React.FunctionComponent<Props> = ({ match }) => {
  const [order, setOrder] = useState<any[]>([]);
  useEffect(() => {
    getFromApi(`/carts/${match.params.id}`).then((res) => {
      console.log(res);
      setOrder(res);
    });
  }, [match.params.id]);
  return (
    <div>
      <h1>ShoppingCart page for order {match.params.id}</h1>
      {order.length === 0 ? (
        <div>Carrito vacío</div>
      ) : (
        order.map((producto) => (
          <Product
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
          />
        ))
      )}
    </div>
  );
};

export default ShoppingCart;
