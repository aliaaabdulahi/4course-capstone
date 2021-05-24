import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";



/**
 * COMPONENT
 */
export const ThankYou = () => {
  return (
        <div  >
            <Grid className="center shape" style={{marginTop: 50}}>
            <Typography style={{marginTop: 20}}>Thank you for using our 4 Course Event app!!!</Typography>
            <Grid>
            <Link to="/">
            <Button style={{marginTop: 20}} size="large"  variant="outlined" color="primary">
                Back to Homepage
            </Button>
            </Link>
            <Link to="/upcomingevents">
            <Button style={{marginTop: 20, marginLeft: 10}} size="large"  margin="" variant="outlined" color="primary">
                Check your Event
            </Button>
            </Link>
            </Grid>
                </Grid>

        </div>
  );
};

export default ThankYou