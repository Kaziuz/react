import { MOSTRAR_PRODUCTOS,
         ELIMINAR_PRODUCTO,
         AGREGAR_PRODUCTO,
         EDITAR_PRODUCTO, 
         MOSTRAR_PRODUCTO} from '../actions/types';

// cada reducer tiene su propio state
const initialState = {
    productos:[]
}


export default function(state = initialState, action){
    switch(action.type){
        // GET
        // tomamos la respuesta del servidor y la metemos en el state
        case MOSTRAR_PRODUCTOS:
            return {
                ...state,
                productos:action.payload
            }
        // DELETE
        // tomamos el id del post y lo borramos del state
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                // buscamos ese id en el state y lo borramos
                // devolveme todos menos ese que borraste
                productos: state.productos.filter(producto => producto.id !== action.payload)
            }
        // POST
        // agregamos un producto a la base de datos
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                // el action.payload viene con la informacion del post
                productos: [...state.productos, action.payload]
            }
        // GET
        // mostramos solo un producto del state
        case MOSTRAR_PRODUCTO:
            return{
                ...state,
                // en singular para que no reescriba todo el state
                producto: action.payload
            }
        // PUT
        // editamos o actualizamos la informacion del post mostrado
        case EDITAR_PRODUCTO:
            return{
                ...state,
                // recorremos todo el state
                productos:state.productos.map(
                    // le pasamos al state el objeto con el id a editar 
                    // si los id de ambos coinciden
                    producto => producto.id === action.payload.id 
                        // Si hay cambios actualizamos sino se queda el post como esta
                        ? (producto = action.payload)
                        : producto
                )
            }
        default:
            return state;
    }
}