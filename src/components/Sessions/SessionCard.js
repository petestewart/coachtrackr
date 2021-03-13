import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from 'dayjs'

import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "80vw",
    borderRadius: 0,
    fontWeight: 600,
  },
  title: {
    fontSize: 16,
  },
  date: {
    fontSize: 13,
    fontWeight: 500
  },
});

const SessionCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.onClick} disableRipple={props.manageMode}>
        <CardContent>
          <Grid container alignItems='center'>
            <Grid item xs={4}>
            <Typography className={classes.date} gutterBottom>
            {props.displayDate ? dayjs(props.date).format('dddd, MMMM D YYYY') : ''}
            </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.title} gutterBottom>
            {props.manageMode ? <Checkbox checked={props.selected} /> : ""}
                {`${dayjs(props.startTime, 'H:mm').format('h:mma')} - ${dayjs(props.endTime, 'H:mm').format('h:mma')}`}
              </Typography>
            </Grid>
            <Grid item xs={4}>
            <Typography className={classes.title} gutterBottom>
            {props.clientName}
            </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SessionCard;
