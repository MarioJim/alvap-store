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
  let info;
  if(cupones.length===0){
    info=<p style={{textAlign:'center'}}>No tienes cupones disponibles</p>
  }
  else{
    info = <p style={{ textAlign: 'center' }}>Cupones disponibles: </p>
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Cupones disponibles</h1>
      {info}
      <div>
        {cupones.map((cupon, i) => (
          <Coupon c_ID={cupon.id} nombre={cupon.nombre} descuento={cupon.descuento} descripcion={cupon.descripcion} />
        ))}
      </div>
    </div>
  );
};

export default Coupons;
