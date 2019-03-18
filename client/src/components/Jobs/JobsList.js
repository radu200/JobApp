import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = theme => ({

  icon: {
    marginRight: theme.spacing.unit * 2,
  },
 
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
 
});

 class Joblist extends Component {
  
    constructor(props){
        super(props) 
        this.state = {
            jobs:[]  
        }
    }
 
    componentDidMount(){
        const getJobs =  async () => {
             try {
               const response = await axios.get('/jobs');
                this.setState({jobs:response.data})
            //    console.log(response.data);
             } catch (error) {
               console.error(error);
             }
           }

        getJobs()
   }

    render() {
        const { classes} = this.props;
   
      return (
        <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
        //  <div> 
        //      <main> 
        //         <div className={classNames(classes.layout, classes.cardGrid)}>
        //         {/* End hero unit */}
        //         <Grid container spacing={40}>
        //             {this.state.jobs.map((card,index) => (
                    
        //             <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
        //                 <Card className={classes.card}>
        //                 <CardMedia
        //                     className={classes.cardMedia}
        //                     image={card.image}
        //                     title={card.category}
        //                 />
        //                 <CardContent className={classes.cardContent}>
        //                     <Typography gutterBottom variant="h5" component="h2">
        //                      {card.position}
        //                     </Typography>
        //                     <Typography>
        //                         {card.description}
        //                     </Typography>
        //                 </CardContent>
        //                 <CardActions>
        //                     <Button size="small" color="primary">
        //                     View
        //                     </Button>
        //                     <Button size="small" color="primary">
        //                     Edit
        //                     </Button>
        //                 </CardActions>
        //                 </Card>
        //             </Grid>
        //             ))}
        //         </Grid>
        //         </div>
        //     </main>

        //  </div>
     )
    }
  }

export default withStyles(styles)(Joblist)