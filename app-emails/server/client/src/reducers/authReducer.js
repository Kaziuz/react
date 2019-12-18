import { FETCH_USER } from '../actions/types'

// responsable de decidir si un usuario esta actualmente conectado o no
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; // retorna modelo del usuario y si esta vacio retorna false
        default:
            return state;
    }
}