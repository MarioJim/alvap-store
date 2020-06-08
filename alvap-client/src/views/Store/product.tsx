import React from 'react';
import styled from '@emotion/styled';
import unavailable from './unavailable.png';

/*
const Ul = styled.ul<UlProps>`
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  z-index: 10;

  li {
    padding: 10px;
  }

  a {
    color: rgba(0, 0, 0, 0.87);
    font-family: 'Work Sans', sans-serif;
  }
  a:hover {
    color: #afb6b6;
  }

  @media (max-width: 760px) {
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    flex-flow: column nowrap;
    background-color: #008079;
    position: fixed;
    top: 0;
    right: 0;
    height: 150vh;
    width: 80vw;
    padding-top: 10vh;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    transition: transform 0.3s ease-in-out;

    li {
      color: white;
      width: 100%;
      padding-right: 12.5%;
      padding-top: 3.5vh;
      padding-bottom: 3.5vh;
      font-size: 1.71428571rem;
      height: auto;
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
      text-align: right;
    }
    li:hover {
      background-color: #004d49;
    }
    a {
      color: white;
    }
    a:hover {
      color: white;
    }
  }
`;
*/
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
        <img src={unavailable} alt="Image not available"/>
        <div>
            <p className="nombre">{nombre}</p>
            <p className="precio">${precio}.00</p>
        </div>
    </StyledView>
);

export default Product;