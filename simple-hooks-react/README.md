Este proyecto muestra el uso de react hooks.
Básicamente los hooks son darle los poderes de los class components a los functionals components.
Tenemos:
useState -> permite a los functional components usar state
useEffect -> permite a los functional components usar ciclo de vida
useContetxt -> permite a los functional components usar context
useRef -> permite a los functional componets usar refs
useReducer -> pewrmite a los functional components usar redux

Los hook por ser tan nuevos no estan muy implementados con create-react-app por 
lo tanto despues de instalar con create react app se debe de instalar 
este paquete para poder usar los hooks:
npm install --save react@next react-dom@next