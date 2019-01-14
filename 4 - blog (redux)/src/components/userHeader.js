import React from 'react';

// redux
import {connect} from 'react-redux';


class UserHeader extends React.Component{

    render(){
        const {user} = this.props;    
        if(!user) return <div>Cargando informacion</div>;
        return(
            <div className="header">{user.name}</div>
        );
    }
}

// state

// el segundo parametro ownPros son las props que entran o salen del componente, en este caso
// la prop que entra es fetchUser
const mapStateToProps = (state, ownProps) => {
    // buscame en el array de usuarios los id que sean iguales al id de este componente
    return { user: state.users.find(user => user.id === ownProps.userId) }
};

export default connect(mapStateToProps)(UserHeader);