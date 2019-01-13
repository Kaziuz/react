import React, {useState,useEffect} from 'react';
import axios from 'axios';

// extraemos la lógica del hook para reutilizarla
const useResources = (resource) => {
    const [resources,setResource] = useState([]);// init state + setState

    // Esta función se ejecuta la primera vez 
    // que se renderiza el componente
    // y cada vez que haya una actualizacion 
    // reemplazando asi willMount y didUpdate
    useEffect( () => {
        (async resource => {
            const res = await axios.get(
                `https://jsonplaceholder.typicode.com/${resource}`
            );

        setResource(res.data) // set state

        })(resource); // defino e invoco esta función dentro de use effect
    },
    [resource]) // didUpdate, recordar reglas!!!

    return resources;
}

const ResourceList = ({ resource }) => {

    const resources = useResources(resource);
    
    return (
        <ul>{
            resources.map(
                record => 
                    <div key={record.id}>
                        <li>{record.title}</li>
                    </div>
            ) 
        }</ul>
    );
}

export default ResourceList;