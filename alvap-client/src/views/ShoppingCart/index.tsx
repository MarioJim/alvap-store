import React, {useState, useEffect} from 'react';
import { RouteComponentProps } from 'react-router-dom'
import { getFromApi } from '../../utils';
import Swipeout from 'rc-swipeout';

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
    /*
        <Product
          key={producto.id}
          id={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
        /> */
    });
  }, [match.params.id]);
  return (
    <div>
      <h1 style={{textAlign:'center', marginTop:'5%'}}>ShoppingCart page for order {match.params.id}</h1>
      {order.length === 0 ? (
        <div style={
          {
            textAlign:'center',
            fontSize: '1.71456rem',
            marginTop: '5%'
          }
        }>Carrito vacío</div>
      ) : (
        order.map((producto) => (
          <div>
            <Swipeout
              right={
                [
                  {
                    text: 'delete',
                    onPress: () => console.log('delete'),
                    style: { backgroundColor: 'red', color: 'white' },
                  }
                ]}>
                  <span>{producto.nombre}</span><span>${producto.precio}</span>
            </Swipeout>
          </div>
        ))
      )}
    </div>
  );
};

export default ShoppingCart;
