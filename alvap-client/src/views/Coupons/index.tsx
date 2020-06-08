import React, { useEffect, useState } from 'react';
import { getFromApi } from '../../utils';
import Coupon from './coupon';

const Coupons: React.FunctionComponent = () => {
  const [cupones, setCupones] = useState<any[]>([]);
  useEffect(() => {
    getFromApi(`/promos`).then((res) => {
      console.log(res);
      setCupones(res);
    });
  }, []);
  let div;
  if(cupones.length===0){
    div=<p style={{textAlign:'center'}}>No tienes cupones disponibles</p>
  }
  else{
    div = <div>
            {cupones.map((cupon, i) => (
            <Coupon c_ID={cupon.id} nombre={cupon.nombre} descuento={cupon.descuento} descripcion={cupon.descripcion} />
            ))}
          </div>
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Cupones disponibles</h1>
      {div}
    </div>
  );
};

export default Coupons;
