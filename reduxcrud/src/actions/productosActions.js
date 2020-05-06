import { MOSTRAR_PRODUCTOS,
         MOSTRAR_PRODUCTO,
         ELIMINAR_PRODUCTO,
         AGREGAR_PRODUCTO,
         EDITAR_PRODUCTO} from './types';

import axios from 'axios';

// GET
// action de mostrar todos los productos
// esta action solo sirve todos los datos
export const mostrarProductos = () => async dispatch => {
    const respuesta = await axios.get('http://localhost:5000/productos');
    dispatch({
        type: MOSTRAR_PRODUCTOS,
        payload: respuesta.data
    })
}

// DELETE
// action para borrar un post
// esta action recibe como parametro un id del post a borrar
export const borrarProducto = id => async dispatch => {
    // json server requiere el id para poder borrar algun post
    await axios.delete(`http://localhost:5000/productos/${id}`);
    dispatch({
        type: ELIMINAR_PRODUCTO,
        // le pasamos el id al state para que lo elimine
        payload: id
    }) 
}

// POST
// action para agregar producto
// esta action recibe un post con todos los datos para agregarlos a la api
export const agregarProducto = post => async dispatch => {
    // hacemos post a la api con a info que queremos insertar
    const respuesta = await axios.post(`http://localhost:5000/productos`, post);
    dispatch({
        type: AGREGAR_PRODUCTO,
        payload: respuesta.data
    })
}

// GET
// action para mostrar un solo post
// esta action recibe como parametro un id del post a mostrar
export const mostrarProducto = id => async dispatch => {
    // hacemos post a la api con a info que queremos editar
    const respuesta = await axios.get(`http://localhost:5000/productos/${id}`);
    dispatch({
        type: MOSTRAR_PRODUCTO,
        payload: respuesta.data
    })
}

// PUT
// action para editar un post
// esta action recibe el objeto con todos los datos
export const editarProducto = producto => async dispatch => {
    const respuesta = await axios.put(`http://localhost:5000/productos/${producto.id}`, producto);
    dispatch({
        type: EDITAR_PRODUCTO,
        payload: respuesta.data
    })
}
 