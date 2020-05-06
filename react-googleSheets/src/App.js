import React, { Component } from 'react';
import './App.css';
import Tabletop from 'tabletop';

class App extends Component {

  constructor(){
    super();
    this.state = {
      datos: []
    }
  }

  componentDidMount(){
    Tabletop.init({
      // key for database in google drive
      key: '175Ks3kL4pITd4F0gqFCYOnP-C_B8I845cLz9dl2lvBg',
      callback: dataDeGoogle => {
        //console.log(dataDeGoogle)
        this.setState({ datos: dataDeGoogle })
      }, 
      simpleSheet: true
    })
  }

  render() {
    const { datos } = this.state;
    const { id,fecha,titulo,descripcion1,imagen1 } = datos;
    console.log(datos);
    return (
      <div className="App">
        <article>
          {
            datos.map( fila => {
              return (
                <div key={fila.id}>
                  <h1>{fila.titulo}</h1>
                  <p>{fila.descripcion1}</p>
                  <img alt={fila.fecha} src={fila.imagen1}/>
                </div>
              )
            })
          }
        </article>
      </div>
    );
  }
}

export default App;
