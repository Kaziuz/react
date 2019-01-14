import React from 'react';

class SearchBar extends React.Component{

    state = { term : '' }

    // cuando apreto enter se ejecuta esta función
    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.terminoBusqueda(this.state.term);
    }

    render(){
        return(
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Busqueda de imagenes</label>
                        <input type="text" 
                            value={this.state.term} 
                            onChange={ e => this.setState({ term: e.target.value }) }/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;