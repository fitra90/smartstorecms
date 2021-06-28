import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './pages/Login'
import UpdateAdmin from './pages/UpdateAdmin'
import FormProduct from './pages/FormProduct'
import ProductList from './pages/ProductList'
import EditProduct from './pages/EditProduct'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/update-admin">
          <UpdateAdmin />
        </Route>
        <Route path="/new-product">
          <FormProduct />
        </Route>
        <Route path="/edit-product/:id">
          <EditProduct />
        </Route>
        <Route path="/product">
          <ProductList />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
