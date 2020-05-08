import { connect } from 'react-redux'
import App from '../components/App'
import { fetchStarWarsRequest, confirmFetchRequest, fetchStarWarsPlanetsRequest } from '../actions'

const mapStateToProps = ({starWars}) => ({starWars})

const bindActionsToDispatch = dispatch => (
    {
        fetchStarWarsRequest: () => dispatch(fetchStarWarsRequest()),
        confirmFetchRequest: () => dispatch(confirmFetchRequest()),
        fetchStarWarsPlanetsRequest: () => dispatch(fetchStarWarsPlanetsRequest())
    }
)

const AppContainer = connect(mapStateToProps, bindActionsToDispatch)(App)

export default AppContainer
