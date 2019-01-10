import React from 'react';
import axios from 'axios';

class ResourceList extends React.Component{

    state = { resources: [] }

    async componentDidMount(){
        const res = await axios.get(`https://jsonplaceholder.typicode.com/${this.props.resource}`)
        this.setState({ resources: res.data });
    }

    async componentDidUpdate(prevProps){
        // si el estado previo no es igual al state actual
        // entones no ejecute esta funcion
        if(prevProps.resource !== this.props.resource){
            const res = await axios.get(`https://jsonplaceholder.typicode.com/${this.props.resource}`);
            this.setState({ resources: res.data }); 
        }
    }

    render(){
        return(
            <div>{this.state.resources.length}</div>
        );
    }
}

export default ResourceList;