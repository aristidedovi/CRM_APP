import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Badge } from 'primereact/badge';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';




function ProductsHead(props) {

      //console.log('All product =>', props.products);
      const useStyles = makeStyles(theme => ({
        colorProductForunisseur: {
          background: 'linear-gradient(45deg, #0ba360 30%, #3cba92 90%)',
          border: 0,
          borderRadius: 3,
          /*boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',*/
          boxShadow: '0 3px 5px 2px rgb(128,128,128)',
          color: 'white',
          margin: '0px',
          height: 'max-content',
          padding: '10px'
        },
        colorProductSiteWeb: {
          background: 'linear-gradient(45deg, #4facfe 30%, #00f2fe 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgb(128,128,128)',
          color: 'white',
          margin: '0px',
          height: 'max-content',
          padding: '10px'
        },
        colorOutStock: {
          background: 'linear-gradient(45deg, #ff0844 30%, #ffb199 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgb(128,128,128)',
          color: 'white',
          margin: '0px',
          height: 'max-content',
          padding: '10px'
        },
        colorText: {
          color: 'white',
          fontWeight: 'bold',
          fontSize: '2rem'
        }
      })
      )
      const classes = useStyles();

      function methodDoesNotExist() {

      }

    return (
        <>
         <Box sx={{ flexGrow: 1, marginBottom:'20px' }}>
          <Grid container direction="row" spacing={0} justifyContent='space-between'>
              <Grid item xs={3} md={3} sm={3} lg={3}  border='2px'className={classes.colorProductForunisseur}>
                <Typography variant="subtitle1" component="div" style={{fontWeight: 'bold',fontSize: "0.9rem"}}>
                  Total des produits fournisseurs
                </Typography>
                <Typography variant="h4" sx={{ }} className={classes.colorText} >
                  {props.allProducts.length}
                </Typography>
              </Grid>
              <Grid item xs={3} md={3} sm={3} lg={3} border='2px'className={classes.colorProductSiteWeb}>
                <Typography variant="subtitle1" component="div" style={{fontWeight: 'bold', fontSize: "0.9rem"}}>
                  Total des produits sur le site web
                </Typography> 
                <Typography variant="h4" sx={{ }} className={classes.colorText}>
                  {props.siteWebProduct.length}
                </Typography>
              </Grid>
              <Grid item xs={3} md={3} sm={3}  lg={3}  border='2px'className={classes.colorOutStock}>
                <Typography variant="subtitle1" component="div" style={{fontWeight: 'bold', fontSize: "0.9rem"}}>
                  Total des produits en rupture
                </Typography>
                <Typography variant="h4" className={classes.colorText}>
                  {props.ruptureProduct}
                </Typography>
              </Grid>
          </Grid>
         </Box>
      </>
    );
}

export default ProductsHead