import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import App from './components/App/App.js';
import Buyer from './components/Buyer/Buyer.js';
import Seller from './components/Seller/Seller.js';
import BuyProduct from './components/BuyProduct/BuyProduct.js';

export const fakeAuth =  {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)  // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to="/" />
  )}/>
);

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
      <PrivateRoute exact path="/buyer" component={Buyer} />
      <PrivateRoute path="/seller" component={Seller} />
      <PrivateRoute path = "/buyer/buyProduct" component={BuyProduct} />
    </div>
  </BrowserRouter>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();