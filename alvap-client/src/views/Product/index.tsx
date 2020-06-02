import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  id: string
}

interface Props extends RouteComponentProps<MatchParams> { }

const Product: React.FunctionComponent<Props> = ({ match }) => (
  <div>
    <h1>Product page for product {match.params.id}</h1>
  </div>
);

export default Product;
