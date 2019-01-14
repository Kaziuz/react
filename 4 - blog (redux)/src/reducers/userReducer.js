// posts reducer

export default (state=[], action) => {
    switch (action.type){
        case 'FETCH_USER':
            return [...state, action.payload]; // añado al state un array de objetos con info de cada usuario
        default:
            return state;
    }
};