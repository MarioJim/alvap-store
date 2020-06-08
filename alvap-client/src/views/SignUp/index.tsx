import React from 'react';
import {
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SignUp: React.FunctionComponent = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        Ingresa tus datos
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="google plus"
            iconPosition="left"
            placeholder="Correo electrónico"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Contraseña"
            type="password"
          />
          <Form.Input
            fluid
            icon="home"
            iconPosition="left"
            placeholder="Domicilio"
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Nombre"
          />
        </Segment>
      </Form>
      <Message>
        <Link to="/registrate">Registrar cuenta</Link>
      </Message>
    </Grid.Column>
  </Grid>
);

export default SignUp;
