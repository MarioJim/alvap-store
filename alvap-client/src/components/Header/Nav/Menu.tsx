import React from 'react'
import styled from "@emotion/styled";

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;

    li{
        padding: 10px;
    }

    @media (max-width: 760px){
        display: none;
        flex-flow: column nowrap;
        background-color: red;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;

        li{
            color: white;
        }
    }
`;

const Menu=()=>{
    return (
      <Ul>
        <li>Store</li>
        <li>About us</li>
        <li>Account</li>
        <li>Coupons</li>
        <li>Past orders</li>
      </Ul>
    );
}

export default Menu