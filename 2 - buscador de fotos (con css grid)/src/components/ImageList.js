import React from 'react';
import ImageCard from './ImageCard';

import './ImageList.css';

// este componente se repite cuentas imagenes vengan en las props
const ImageList = (props) => {
    
    // por cada imagen agregamos un componente
    const imagenes = props.imagenes.map( imagen => {
        return <ImageCard key={imagen.id} imagen={imagen}/>
    }); 

    return(
        <div className="image-list">{imagenes}</div>
    );
}

export default ImageList;