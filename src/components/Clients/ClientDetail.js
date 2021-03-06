import React from "react";
// import { makeStyles } from "@material-ui/core/styles";

// import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EventIcon from "@material-ui/icons/Event";
import NotesIcon from "@material-ui/icons/Notes";

import clsx from 'clsx';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  TextField,
  makeStyles,
  Typography
} from '@material-ui/core';

// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  header: {
    display: "flex",
    alignContent: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoArea: {
    display: "flex",
    alignItems: "center",
    margin: 15
  },
  icon: {
    // padding: theme.spacing(2),
    textAlign: 'center',
    border: 'none',
    dropShadow: 'none'
    // color: theme.palette.text.secondary,
  },
}));

const ClientDetail = ({ client, ...props }) => {
  const classes = useStyles();

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  // return (
  //   <form
  //     autoComplete="off"
  //     noValidate
  //     // className={clsx(classes.root, className)}
  //     // {...rest}
  //   >
  //     <Card>
  //       <CardHeader
  //         subheader="The information can be edited"
  //         title="Profile"
  //       />
  //       <Divider />
  //       <CardContent>
  //         <Grid
  //           container
  //           spacing={3}
  //         >
  //           <Grid
  //             item
  //             md={6}
  //             xs={12}
  //           >
  //             {/* <TextField
  //               fullWidth
  //               helperText="Please specify the first name"
  //               label="First name"
  //               name="firstName"
  //               onChange={handleChange}
  //               required
  //               value={values.firstName}
  //               variant="outlined"
  //             /> */}
  //             First Name
  //           </Grid>
  //           <Grid
  //             item
  //             md={6}
  //             xs={12}
  //           >
  //             {/* <TextField
  //               fullWidth
  //               label="Last name"
  //               name="lastName"
  //               onChange={handleChange}
  //               required
  //               value={values.lastName}
  //               variant="outlined"
  //             /> */}
  //             Last Name
  //           </Grid>
  //           <Grid
  //             item
  //             md={6}
  //             xs={12}
  //           >
  //             {/* <TextField
  //               fullWidth
  //               label="Email Address"
  //               name="email"
  //               onChange={handleChange}
  //               required
  //               value={values.email}
  //               variant="outlined"
  //             /> */}
  //             Emails
  //           </Grid>
  //           <Grid
  //             item
  //             md={6}
  //             xs={12}
  //           >
  //             {/* <TextField
  //               fullWidth
  //               label="Phone Number"
  //               name="phone"
  //               onChange={handleChange}
  //               type="number"
  //               value={values.phone}
  //               variant="outlined"
  //             /> */}
  //             Phone
  //           </Grid>
  //           <Grid
  //             item
  //             md={6}
  //             xs={12}
  //           >
  //             {/* <TextField
  //               fullWidth
  //               label="Country"
  //               name="country"
  //               onChange={handleChange}
  //               required
  //               value={values.country}
  //               variant="outlined"
  //             /> */}
  //             Unused sessions
  //           </Grid>
  //           <Grid
  //             item
  //             md={6}
  //             xs={12}
  //           >
  //             {/* <TextField
  //               fullWidth
  //               label="Country"
  //               name="country"
  //               onChange={handleChange}
  //               required
  //               value={values.country}
  //               variant="outlined"
  //             /> */}
  //             Upcoming sessions
  //           </Grid>
  //           <Grid
  //             item
  //             md={6}
  //             xs={12}
  //           >
  //             {/* <TextField
  //               fullWidth
  //               label="Country"
  //               name="country"
  //               onChange={handleChange}
  //               required
  //               value={values.country}
  //               variant="outlined"
  //             /> */}
  //             Notes
  //           </Grid>
  //         </Grid>
  //       </CardContent>
  //       <Divider />
  //       <Box
  //         display="flex"
  //         justifyContent="flex-end"
  //         p={2}
  //       >
  //         <Button
  //           color="primary"
  //           variant="contained"
  //         >
  //           Save details
  //         </Button>
  //       </Box>
  //     </Card>
  //   </form>
  // );


  // eslint-disable-next-line no-unreachable
  return (
    <div style={props.style} className={props.classes}>
      <div className={classes.root}>
        <div className={classes.header}>
          <Avatar>HH</Avatar>
          <h2 id="simple-modal-title">
            {client.first_name} {client.last_name}
          </h2>
          <div className="buttonsGroup">
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="menu">
              <MoreVertIcon />
            </IconButton>
            <IconButton aria-label="cancel" onClick={props.handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <Grid container spacing={2}>

      {/* <div className={classes.infoArea}> */}
        <Grid item xs={1}></Grid>
        
        <Grid item xs={"auto"} >
          {/* <Paper className={classes.icon}> */}
          <PhoneIcon /> 
          {/* </Paper> */}
        </Grid>
        <Grid item xs={10}>
          {client.phone}
        </Grid>
        <Grid item xs={1}></Grid>
        
        <Grid item xs={"auto"} >
          {/* <Paper className={classes.icon}> */}
          <EmailIcon /> 
          {/* </Paper> */}
        </Grid>
        <Grid item xs={10}>
          {client.email}
        </Grid>
        <Grid item xs={1}></Grid>
        
        <Grid item xs={"auto"} >
          {/* <Paper className={classes.icon}> */}
          <AttachMoneyIcon /> 
          {/* </Paper> */}
        </Grid>
        <Grid item xs={10}>
        5 unused paid sessions
        </Grid>
        <Grid item xs={1}></Grid>
        
        <Grid item xs={"auto"} >
          {/* <Paper className={classes.icon}> */}
          <EventIcon /> 
          {/* </Paper> */}
        </Grid>
        <Grid item xs={10}>
        {client.upcomingSessions ? client.upcomingSessions.length : 'No'} upcoming sessions
        {client.upcomingSessions 
        
        ? <Typography variant={"subtitle2"}>
        
        {client.upcomingSessions.map((session) =>{ 
          return `${session.date}, `})}
        </Typography>
        : 'No'} 

        </Grid>
        <Grid item xs={1}></Grid>
        
        <Grid item xs={"auto"} >
          {/* <Paper className={classes.icon}> */}
          <NotesIcon /> 
          {/* </Paper> */}
        </Grid>
        <Grid item xs={10}>
          {client.notes}
        </Grid>
      </Grid>
    </div>
  );
};

export default ClientDetail;
