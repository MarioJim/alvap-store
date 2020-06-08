import React from 'react';
import {
  Grid,
  Header,
  Segment,
  Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Account: React.FunctionComponent = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        Cuenta
      </Header>
      <Segment.Group horizontal>
        <Segment> Nombre </Segment>
        <Segment> Nombre_Usuario </Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment> Correo </Segment>
        <Segment> Correo_Usuario </Segment>
      </Segment.Group>
      <Segment.Group horizontal>
        <Segment> Direccion </Segment>
        <Segment> Direccion_Usuario </Segment>
      </Segment.Group>
      <Label>
        <Link to="/cuenta">Cambiar contraseña</Link>
      </Label>
    </Grid.Column>
  </Grid>
);

export default Account;
