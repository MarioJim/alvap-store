import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import unavailable from './unavailable.png';

const StyledView = styled(Link)<ProductProps>`
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

  width: 20%;
  margin: 2.5%;
  display: inline-block;
  border: 1px solid #ccc;

  img {
    width: 100%;
  }
  div {
    width: 100%;
    border: 1px solid #ccc;
  }
  p {
    width: 100%;
    text-align: center;
    margin: 0;
    font-family: 'Work Sans', sans-serif;
    color: #333;
  }
  .nombre {
    font-weight: bold;
  }
  @media (max-width: 760px) {
    width: 40%;
    margin: 5%;
  }
`;

interface ProductProps {
  id: string;
  nombre: string;
  precio: string;
}

const Product: React.FunctionComponent<ProductProps> = ({
  id,
  nombre,
  precio,
}) => (
  <StyledView to={`/producto/${id}`} id={id} nombre={nombre} precio={precio}>
    <img src={unavailable} alt="Not available" />
    <div>
      <p className="nombre">{nombre}</p>
      <p className="precio">${precio}.00</p>
    </div>
  </StyledView>
);

export default Product;
