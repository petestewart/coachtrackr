import React, { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import ClientCard from "./ClientCard";
import ClientDetail from "./ClientDetail";
import CreateClient from "./CreateClient";
import ImportClients from "./ImportClients";

import { ClientsContext } from "./ClientsProvider";

const Clients = (props) => {
  const [activeModal, setActiveModal] = useState("");
  const [modalClient, setModalClient] = useState({});
  const [manageMode, setManageMode] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (props.openModal) {
      if (props.openModal === "manageClients") {
        setManageMode(true);
      } else {
        setManageMode(false);
        setActiveModal(props.openModal);
      }
    } else {
      setActiveModal("");
      setManageMode(false);
    }
  }, [props.openModal]);

  // const handleOpen = () => {
  //   setOpenModal(true);
  // };

  const handleClose = () => {
    setActiveModal("");
    props.handleCloseModal();
  };

  const handleSelect = (clientId) => {
    const currentSelected = [...selected];
    if (currentSelected.includes(clientId)) {
      setSelected(currentSelected.filter((i) => i !== clientId));
    } else {
      setSelected([...currentSelected, clientId]);
    }
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
      maxWidth: 1000,
      width: "70%",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const ClientModal = (props) => {
    const classes = useStyles();

    const modals = {
      clientDetail: (
        <ClientDetail
          style={modalStyle}
          classes={classes.paper}
          clientId={modalClient.id}
          handleClose={handleClose}
        />
      ),
      addClient: (
        <CreateClient
          style={modalStyle}
          classes={classes.paper}
          clientId={modalClient.id}
          handleClose={handleClose}
        />
      ),
      importClients: (
        <ImportClients
          style={modalStyle}
          classes={classes.paper}
          clientId={modalClient.id}
          handleClose={handleClose}
        />
      ),
    };

    return (
      <div>
        <Modal
          open={activeModal !== ""}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {activeModal ? modals[activeModal] : ""}

          {/* {body} */}
        </Modal>
      </div>
    );
  };

  const [clients, setClients] = useState([]);

  const { getClients } = useContext(ClientsContext);

  useEffect(() => {
    getClients().then((res) => {
      setClients(res);
    });
  }, []);

  return (
    <div className="Clients">
      <h1>Clients</h1>
      {manageMode ? (
        <>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => {
                setSelected(clients.map((client) => client.id));
              }}
            >
              Select All
            </Button>
            <Button
              onClick={() => {
                setSelected([]);
              }}
            >
              Select None
            </Button>
            <Button
              onClick={() => {
                setSelected([]);
                handleClose();
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
          <br />
          {`${selected.length} clients selected`}
        </>
      ) : (
        ""
      )}
      <ClientModal firstName={"Pete"} />
      {clients.map((client, index) => (
        <ClientCard
          key={index}
          onClick={() => {
            if (manageMode) {
              handleSelect(client.id);
            } else {
              setModalClient(client);
              setActiveModal("clientDetail");
            }
          }}
          firstName={client.first_name}
          lastName={client.last_name}
          futureSessions={
            client.upcomingSessions && client.upcomingSessions.length
          }
          pastSessions={client.pastSessions}
          manageMode={manageMode}
          selected={selected.includes(client.id)}
        />
      ))}

      <ClientCard />
    </div>
  );
};

export default Clients;
