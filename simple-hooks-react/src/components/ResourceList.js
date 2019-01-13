import React from 'react';
import useResources from './useResources';


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