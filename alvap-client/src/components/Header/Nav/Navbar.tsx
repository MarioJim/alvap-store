import React from 'react'
import styled from "@emotion/styled";
import Menu from './Menu'
import Burger from './Burger';

const Nav = styled.nav({
    width: "100%",
    height: "55px",
    borderBottom: "2px solid #f1f1f1",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
});

const Name = styled.div({
    padding: '15px 0',
});



const Navbar = () =>{
    return (
      <Nav>
        <Name className="ham">AL-VAP</Name>
        <Burger />
        <Menu />
      </Nav>
    );
}

export default Navbar