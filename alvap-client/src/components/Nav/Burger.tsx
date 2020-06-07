import React, { useState } from 'react';
import styled from '@emotion/styled';
import Menu from './Menu';

interface StyledBurgerProps {
  open: boolean;
}

const StyledBurger = styled.div<StyledBurgerProps>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 20;
  display: none;

  @media (max-width: 760px) {
    display: flex;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? '#CCC' : '#333')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-of-type(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0deg)')};
    }
    &:nth-of-type(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translate(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-of-type(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0deg)')};
    }
  }
`;

const Burger: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </StyledBurger>
      <Menu open={open} onClick={() => setOpen(!open)} />
    </React.Fragment>
  );
};

export default Burger;
