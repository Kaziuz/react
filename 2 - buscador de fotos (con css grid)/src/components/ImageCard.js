import React from 'react';

// este componente renderea la imagen, con un ref
// accedemos al dom para saber su alto y asi
// dinamicamente agregar span en css para darle su espaciado correspondiente
class ImageCard extends React.Component{

    constructor(props){
        super(props);
        this.imageRef = React.createRef();
        this.state = {
            espacios: 0
        }
    }

    componentDidMount(){
        // añadimos un evento para que nos diga cuando la imagen esta en el dom
        this.imageRef.current.addEventListener('load', this.setSpans);
    }

    // fijamos los espacios segun lo necesite la imagen por su altura
    setSpans = () => {
        const altura = this.imageRef.current.clientHeight;
        // el 150 viene de la clase grid-auto-rows: 10px;
        const espacios = Math.ceil(altura / 10);
        this.setState({ espacios });
    }

    render(){
        const { description, urls } = this.props.imagen
        return(
            <div style={{ gridRowEnd: `span ${this.state.espacios}` }}>
                <img
                    ref={this.imageRef} 
                    alt={description} 
                    src={urls.regular}
                />
            </div>
        );
    }
}

export default ImageCard;