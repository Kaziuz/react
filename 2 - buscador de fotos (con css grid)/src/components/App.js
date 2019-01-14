import React, { Component } from 'react';
import Peticion from '../api/Peticion';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

import './App.css';

class App extends Component {

  state = {
    imagenes: []
  }

  // obtenemos el dato de busqueda y hacemos la peticion con ese dato
  terminoBusqueda = async (dato) =>{
    const respuesta = await Peticion.get('/search/photos/', {
        params: { query: dato }
      });
    this.setState({ imagenes: respuesta.data.results });
  }

  render(){
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar 
          terminoBusqueda={this.terminoBusqueda}
        />
        <ImageList imagenes={this.state.imagenes}/>
      </div>
      
    );
  }

}

export default App;
