import { call, put, take, race, all, select,
    throttle, fork, spawn, cancel } from 'redux-saga/effects'
import * as TYPES from '../types'

export const api = (url) => fetch(url).then(response => response.json())

// action redux
export const fetchStarWarsRequest = () => ({
    type: TYPES.FETCH_STAR_WARS_REQUEST
})

export const confirmFetchRequest = () => ({
    type: TYPES.CONFIRMATION
})

export const cancelRequest = () => ({
    type: TYPES.CANCELLED
})

// saga for action redux
// implementacion de efectos asincronos no bloqueantes
export function * fetchPerson(action) {
    try {
        // fork 
        // const dogs   = yield spawn(api, 'https://dog.ceo/api/breeds/list/all')
        const person = yield call(api, 'https://swapi.co/api/people/')
        yield put({ type: TYPES.FETCH_STAR_WARS_SUCCESS, data: person.results })
        const selector = yield select(state => state.starWars)
        console.log('selector', selector)
    }
    catch (e) {
        console.log(e)
    }
}

// saga for action redux
// implementacion de efectos asincronos bloqueantes
/*
export function * fetchPerson(action) {
   try {
    console.log('entered')
    yield take(TYPES.CONFIRMATION)
    console.log('pase la confirmation')

    const person = yield call(api, 'https://swapi.co/api/people/')

    yield put({ type: TYPES.FETCH_STAR_WARS_SUCCESS, data: person.results })
   } catch (e) {
       console.log(e)
   }
}
*/







// ----------------

/* NOTES !!!!
call -> permite llamar una función, es un efecto bloqueante

put -> envía una acción a la tienda, es de no bloqueó
y cualquier error que se lance hacia abajo no volvera a aparecer en la saga

take -> Espera un action específico en el store, 
el generador se suspende hasta que se despacha una action que coincide con el patrón

// race -> Permite combinar varios efectos sagas
const { normal, custom } = yield race({ // cambiar race por all
    // call -> permite llamar una función con argumentos
    // nombre de la función, argumentos
    normal: call(api, 'https://swapi.co/api/people/'), // efecto bloqueante
    custom: call(api, 'https://swapi.co/api/people/justForTyler')
})

select -> permite invocar selectores de ese state en especifico

throttle -> Genera una saga sobre una action enviada al store que 
coincide con el patrón. Después de generar una tarea, 
sigue aceptando actions entrantes en el búfer subyacente, 
manteniendo a lo sumo 1 (la más reciente), pero al mismo 
tiempo soportando la nueva tarea de generación para ms 
milisegundos 

example -> 

function * handleInput(input) {
    // ...
}

function * watchInput () {
    yield throttle(500, 'INPUT_CHANGED', handleInput)
}

fork -> hacer una llamada no bloqueante, call like
*/