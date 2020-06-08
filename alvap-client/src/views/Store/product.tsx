import React from 'react';
import styled from '@emotion/styled';
import unavailable from './unavailable.png';

const StyledView=styled.div<ProductProps>`
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

  width: 20%;
  margin: 2.5%;
  display: inline-block;
  border: 1px solid #ccc;

  img{
    width: 100%;
  }
  div{
    width:100%;
    border: 1px solid #ccc;
  }
  p{
    width:100%;
    text-align:center;
    margin:0;
    font-family: 'Work Sans', sans-serif;
    color: #333;
  }
  .nombre{
    font-weight: bold;
  }
  @media (max-width: 760px) {
    width: 40%;
    margin: 5%;
  }
  
`;


interface ProductProps{
    p_ID: string;
    nombre: string;
    precio: string;
}

const Product: React.FunctionComponent<ProductProps> = ({ p_ID, nombre, precio }) => (
    <StyledView p_ID={p_ID} nombre={nombre} precio={precio}>
        <img src={unavailable} alt="Not available"/>
        <div>
            <p className="nombre">{nombre}</p>
            <p className="precio">${precio}.00</p>
        </div>
    </StyledView>
);

export default Product;