import React, { useState } from 'react';
import {
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Button,
} from 'semantic-ui-react';
import { postToApi } from '../../utils';
import { useHistory } from 'react-router-dom';

const SignUp: React.FunctionComponent = () => {
  const history = useHistory();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleSubmit = () => {
    postToApi('/register', {
      correo,
      password,
      domicilio,
      nombre,
    }).then((res) => {
      if (res.error) {
        setError(res.error[0]);
      } else {
        setError('');
        setSuccess(true);
        setTimeout(() => {
          history.push('/login');
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
          Ingresa tus datos
        </Header>
        {success && (
          <Message
            success
            header="Listo"
            content={`Te has registrado como "${correo}"`}
          />
        )}
        {error !== '' && <Message error header="Error" content={error} />}
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
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
              autoComplete="new-password"
              type="password"
              value={password}
              onChange={(_, { value }) => setPassword(value)}
            />
            <Form.Input
              fluid
              icon="home"
              iconPosition="left"
              placeholder="Domicilio"
              value={domicilio}
              onChange={(_, { value }) => setDomicilio(value)}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Nombre"
              value={nombre}
              onChange={(_, { value }) => setNombre(value)}
            />
            <Button color="teal" fluid size="large" type="submit">
              Registrar cuenta
            </Button>
          </Segment>
        </Form>
        <br />
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
