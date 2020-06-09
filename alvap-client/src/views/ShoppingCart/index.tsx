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
  const [successProduct, setSuccessProduct] = useState(false);
  const [errorProduct, setErrorProduct] = useState('');
  const [successPromo, setSuccessPromo] = useState('');
  const [errorPromo, setErrorPromo] = useState('');
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
  const handleRemoveProduct = (id_producto: any) => {
    postToApi('/carts/removeProduct', {
      id_producto,
      id_carrito: cart,
    }).then((res) => {
      if (res.error) {
        setErrorProduct(res.error[0]);
        setTimeout(() => {
          setErrorProduct('');
        }, 3000);
      } else {
        loadProducts();
        setErrorProduct('');
        setSuccessProduct(true);
        setTimeout(() => {
          setSuccessProduct(false);
        }, 3000);
      }
    });
  };
  const handleAddPromotion = () => {
    postToApi('/carts/addPromo', {
      id_promocion: promoNueva,
      id_carrito: cart,
    }).then((res) => {
      if (res.error) {
        setErrorPromo(res.error[0]);
        setTimeout(() => {
          setErrorPromo('');
        }, 3000);
      } else {
        loadPromos();
        setErrorPromo('');
        setSuccessPromo('añadida');
        setTimeout(() => {
          setSuccessPromo('');
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
        setErrorPromo(res.error[0]);
        setTimeout(() => {
          setErrorPromo('');
        }, 3000);
      } else {
        loadPromos();
        setErrorPromo('');
        setSuccessPromo('quitada');
        setTimeout(() => {
          setSuccessPromo('');
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
        products.map((producto) => (
          <Grid.Row key={producto.id}>
            <Swipeout style={{width:'85%', margin:'2.5% 7.5%', height:'55px'}}
              right={[
                {
                  text: 'Quitar',
                  onPress: () => handleRemoveProduct(producto.id),
                  style: { backgroundColor: 'red', color: 'white' },
                  className: 'custom-class-2',
                },
              ]}
            >
              <span style={{ fontWeight: 'bold', marginLeft: '5%'}}>{producto.nombre}</span>
              <span style={{marginLeft:'50%' }}>${producto.precio}</span>
            </Swipeout>
          </Grid.Row>
        ))
      )}
      <Grid.Row>
        {successProduct && (
          <Message
            success
            header="Listo"
            content="El producto ya fue removido"
          />
        )}
        {errorProduct !== '' && (
          <Message error header="Error" content={errorProduct} />
        )}
      </Grid.Row>
      {promos.length === 0 ? (
        <Grid.Row>
          <Header as="h2">Sin promociones</Header>
        </Grid.Row>
      ) : (
        promos.map((promo) => (
          <Grid.Row key={promo.id}>
            <p style={{fontWeight:'bold', marginRight:'5px'}}>{promo.nombre}</p>
            <p style={{ marginRight:'15px'}}>{promo.descripcion}</p>
            <p style={{ fontWeight: 'lighter', color: '#666', marginRight: '5px' }}>${promo.descuento}</p>
            <Button
              negative
              icon="close" style={{marginLeft:'10px'}}
              onClick={() => handleRemovePromotion(promo.id)}
            />
            <br />
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
        {successPromo !== '' && (
          <Message
            success
            header="Listo"
            content={`La promoción ya fue ${successPromo}`}
          />
        )}
        {errorPromo !== '' && (
          <Message error header="Error" content={errorPromo} />
        )}
      </Grid.Row>
    </Grid>
  );
};

export default withCookies(ShoppingCart);
