import React, { useContext, useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SortRoundedIcon from "@material-ui/icons/Sort";
import FilterListRoundedIcon from "@material-ui/icons/FilterList";

import SearchIcon from "@material-ui/icons/Search";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import InputBase from "@material-ui/core/InputBase";

import ClientCard from "./ClientCard";
import ClientDetail from "./ClientDetail";
import CreateClient from "./CreateClient";
import ImportClients from "./ImportClients";

import { ClientsContext } from "./ClientsProvider";

const Clients = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("AtoZ");
  const [activeModal, setActiveModal] = useState("");
  const [modalClient, setModalClient] = useState({});
  const [manageMode, setManageMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [clients, setClients] = useState([]);

  const { getClients, createClient, allClients } = useContext(ClientsContext);

  useEffect(() => {
    if (allClients) {
      setClients(allClients);
    }
  }, [allClients]);

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

  const handleSearch = (e) => {
    setSearchValue((prevState) => e.target.value);
  };

  // const createNewClient = (newClient) => {
  //   createClient(newClient);
  // };

  const createNewClient = (newClient) => {
    createClient(newClient);
    setActiveModal("");
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
          handleCreateClient={createNewClient}
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

  return (
    <div className="Clients">
      <h1>Clients</h1>
      <div className="info-bar">
        <Grid container alignItems="center">
          <Grid item xs={5} alignItems="center">
            <Typography>
              {searchValue
                ? `showing ${
                    clients.filter((client) => {
                      if (
                        `${client.first_name} ${client.last_name}`
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      )
                        return true;
                      else {
                        return false;
                      }
                    }).length
                  }
                  of ${clients.length} clients`
                : `${clients.length} clients`}
            </Typography>
          </Grid>
          <Grid item xs={4} alignItems="center">
            <Typography>
              <SortRoundedIcon />
              Sort A to Z
            </Typography>
          </Grid>
          <Grid item xs={3} justifyContent="center">
            <Typography alignItems="center">
              <FilterListRoundedIcon />
              Filter
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div className="search-bar">
        <SearchIcon />
        <InputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
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
      <ClientModal />
      {clients
        .sort((a, b) => (a.first_name > b.first_name ? 1 : -1))
        .map((client, index) =>
          searchValue &&
          !`${client.first_name} ${client.last_name}`
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ? (
            ""
          ) : (
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
          )
        )}
    </div>
  );
};

export default Clients;
