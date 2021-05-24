import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
/**
 * COMPONENT
 */
export const ThankYou = () => {
  return (
        <div className="center shape">
            <Grid>
            Thank you for using our 4 Course Event app!!!
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