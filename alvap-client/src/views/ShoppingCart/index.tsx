import React, { useState, useEffect } from 'react';
import { getFromApi, postToApi } from '../../utils';
import Swipeout from 'rc-swipeout';
import { withCookies, Cookies } from 'react-cookie';
import { Form, Message, Button, Grid, Header } from 'semantic-ui-react';
import 'rc-swipeout/assets/index.css';

interface Props {
  cookies: Cookies;
}

const ShoppingCart: React.FunctionComponent<Props> = ({ cookies }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [promoNueva, setPromoNueva] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const cart = cookies.get('cart');
  const loadProducts = () => {
    getFromApi(`/carts/${cart}`).then((res) => {
      setProducts(res);
    });
  };
  const loadPromos = () => {
    getFromApi(`/carts/${cart}/promos`).then((res) => {
      setPromos(res);
    });
  };
  useEffect(() => {
    loadProducts();
    loadPromos();
  }, []);
  const handleAddPromotion = () => {
    postToApi('/carts/addPromo', {
      id_promocion: promoNueva,
      id_carrito: cart,
    }).then((res) => {
      if (res.error) {
        setError(res.error[0]);
        setTimeout(() => {
          setError('');
        }, 3000);
      } else {
        loadPromos();
        setError('');
        setSuccess('añadida');
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }
    });
  };
  const handleRemovePromotion = (id_promocion: any) => {
    postToApi('/carts/removePromo', {
      id_promocion,
      id_carrito: cart,
    }).then((res) => {
      if (res.error) {
        setError(res.error[0]);
        setTimeout(() => {
          setError('');
        }, 3000);
      } else {
        loadPromos();
        setError('');
        setSuccess('quitada');
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }
    });
  };
  return (
    <Grid centered padded>
      <Grid.Row>
        <Header as="h1">Carrito de compras</Header>
      </Grid.Row>
      {products.length === 0 ? (
        <Grid.Row>
          <Header as="h2">Carrito vacío</Header>
        </Grid.Row>
      ) : (
        products.map((producto, i) => (
          <Grid.Row key={i}>
            <Swipeout
              right={[
                {
                  text: 'Quitar',
                  onPress: () => console.log('delete'),
                  style: { backgroundColor: 'red', color: 'white' },
                  className: 'custom-class-2',
                },
              ]}
            >
              <p>{producto.nombre}</p>
              <p>${producto.precio}</p>
            </Swipeout>
          </Grid.Row>
        ))
      )}
      {promos.length === 0 ? (
        <Grid.Row>
          <Header as="h2">Sin promociones</Header>
        </Grid.Row>
      ) : (
        promos.map((promo) => (
          <Grid.Row key={promo.id}>
            <p>{promo.nombre}</p>
            <p>{promo.descripcion}</p>
            <p>{promo.descuento}</p>
            <Button
              negative
              icon="close"
              onClick={() => handleRemovePromotion(promo.id)}
            />
          </Grid.Row>
        ))
      )}
      <Form success>
        <Form.Input
          label="Añadir promoción"
          placeholder="ID de la promoción"
          type="number"
          value={promoNueva}
          onChange={(_, { value }) => setPromoNueva(value)}
        />
        <Button onClick={handleAddPromotion}>Añadir</Button>
      </Form>
      <Grid.Row>
        {success !== '' && (
          <Message
            success
            header="Listo"
            content={`La promoción ya fue ${success}`}
          />
        )}
        {error !== '' && <Message error header="Error" content={error} />}
      </Grid.Row>
    </Grid>
  );
};

export default withCookies(ShoppingCart);
