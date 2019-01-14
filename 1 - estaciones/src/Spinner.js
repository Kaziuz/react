import React from 'react';

const Spinner = props => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">{props.message}</div>
    </div>
  );
};

// props predeterminadas para el componente por si no se le pasan desde su uso
Spinner.defaultProps = {
  message: 'Cargando...'
};

export default Spinner;