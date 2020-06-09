import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav';
import AboutUs from './views/AboutUs';
import Account from './views/Account';
import AddCard from './views/AddCard';
import Confirmation from './views/Confirmation';
import Coupons from './views/Coupons';
import Login from './views/Login';
import Order from './views/Order';
import PastOrders from './views/PastOrders';
import Product from './views/Product';
import SignUp from './views/SignUp';
import ShoppingCart from './views/ShoppingCart';
import Store from './views/Store';
import DeliveryLogin from './views/Delivery/Login';
import Register from './views/Delivery/Register';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

const App: React.FunctionComponent = () => (
  <BrowserRouter>
    <Nav />
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/nosotros" component={AboutUs} />
      <Route path="/cuenta" component={Account} />
      <Route path="/pago" component={AddCard} />
      <Route path="/confirmacion" component={Confirmation} />
      <Route path="/cupones" component={Coupons} />
      <Route path="/login-repartidor" component={DeliveryLogin} />
      <Route path="/registrate-repartidor" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/orden/:id" component={Order} />
      <Route path="/ordenes" component={PastOrders} />
      <Route path="/producto/:id" component={Product} />
      <Route path="/registrate" component={SignUp} />
      <Route path="/carrito" component={ShoppingCart} />
      <Route path="/tienda" component={Store} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
