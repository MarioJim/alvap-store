import React from 'react';
import styled from '@emotion/styled';
import { Link, useHistory } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

interface UlProps {
  open: boolean;
}

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

interface MenuProps extends UlProps {
  onClick: () => void;
  cookies: Cookies;
}

interface LinkProperties {
  name: string;
  path: string;
}

const LoggedOut: LinkProperties[] = [
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Regístrate',
    path: '/registrate',
  },
  {
    name: 'Login de repartidor',
    path: '/login-repartidor',
  },
  {
    name: 'Registro de repartidor',
    path: '/registrate-repartidor',
  },
  {
    name: 'Cuenta',
    path: '/cuenta',
  },
];

const LoggedInAsUser: LinkProperties[] = [
  {
    name: 'Tienda',
    path: '/tienda',
  },
  {
    name: 'Nosotros',
    path: '/nosotros',
  },
  {
    name: 'Añade una tarjeta',
    path: '/pago',
  }, 
  {
    name: 'Carrito',
    path: '/carrito',
  },
];

const LoggedInADeliveryMan: LinkProperties[] = [
  {
    name: 'Nosotros',
    path: '/nosotros',
  },
];

const Menu: React.FunctionComponent<MenuProps> = ({
  cookies,
  open,
  onClick,
}) => {
  const history = useHistory();
  const deliveryID = cookies.get('delivery');
  const userID = cookies.get('user');
  const isLoggedIn = !!deliveryID || !!userID;
  const links: LinkProperties[] = [];
  if (deliveryID) links.push(...LoggedInADeliveryMan);
  else if (userID) links.push(...LoggedInAsUser);
  else links.push(...LoggedOut);
  return (
    <Ul open={open}>
      {links.map((linkProperties, i) => (
        <Link key={i} to={linkProperties.path}>
          <li onClick={onClick}>{linkProperties.name}</li>
        </Link>
      ))}
      {isLoggedIn && (
        <li
          onClick={() => {
            onClick();
            cookies.remove('user');
            cookies.remove('delivery');
            history.push('/login');
          }}
        >
          Log out
        </li>
      )}
    </Ul>
  );
};

export default withCookies(Menu);
