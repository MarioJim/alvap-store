import React from 'react';
import {
  Form,
  Grid,
  Header,
  Segment,
  Table
} from 'semantic-ui-react';

const AboutUs: React.FunctionComponent = () => (
  <Grid textAlign="center" style={{ height: '100vh'}} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450}}>
      <Header as="h2" color="teal" textAlign="center">
        ¡Gracias por tu pedido!
        El número de confirmacion es:
      </Header>
      <Form size="large">
        <Segment stacked>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>
                  Número de pedido
                </Table.HeaderCell>
                <Table.HeaderCell singleLine>
                  Repartidor
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Teléfono
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  ########
                </Table.Cell>
                <Table.Cell>
                  Nombre
                </Table.Cell>
                <Table.Cell>
                  777
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
);

export default AboutUs;
