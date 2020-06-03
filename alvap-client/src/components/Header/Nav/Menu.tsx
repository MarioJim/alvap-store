import React from 'react'
import styled from "@emotion/styled";
import { Link } from 'react-router-dom';


interface MenuProps {
  open: boolean
}
const Ul = styled.ul<MenuProps>`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    z-index: 10;

    li{
        padding: 10px;
    }

    a{
      color: rgba(0,0,0,.87);
    }

    @media (max-width: 760px){
        transform: ${({open})=>open ? 'translateX(0)' : 'translateX(100%)'};
        flex-flow: column nowrap;
        background-color: #008079;
        position: fixed;
        top: 0;
        right: 0;
        height: 150vh;
        width: 80vw;
        padding-top: 10vh;
        margin-top: 0;
        margin-bottom:0;
        transition: transform 0.3s ease-in-out;

        li{
            color: white;
            padding-right: 12.5%;
            padding-top: 5vh;
            padding-bottom: 0;
            font-size: 1.71428571rem;
            height: auto;
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
            text-align:right;
        }
        a{
          color: white;
        }
    }
`;

const Menu= ({open}:{open: boolean})=>{
  return(
      <Ul open={open}>
        <li><Link to="/tienda">Store</Link></li>
        <li><Link to="/nosotros">About us</Link></li>
        <li><Link to="/login">Log in</Link></li>
        <li>Coupons</li>
        <li>Past orders</li>
      </Ul>
    );
}

export default Menu