import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'
import useLocation from './useLocation';

const App = () => {

  const [ lat,errorMessage ] = useLocation(); // destucturing de matrices para acceder a los datos

  let content;
  if (errorMessage && !lat){
    content =  <div>Error: {errorMessage}</div>
  } else if (!errorMessage && lat){
    content = <SeasonDisplay lat={lat} />
  } else {
    content = <Spinner message="Please accept location request" />
  }

  return<div className="border red">{content}</div> 
}


ReactDOM.render(<App />, document.querySelector('#root'));

