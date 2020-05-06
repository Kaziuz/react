import React, {Component} from 'react';

// redux 
import { connect } from 'react-redux';
import { mostrarProducto, editarProducto } from '../actions/productosActions';

class EditarProducto extends Component {

    // manejamos un state local en este componente 
    // para llenar los campos con la data que responde la api
    state = {
        nombre: '',
        precio: '',
        error: false
    }

    // cargo la data en el componente para poderla editar
    componentDidMount(){
        // asi accedemos al id actual del post a editar
        //console.log(this.props.match.params);
        const { id } = this.props.match.params;
        this.props.mostrarProducto(id);
    }

    // cuando se pasen los props en este componente se ejecuta esta función
    componentWillReceiveProps(nextProps, nextState){
        // estos son los props que llegan al componente
        // console.log(nextProps);

        const {nombre, precio } = nextProps.producto;
        // llenamos el state porque esta vacio
        this.setState({
            nombre, 
            precio
        });
    }

    // leemos el campo y lo guardamos en el state
    nombreProducto = e => {
        this.setState({ nombre: e.target.value })
    }

    // leemos el campo y lo guardamos en el state
    precioProducto = e => {
        this.setState({ precio: e.target.value })
    }

    actualizarProducto = e => {
        // para que no recargue la página
        e.preventDefault();

        // leemos los valores almacenamos en el state
        const {nombre, precio} = this.state;

        // validamos los campos
        if(nombre === '' || precio === ''){
            this.setState({ error: true });
            return;
        } 
        this.setState({ error:false });

        const { id } = this.props.match.params;

        // creamos el objeto
        let productoEditado = {
            id,
            nombre,
            precio
        }
        // actualizamos el producto actual
        this.props.editarProducto(productoEditado);

        // redireccionamos al home
        this.props.history.push('/');
    }


    render(){
        const {nombre, precio, error} = this.state;
        return(
            <div className="row justify-content-center mt-5">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center">Agregar Nuevo Producto</h2>
                            <form onSubmit={this.actualizarProducto}>
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input defaultValue={nombre} onChange={this.nombreProducto} type="text" className="form-control" placeholder="Titulo" />
                                </div>
                                <div className="form-group">
                                    <label>Precio del Producto</label>
                                    <input defaultValue={precio} onChange={this.precioProducto} type="text" className="form-control" placeholder="Precio" />
                                </div>
                                <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                            </form>
                            {/* En caso de que el state este en true (campos del formulario vacios, le hacemos buying al usuario) */}
                            {
                                error && 
                                <div className="font-weight-bold alert alert-danger text-center mt-4"> ¿Qué producto voy a crear si tengo algún campo vacio?</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// state
const mapStateToProps = state => ({
    producto: state.productos.producto
})

export default connect(mapStateToProps, { mostrarProducto, editarProducto })(EditarProducto);