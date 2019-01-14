import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

// obtener posts
/*
    Cuando usamos redux thunk,nos da la posibilidad de hacer async request
    el thunk recibe una función y espera a que se cumpla la promesa
*/

// obtenemos un usuario
// esta action me esta creando muchas peticiones
// necesitamos que esas peticiones se hagan solo una vez y lo 
// solucionamos con lodash y una funcino que se llama memorize
// que se ejecuta solo una vez y no mas en el futuro

// lo otro es que el dispatch es una función que devuelve otra función
export const fetchPostsAndUsers = () => async (dispatch, getState) => { // redux thunk, devolvera una función

    await dispatch(fetchPosts());
    
    // ya que hay un estado inicial entonces tomo del state los id unicos en un array
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach( id => dispatch( fetchUser(id) ));
};


// obtenems post
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
  
    dispatch({ type: 'FETCH_POSTS', payload: response.data });
  };

// obtenemos info del usuario con el id
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
  
    dispatch({ type: 'FETCH_USER', payload: response.data });
  };






