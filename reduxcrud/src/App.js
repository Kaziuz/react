import React, { Component } from 'react';

// router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

// componentes
import Header from './components/Header';
import EditarProducto from './components/EditarProducto';
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';

class App extends Component {
  render() {
    return (
      //envuelvo la app en el provider de redux
      <Provider store={store}>

        {/*envuelvo todo en el router*/}
        <Router>

          <React.Fragment>
            <Header />
            <div className="container">
              <Switch>

                <Route exact path="/" component={Productos} />
                <Route exact path="/productos/nuevo" component={NuevoProducto} />
                <Route exact path="/productos/editar/:id" component={EditarProducto} />

              </Switch>
            </div>
          </React.Fragment>


        </Router>

      </Provider>
    );
  }
}

export default App;
