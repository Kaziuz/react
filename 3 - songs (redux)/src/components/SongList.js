import React, {Component} from 'react';
 
// redux
import {connect} from 'react-redux';
import { selectSong } from '../actions';

class SongList extends Component{

    // rendereamos la lista de canciones
    renderList(){
        return this.props.songs.map( song => {
            return(
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <button className="ui button primary"
                            onClick={() => this.props.selectSong(song)}
                        >Select</button>
                    </div>
                    <div className="content">{song.title}</div>
                </div>
            )
        } );
    }


    render(){
        // Agremaos esta fuincion con () para que se ejecute junto con render
        return(
            <div className="ui divided list">{this.renderList()}</div>
        );
    }
}

// state
const mapStateToProps = state => {
    //console.log(state)
    return { songs: state.songs };
};

export default connect(mapStateToProps, { selectSong })(SongList);