import React, {useState,useEffect} from 'react';
import axios from 'axios';

const ResourceList = ({ resource }) => {

    // init state + setState
    const [resources,setResource] = useState([]);

    /*
    const fetchResource = async (resource) => {
        const res = await axios.get(
            `https://jsonplaceholder.typicode.com/${resource}`
        );
       // this.setState({ resources: res.data })
       setResource(res.data)
    }
    */

    // Esta funciòn se ejecuta la primera vez 
    // que se renderiza el componente
    // y cada vez que haya una actualizacion 
    // reemplazando asi willMount y didUpdate
    useEffect( () => {
        // fetchResource(resource)
        (async resource => {
            const res = await axios.get(
                `https://jsonplaceholder.typicode.com/${resource}`
            );

            setResource(res.data)
        })(resource); // defino e invoco esta función dentro de use effect
    },[resource]) 

    
    return <div>{resources.length}</div>
    
}

export default ResourceList;