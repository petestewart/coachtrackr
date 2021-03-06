import React, { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import ClientCard from "./ClientCard";
import ClientDetail from "./ClientDetail";

import { ClientsContext } from "./ClientsProvider";

const Clients = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalClient, setModalClient] = useState({});

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      minWidth: 500,
      width: "70%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const ClientModal = (props) => {
    const classes = useStyles();
    // const [open, setOpen] = useState(false);

    // const handleOpen = () => {
    //   setOpen(true);
    // };

    // const handleClose = () => {
    //   setOpen(false);
    // };

    // const body = (
    //   <div style={modalStyle} className={classes.paper}>
    //     <h2 id="simple-modal-title">{modalClient.first_name} {modalClient.last_name}</h2>
    //     <p id="simple-modal-description">
    //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //     </p>
    //   </div>
    // );

    return (
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <ClientDetail
            style={modalStyle}
            classes={classes.paper}
            client={modalClient}
            handleClose={handleClose}
          />
          {/* {body} */}
        </Modal>
      </div>
    );
  };

  const [clients, setClients] = useState([]);

  // const [open, setOpen] = React.useState(false);

  const { getClients } = useContext(ClientsContext);

  useEffect(() => {
    getClients().then((res) => {
      setClients(res);
    });
  });

  // const showModal = (clientId) => {
  //   setOpen(true);
  // };

  return (
    <div className="Clients">
      <h1>Clients</h1>
      <ClientModal firstName={"Pete"} />
      {clients.map((client, index) => (
        <ClientCard
          key={index}
          onClick={() => {
            setModalClient(client);
            handleOpen();
          }}
          firstName={client.first_name}
          lastName={client.last_name}
          futureSessions={
            client.upcomingSessions && client.upcomingSessions.length
          }
          pastSessions={client.pastSessions}
          // open={open}
        />
      ))}

      <ClientCard />
    </div>
  );
};

export default Clients;
