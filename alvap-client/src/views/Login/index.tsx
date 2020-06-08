import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { postToApi } from '../../utils';

const Login: React.FunctionComponent = () => {
  const history = useHistory();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleSubmit = () => {
    postToApi('/login', {
      correo,
      password,
    }).then((res) => {
      if (res.error) {
        setError(res.error[0]);
      } else {
        setError('');
        setSuccess(true);
        setTimeout(() => {
          history.push('/tienda');
        }, 2000);
      }
    });
  };
  return (
    <Grid
      textAlign="center"
      style={{ height: '100vh' }}
      verticalAlign="middle"
      padded
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          ¿Ya tienes una cuenta?
        </Header>
        {success && (
          <Message
            success
            header="Listo"
            content="Te redirigiremos a la tienda"
          />
        )}
        {error !== '' && <Message error header="Error" content={error} />}
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Correo electrónico"
              autoComplete="username"
              value={correo}
              onChange={(_, { value }) => setCorreo(value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Contraseña"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(_, { value }) => setPassword(value)}
            />
            <Button color="teal" fluid size="large" type="submit">
              Iniciar sesión
            </Button>
            <br />
            <Button
              color="blue"
              fluid
              size="large"
              onClick={() => history.push('/registrate')}
            >
              Registrate
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
