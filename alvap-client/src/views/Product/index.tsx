import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getFromApi } from '../../utils';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Product: React.FunctionComponent<Props> = ({ match }) => {
  useEffect(() => {
    getFromApi(`/products/${match.params.id}`).then((res) => console.log(res));
  });
  return (
    <div>
      <h1>Product page for product {match.params.id}</h1>
    </div>
  );
};

export default Product;
