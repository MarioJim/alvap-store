import React, { useState } from "react";
import styled from "@emotion/styled";


const StyledBurger = styled.div({
    width: '2rem',
    height: '2rem',
    position: 'fixed',
    top: '15px',
    right: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'column nowrap'
});
const Line = styled.div`
    width: 2rem;
    height: 0.25rem;
    background-color: #333;
    border-radius:10px;
`;

const Burger=()=>{
    const [open, setOpen] = useState(false)
    return (
        <StyledBurger>
            <Line></Line>
            <Line></Line>
            <Line></Line>
        </StyledBurger>
    );
}

export default Burger