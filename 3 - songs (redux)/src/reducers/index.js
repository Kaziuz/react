import { combineReducers } from 'redux';

// reducer que me da todas las canciones
const songsReducer = () => {
    return [
      { title: 'No Scrubs', duration: '4:05' },
      { title: 'Macarena', duration: '2:30' },
      { title: 'All Star', duration: '3:15' },
      { title: 'I Want it That Way', duration: '1:45' }
    ];
};

// reducer que me da la canción seleccionada segun el type 
const selectedSongReducer = (selectedSong=null, action) => {
    if(action.type === 'SONG_SELECTED'){
        return action.payload;
    }
    return selectedSong;
}

// asignamos a cada aspecto de la data su respectivo reducer, osea su proximo state
export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});