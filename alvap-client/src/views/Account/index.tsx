import React, { useState, useEffect } from 'react';
import {
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';
import { withCookies, Cookies } from 'react-cookie';
import { getFromApi } from '../../utils';

interface AccountProps {
  cookies: Cookies;
}

const Account: React.FunctionComponent<AccountProps> = ({ cookies }) => {
  const userID = cookies.get('user');
  const [cliente, setCliente] = useState<any>([]);
  useEffect(() => {
    getFromApi(`/user/${userID}`).then((res) => {
      console.log(res);
      setCliente(res);
    });
  }, []);
  console.log(cliente.nombre)
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Cuenta
          </Header>
          <Segment.Group horizontal>
            <Segment> Nombre </Segment>
            <Segment> {cliente.nombre} </Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment> Correo </Segment>
            <Segment> {cliente.correo} </Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment> Direccion </Segment>
            <Segment> {cliente.domicilio} </Segment>
          </Segment.Group>
      </Grid.Column>
    </Grid>
  );
};

export default withCookies(Account);
