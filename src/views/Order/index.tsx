import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id: string
}

interface Props extends RouteComponentProps<MatchParams> { }

const Order: React.FunctionComponent<Props> = ({ match }) => (
  <div>
    <h1>Order page for order {match.params.id}</h1>
  </div>
);

export default Order;
