import {useState, useEffect} from 'react';

export default () => {
    const [lat, setLat] = useState(null);
    const [errorMessage, setErrorMesage] = useState('')
  
    useEffect( () => {
      window.navigator.geolocation.getCurrentPosition(
        position => setLat(position.coords.latitude),
        err => setErrorMesage(err.message)
      )
    }, [])

    return [ lat, errorMessage ];
} 