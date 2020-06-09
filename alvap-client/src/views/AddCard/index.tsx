import React, { useState } from 'react';
import {
  Form, 
  Grid,
  Header,
  Segment,
  FormInput,
  Message,
  Button
} from 'semantic-ui-react';
import { postToApi } from '../../utils';
import { useHistory } from 'react-router-dom';

const AddCard: React.FunctionComponent = () => {
  const history = useHistory();
  const [num, setNum] = useState('');
  const [titular, setTitular] = useState('');
  const [fecha, setFecha] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleSubmit = () => {
    postToApi('/cards', {
      titular,
      num,
      fecha,
      cvv,
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
    })
  };
  return (
    <Grid textAlign="center" style={{ height: '100vh'}} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450}}>
        <Header as="h2" color="teal" textAlign="center">
          Ingresa los datos de tu tarjeta
        </Header>
        {success && (
          <Message
            success
            header="Listo"
            content={`Tu tarjeta se ha añadido`}
          />
        )}
        {error !== '' && <Message error header="Error" content={error} />}
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="credit card"
              iconPosition="left"
              placeholder="Numero de tarjeta"
              autoComplete="numTarjeta"
              value={num}
              onChange={(_, { value }) => setNum(value)}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Nombre del titular"
              autoComplete="nombreTitular"
              value={titular}
              onChange={(_, { value }) => setTitular(value)}
            />
            <Form.Input
              fluid
              icon="calendar"
              iconPosition="left"
              placeholder="Fecha (MM/YY)"
              autoComplete="XX/XX"
              value={fecha}
              onChange={(_, { value }) => setFecha(value)}
            />
            <FormInput
              fluid 
              icon="credit card outline"
              iconPosition="left"
              placeholder="cvv"
              autoComplete="XXX"
              value={cvv}
              onChange={(_, { value }) => setCvv(value)}
            />
            <Button color="teal" fluid size="large" type="submit">
              Añadir tarjeta
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default AddCard;
