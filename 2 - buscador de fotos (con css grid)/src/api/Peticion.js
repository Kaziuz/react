// en este archivo voy a crear clientes personalizados y peticiones
// para hacer un poco de limpieza en el componente app

import axios from 'axios';

export default axios.create({
    baseURL : 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID bd463559dd8fbaff5b483f7bf3d05243ede0b1e5ee6ae36f2d775799b34c9eb2' 
    }
});