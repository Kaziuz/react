import React from 'react';

//redux
import { connect } from 'react-redux';

const SongDetail = (props) => {

    if(!props.selectedSong) return <div>No hay una canción seleccionada</div>;
    const {duration, title} = props.selectedSong;

    return (
        <div>
            <h3>Detalles para:</h3>
            <p>Título:<span> {title}</span><br/>Duración:<span> {duration}</span></p>
        </div>
    );
}

// state
const mapStateToProps = (state) => {
    return { selectedSong: state.selectedSong }
};

export default connect (mapStateToProps)(SongDetail);