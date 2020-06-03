import React from 'react'
import styled from "@emotion/styled";


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

    @media (max-width: 760px){
        transform: ${({open})=>open ? 'translateX(0)' : 'translateX(100%)'};
        flex-flow: column nowrap;
        background-color: red;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 15rem;
        padding-top: 3.5rem;
        margin-top: 0;
        transition: transform 0.3s ease-in-out;

        li{
            color: white;
        }
    }
`;

const Menu= ({open}:{open: boolean})=>{
  return(
      <Ul open={open}>
        <li>Store</li>
        <li>About us</li>
        <li>Account</li>
        <li>Coupons</li>
        <li>Past orders</li>
      </Ul>
    );
}

export default Menu