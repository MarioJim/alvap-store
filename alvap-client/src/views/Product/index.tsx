import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getFromApi } from '../../utils';

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

const Product: React.FunctionComponent<Props> = ({ match }) => {
  const [product, setProduct] = useState<any>({ id: -1 });
  useEffect(() => {
    getFromApi(`/products/${match.params.id}`).then((res) => {
      console.log(res);
      setProduct(res);
    });
  }, [match.params.id]);
  return (
    <div>
      <h1>Product page for product {match.params.id}</h1>
      {product.id === -1 ? (
        <div>Loading</div>
      ) : (
        <div>
          <p>{product.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default Product;
