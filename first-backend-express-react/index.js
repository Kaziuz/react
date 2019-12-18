const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer') // save files in local server
const cloudinary = require('cloudinary') // api for save images
const passwordUser = '123456789'

const app = express();

// parseamos los parametros que venga en una request post
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// permitimos request de toda parte
// TODO: configurar listas blancas
// https://flaviocopes.com/express-cors/
app.use(cors())

// TODO: configurar protección de claves de entorno por porcess.env
cloudinary.config({
    cloud_name: "dsron8iuh",
    api_key: "your api key",
    api_secret: "your api secret key"
})

// definimos el esquema de la base de datos, en este caso de productos
const productSchema = {
    title: String,
    description: String,
    imageUrl: String,
    pricing: Number
}

// nos conectamos a la base de datos
// este tipo de conexión sol sirve cuando se tiene mongo corriendo en consola
mongoose.connect('mongodb://localhost/primera_pagina') // primera_pagina es el nombnre de la base de datos creada previamete

// configuración de multer 
// para el almacenamiento de imagenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads') // uploads es la carpeta donde se guiardan las imagenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname) // asignamos un nombre con el original de venga
    }
})

// le decimos a multer que solo vamos a guardar de a un archivo
const upload = multer({ storage }).single('file')

// modelo de un registro del producto
const ModelProduct = mongoose.model('Product', productSchema)

// ruta home
app.get("/", (req, res) => {
    res.end('hola')
})

// ruta para el logueo del admin de los productos
app.post("/login", (req, res) => {
    if (req.body.password === passwordUser) {
        res.send('Redirect to dashboard')
    } else {
        res.send('Invalid password')
    }
})

// ruta home
app.get("/products", (req, res) => {
    // devolvemos los productos que existan en la base de datos
    ModelProduct.find((err, documentdb) => {
        if (err) { console.log(err) }
        res.json({ data: documentdb })
    })
})

// ruta para servir los productos en la vista de edición
app.get("/products/admin", (req, res) => {
    // devolvemos los productos que existan en la base de datos
    ModelProduct.find((err, documentdb) => {
        if (err) { console.log(err) }
        res.json({ data: documentdb })
    })
})

// ruta para servir un producto en especifico
// se usa para llenar elformulario que actualizar producrto
app.get("/products/admin/:id", (req, res) => {
    const idProducto = req.params.id
    // hacemos una consulta a la base de datos
    // por un id especifico
    ModelProduct.findOne({'_id': idProducto}, (error, documento) => {
        console.log('respondo con', documento)
        console.log('error mando', error)
        res.json({ data: documento})
    })
})

// ruta para borrar un producto
app.delete("/products/admin/:id/delete", (req, res) => {
    const idProducto = req.params.id
    // borramos el producto de la base de datos
    ModelProduct.deleteOne({'_id': idProducto},err => {
        if (err) { console.log(err) }
        res.send('erase product ok')
    })    
})

// ruta para actualizar un producto en especifico
app.put('/products/admin/edit/:id', (req, res) => {
    const idProducto = req.params.id
    // verificamos la contraseña para poder crear un nuevo producto
    if (req.body.password === passwordUser) 
    {
        // creamos un nuevo producto con la data del request 
        // para actualizar
        const data = {
            title: req.body.title,
            description: req.body.description,
            pricing: req.body.pricing,
            imageUrl: req.body.imageUrl

        }
        /// ESTA LOGICA
        console.log('como llega imageRl .!.', data) // HERE !!!!

        // si estoy null o mi name es file
        if( req.body.hasOwnProperty('imageUrl')) {
            cloudinary.uploader.upload(req.body.imageUrl, 
                result => {
                    // guardamos la url que genera cloudinary en la base de datos
                    data.imageUrl = result.url
                    console.log('como llega la imagen en result caludainary .!.', data) 
                    
                    ModelProduct.updateOne(
                        { "_id": idProducto }, // filter
                        data )
                        .then(obj => console.log('obj actualizado', obj))
                        
                        
                    })
                } else {
                    // si el usuario no subio foto
                    // simplemente almacenamos en la base de datos
                    // ese nuevo objeto sin foto
                    // actualizamos el documento en especiufico
                    // pasandole al modelo de los datos actualizados
                    console.log('como llega la imagen en result caludainary sin null .!.', data) 

                    
                    ModelProduct.updateOne(
                        { "_id": idProducto }, // filter
                        data )
                        .then(obj => console.log('obj actualizado', obj))
                
                }
        res.send('product update ok')
    } else {
        res.send('password incorrect')
    }
})


// endpoint para el almacenamiento de la imagen
app.post('/uploadimg', (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        // multer envia al cliente una abstración dde esa imagen
        return res.status(200).send(req.file)
    })
})

// creamos una ruta para crear productos,
// es en esta ruta donde se envian los datos del formulario
app.post("/createnewproduct", (req, res) => {
    // verificamos la contraseña para poder crear un nuevo producto
    if (req.body.password === passwordUser) 
    {
        // creamos un nuevo producto con la data del request
        const data = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: 'data.png',
            pricing: req.body.pricing
        }

        // creamos un nuevo registro pasandole al modelo los datos
        const product = new ModelProduct(data);

        // si el susuario subio una foto
        // la guardamos en claudinary
        // la url que nos arroja claudinary
        // la guardamos en la base de datos
        if(req.body.imageUrl.hasOwnProperty('fieldname')) {
            cloudinary.uploader.upload(req.body.imageUrl.path, 
                result => {
                    // guardamos la url que genera cloudinary en la base de datos
                    product.imageUrl = result.url
                    // guardamos la info en la base de datos
                    product.save(err => {
                    console.log('almacenado en base de datos:', product)
                })
            })
        } else {
            // si el usuario no subio foto
            // simplemente almacenamos en la base de datos
            // ese nuevo objeto sin foto
            product.save(err => {
                console.log('almacenado en base de datos:', product)
            })
        }
        res.send('product save ok')
    } else {
        res.send('password incorrect')
    }
}) 

app.listen(8080);