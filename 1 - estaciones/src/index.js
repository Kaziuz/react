import React from 'react';
import ReactDOM from 'react-dom';
import MostrarTemporada from './MostrarTemporada';
import Spinner from './Spinner';

class App extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            latitude: null,
            errorMes: ''
        }
    }

    componentDidMount(){
        // hago una llamada a la api de geolocalizazion
        // y le digo que me de la posición actual
        window.navigator.geolocation.getCurrentPosition(
            ( position ) => {
                this.setState({ latitude: position.coords.latitude });
                //console.log(position.coords.latitude)
            },
            (err) => this.setState({ errorMes: err.message })
        ); 
    }

    renderContent(){
        // si hay mensaje de error y no hay latitud
        if(this.state.errorMes && !this.state.lat){
            return ( <div> error: {this.state.errorMes} </div> );
        }
        // si no hay mensaje de error y hay latitud
        else if(!this.state.errorMes && this.state.latitude){
            return ( <MostrarTemporada lat={this.state.latitude} /> );
        }
        // si aun ni hay respuesta del navegador
        else {
            return (
                <Spinner message="Por favor Acepte la petición de su ubicación actual"/>
            );
        }
    }


    render(){
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    };
}

ReactDOM.render(<App />, document.getElementById('root'));

