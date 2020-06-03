import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Login: React.FunctionComponent = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        ¿Ya tienes una cuenta?
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
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
          <Button color="teal" fluid size="large">
            Iniciar sesión
          </Button>
        </Segment>
      </Form>
      <Message>
        <Link to="/registrate">Regístrate</Link>
      </Message>
    </Grid.Column>
  </Grid>
);

export default Login;
