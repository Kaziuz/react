import Tabletop from 'tabletop'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import withRoot from './withRoot'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'

import wpp from './wasapImg.png' // Tell Webpack this JS file uses this image

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  rootCard: {
    textAlign: 'center',
  },
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class App extends React.Component {
  state = {
    idCard:[],
    open: false,
    datos: [],
  }

  componentWillMount() {
    this.queryGoogleSheet()
  }

  queryGoogleSheet = () => {
    Tabletop.init({
      key: '175Ks3kL4pITd4F0gqFCYOnP-C_B8I845cLz9dl2lvBg',
      callback: dataDeGoogle => {
        this.setState({ datos: dataDeGoogle })
        this.setState({ idCard: dataDeGoogle.length })
      }, 
      simpleSheet: true
    })
  }

  /*
  getArrayImg = () => {
    const { datos } = this.state
    const miArr = []
    datos.map( rows => miArr[rows.id] = rows.imagen)
    return miArr 
  }
  */

  card = (data, id) => {
    console.log(data)
    const { classes } = this.props
    return(
      <Card 
        className={classes.card}
        style={{ boxShadow: '#c7c3c3 2px 12px 6px -1px' }}
        key={id}>
          <CardHeader
            avatar={
              <Avatar 
              aria-label="Recipe" 
              className={classes.avatar}>
                R
              </Avatar>
            }
            title={data.nombre}
          />
            <CardMedia
              className={classes.media}
              image={data.imagen}
              title={data.nombre}
              
            />
          <CardContent>
            <Typography 
              align="left"
              component="p">
                {data.descripcion1}
            </Typography>
          </CardContent>
          <CardContent style={{ display: 'flex',  justifyContent: 'space-around',alignItems: 'center' }}>
            <Typography
              align='left'
              component="p">
              $ <b>{data.precio}</b>
            </Typography>
            <Avatar 
              alt="Remy Sharp" src={wpp} 
              className={classes.avatar}></Avatar>
            <Typography
              align="right"
              component="p"
            >
              {data.telefono}
            </Typography>
          </CardContent>
      </Card>
    )
  }

  postRender = (data) => {
    const { classes } = this.props
    return( 
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="space-around">
              {data.map( (value, idx) => (
                <Grid item key={idx} style={{ margin: '10px 4px' }}>
                  { this.card(value, idx) }              
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }

  render() {
    const { classes } = this.props;
    const { datos} = this.state;
    return (
      <div className={classes.rootCard}>
        <AppBar position="static" style={{ marginBottom: 16, background: 'rgb(234, 234, 234)' }}>
          <Typography 
            variant="h3" 
            color="inherit"
            align="center"
            style={{ padding: 5 }}
          >
            Mateo web store
          </Typography>
        </AppBar>
        <Grid container spacing={24}>
          { this.postRender(datos) }
        </Grid>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(App))
