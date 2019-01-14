import React from 'react';

import './MostrarTemporada.css';

// para el hemisferio norte: verano 3,4,5,6,7,8 | invierno 9,10,11,0,1,2  
// para el hemisferio sur: verano 0,1,2,9,10,11 | inbierno 3,4,5,6,7,8

// hacemos un objeto de configuracion del componente para evitar todo el ruido que hay abajo
const configTemporada = {
    verano:{
        text: "Hey, no vamos a salir, a la playa a tomar pola",
        iconName: 'sun'
    },
    invierno:{
        text: "Hey, esta haciendo mucho frio !!!",
        iconName: 'snowflake'
    }
};

// esta funcion obtiene la temporada del usuario según su ubicacion y el mes
const getSeason = (lat, mes) => {
    if(mes > 2 && mes < 9){ // meses de verano en hemisferio norte
       return lat > 0 ? 'verano' : 'invierno';
    } else {
        return lat > 0 ? 'invierno' : 'verano';
    }
}

const MostrarTemporada = (props) => {
    // nos devuelve invierno o verano
    const temporada = getSeason( props.lat, new Date().getMonth() );
    // le pasamos la respuesta de la emporada al objeto para que nos de lo que hay que mostrar
    const { text, iconName } = configTemporada[temporada];

    return(
        <div className={`mostrar-temporada ${temporada}`}>
            <i className={`icon-left massive ${iconName} icon`} />
            <h1>{text}</h1>
            <i className={`icon-right massive ${iconName} icon`} />
        </div>
    );
};

export default MostrarTemporada;