import React from 'react';
import styled from '@emotion/styled';

const StyledCoupon = styled.div<CouponProps>`
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

  width: 90%;
  margin: 5% 2.5%;
  display: inline-block;
  border: 1px solid #ccc;

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


interface CouponProps {
    c_ID: string;
    nombre: string;
    descuento: string;
    descripcion:string,
}

const Coupon: React.FunctionComponent<CouponProps> = ({ c_ID, nombre, descuento, descripcion }) => (
    <StyledCoupon c_ID={c_ID} nombre={nombre} descuento={descuento} descripcion={descripcion}>
        <div>
            <p className="nombre">{nombre}</p>
            <p className="precio">${descuento}.00</p>
        </div>
    </StyledCoupon>
);

export default Coupon;