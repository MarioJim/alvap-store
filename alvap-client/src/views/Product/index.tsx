import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getFromApi, postToApi } from '../../utils';
import styled from '@emotion/styled';
import unavailable from '../Store/unavailable.png';
import { Button, Header, Message } from 'semantic-ui-react';
import { withCookies, Cookies } from 'react-cookie';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  cookies: Cookies;
}

const StyleProduct = styled.div<MatchParams>`
  h1,
  h2,
  p {
    text-align: center;
    margin: 0 5%;
  }
  h1 {
    margin: 5%;
    font-size: 2.25rem;
    background-color: #e6fffe;
    padding: 1.25% 0;
  }
  p {
    margin: 0 5% 5% 5%;
    font-size: 1.5rem;
    border: 1px solid #333;
    padding: 2.5% 0;
  }
  img {
    width: 70%;
    margin: 2.5% 12.5%;
  }
  button {
    width: 75%;
    margin: 0 12.5% 5% 12.5% !important;
    font-size: 1.5rem !important;
    padding: 2.5% 0;
    border: 1px solid #bbb;
  }
  a {
    color: black;
  }
  .regresar {
    background-color: #fff;
  }
`;

const Product: React.FunctionComponent<Props> = ({ cookies, match }) => {
  const [product, setProduct] = useState<any>({ id: -1 });
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    getFromApi(`/products/${match.params.id}`).then((res) => {
      console.log(res);
      setProduct(res);
    });
  }, [match.params.id]);
  const cart = cookies.get('cart');
  const handleAddToCart = () => {
    postToApi('/carts/addProduct', {
      id_carrito: cart,
      id_producto: match.params.id,
    }).then((res) => {
      if (!res.errors) {
        setSuccess(true);
      }
    });
  };
  return (
    <StyleProduct id={match.params.id}>
      {product.id === -1 ? (
        <div>Loading</div>
      ) : (
        <div>
          <Header as="h1">{product.nombre}</Header>
          <h2>${product.precio}.00</h2>
          {product.foto === null ? (
            <img src={unavailable} alt="Not available" />
          ) : (
            <img src={product.foto} alt={product.nombre + ' foto'} />
          )}
          <Header as="h2">{product.descripcion}</Header>
          <Button color="teal" onClick={handleAddToCart}>
            Añadir al carrito
          </Button>
          {success && (
            <Message success header="Se ha añadido el producto a tu carrito" />
          )}
          <Link to="/tienda">
            <Button color="blue">Regresar a la tienda</Button>
          </Link>
        </div>
      )}
    </StyleProduct>
  );
};

export default withCookies(Product);
