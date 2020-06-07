import React, { useEffect } from 'react';
import { getFromApi } from '../../utils';

const Store: React.FunctionComponent = () => {
  useEffect(() => {
    getFromApi(`/products`).then((res) => console.log(res));
  });
  return (
    <div>
      <h1>Store page</h1>
    </div>
  );
};

export default Store;
