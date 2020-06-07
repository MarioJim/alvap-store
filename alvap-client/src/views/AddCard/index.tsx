import React from 'react';
import {
  Form, 
  Grid,
  Header,
  Segment,
  FormInput,
  Table,
  Message
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AddCard: React.FunctionComponent = () => (
  <Grid textAlign="center" style={{ height: '100vh'}} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450}}>
      <Header as="h2" color="teal" textAlign="center">
        Ingresa los datos de tu tarjeta
      </Header>
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="credit card"
            iconPosition="left"
            placeholder="Numero de tarjeta"
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Nombre del titular"
          />
          <Table celled>
            <Table.Row>
              <Table.Cell>
                <Form.Input
                  fluid
                  icon="calendar"
                  iconPosition="left"
                  placeholder="month"
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  fluid
                  icon="calendar"
                  iconPosition="left"
                  placeholder="year"
                />
              </Table.Cell>
            </Table.Row>
          </Table>
          <FormInput
            fluid 
            icon="credit card outline"
            iconPosition="left"
            placeholder="cvv"
          />
        </Segment>
      </Form>
      <Message>
        <Link to="/confirmacion">Confirmar método de pago</Link>
      </Message>
    </Grid.Column>
  </Grid>
);

export default AddCard;
