import React, { useState } from 'react';
import { Icon, Grid, Header, Form, Button, Message } from 'semantic-ui-react';

const AboutUs: React.FunctionComponent = () => {
  const [success, setSuccess] = useState(false);
  return (
    <Grid centered padded>
      <br />
      <Header as="h1">Nosotros</Header>
      <p>
        Son las siglas de “Alianza de Valor Proactivo”. Una comunidad de
        productores distribuidores y consumidores quienes buscan impactar de
        manera positiva en el entorno de cada uno de los eslabones de la cadena
        de valor.
      </p>
      <Header as="h3">Síguenos en nuestras redes sociales</Header>
      <Grid.Row>
        <Icon name="facebook" size="huge" />
        <Icon name="instagram" size="huge" />
        <Icon name="twitter" size="huge" />
      </Grid.Row>
      <Header as="h3">Suscríbete y entérate de nuestras actividades</Header>
      <p>Recibirás información sobre ofertas, actividades y actualizaciones</p>
      <Form success>
        <Form.Input label="Correo electrónico" />
        {success && (
          <Message
            success
            header="Listo"
            content="Ya estás inscrito a nosotros"
          />
        )}
        <Button onClick={() => setSuccess(true)}>Enviar</Button>
      </Form>
    </Grid>
  );
};

export default AboutUs;
