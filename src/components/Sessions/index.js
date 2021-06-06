import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";

import Modal from "@material-ui/core/Modal";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import SessionCard from "./SessionCard";
import SessionDetail from "./SessionDetail";
import CreateSession from "./CreateSession";
import ImportSessions from "./ImportSessions";

import { SessionsContext } from "./SessionsProvider";
import { ClientsContext } from "../Clients/ClientsProvider";

const Sessions = (props) => {
  const [activeModal, setActiveModal] = useState("");
  const [modalSession, setModalSession] = useState({});
  const [manageMode, setManageMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [deleteWarning, setDeleteWarning] = useState(false);


  const { allClients } = useContext(ClientsContext);

  useEffect(() => {
    if (allClients) {
      setClientList(
        allClients
          .map((client) => {
            return {
              id: client.id,
              name: `${client.first_name} ${client.last_name}`,
            };
          })
          .sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            return -1;
          })
      );
    }
  }, [allClients]);

  useEffect(() => {
    if (props.openModal) {
      if (props.openModal === "manageSessions") {
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

  const handleSelect = (sessionId) => {
    const currentSelected = [...selected];
    if (currentSelected.includes(sessionId)) {
      setSelected(currentSelected.filter((i) => i !== sessionId));
    } else {
      setSelected([...currentSelected, sessionId]);
    }
  };

  const handleAddSession = (session) => {
    createSession(session).then((res) => {
      const client = clientList.find(
        (client) => client.id === session.clientId
      );
      const updatedSessionList = [
        ...sessions,
        {
          ...session,
          clientName: client.name,
        },
      ];
      setSessions(updatedSessionList);
    });
    setActiveModal("");
  };

  // const handleAddSession = (session) => {
  //   createSession(session)
  //     .then((res) => {
  //       setSessions(res)})
  //   setActiveModal("");
  // };

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

  const SessionModal = (props) => {
    const classes = useStyles();

    const modals = {
      sessionDetail: (
        <SessionDetail
          style={modalStyle}
          classes={classes.paper}
          sessionId={modalSession.id}
          clientList={clientList}
          handleClose={handleClose}
          handleDuplicateSession={() => setActiveModal("duplicateSession")}
        />
      ),
      addSession: (
        <CreateSession
          clientList={clientList}
          style={modalStyle}
          classes={classes.paper}
          handleClose={handleClose}
          handleAddSession={handleAddSession}
          date={dayjs(new Date()).format("MM/DD/YYYY")}
        />
      ),
      duplicateSession: (
        <CreateSession
          clientList={clientList}
          style={modalStyle}
          classes={classes.paper}
          handleClose={handleClose}
          handleAddSession={handleAddSession}
          {...modalSession}
          clientId={modalSession.clientId}
          date={dayjs(modalSession.date).add(7, "day").format("MM/DD/YYYY")}
        />
      ),
      importSessions: (
        <ImportSessions
          style={modalStyle}
          classes={classes.paper}
          // sessionId={modalSession.id}
          handleClose={handleClose}
        />
      ),
    };

    // return (
    //   <div>
    //     Insert Modal Here
    //   </div>
    // )

    return (
      <div>
        <Modal
          open={activeModal !== ""}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {activeModal ? modals[activeModal] : ""}
          {/* {activeModal ? <div>active</div> : ""} */}
        </Modal>
      </div>
    );
  };

  const [sessions, setSessions] = useState([]);

  const { getSessions, createSession, allSessions, removeSessions } =
    useContext(SessionsContext);

  // useEffect(() => {
  //   getSessions().then((res) => {
  //     setSessions(res);
  //   });
  // }, []);

  // const updateSessionsList = () => {
  //   getSessions()
  //     .then((res) => {setSessions(res)})
  // }

  // useEffect(() => {
  //   if (allSessions) {
  //     updateSessionsList()
  //   }
  // }, [allSessions])

  useEffect(() => {
    if (allSessions) {
      getSessions().then((res) => {
        setSessions(res);
      });
    }
  }, [allSessions]);

  return (
    <div className="Sessions">
      <h1>Sessions</h1>
      {manageMode ? (
        deleteWarning ? (
          <>
            <Alert severity="error">
              <strong>
                Are you sure you want to delete{" "}
                {selected.length === 1
                  ? "this session"
                  : `these ${selected.length} sessions`}
                ?
              </strong>{" "}
              <br />
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setDeleteWarning(false);
                  const updatedSessions = removeSessions(selected);
                  setSessions(updatedSessions)            
                  handleClose();
                  setSelected([]);
                }}
              >
                Yes, Delete {selected.length === 1 ? "session" : "sessions"}
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  setDeleteWarning(false);
                }}
              >
                No, Cancel
              </Button>
            </Alert>
          </>
        ) : (


        <>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              onClick={() => {
                setSelected(sessions.map((session) => session.id));
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
          {selected.length > 0 ? (
              <ButtonGroup color="" aria-label="outlined primary button group">
                <Button
                  onClick={() => {
                    setDeleteWarning(true);
                  }}
                >
                  Delete {selected.length === 1 ? "session" : "sessions"}
                </Button>
              </ButtonGroup>
            ) : (
              ""
            )}
          <br />
          {`${selected.length} sessions selected`}
        </>
        )
      ) : (
        ""
      )}

      <SessionModal />

      {sessions ?
        sessions
        .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
        .map((session, index, array) => (
          <SessionCard
            key={index}
            onClick={() => {
              if (manageMode) {
                handleSelect(session.id);
              } else {
                setModalSession(session);
                setActiveModal("sessionDetail");
              }
            }}
            date={session.date}
            displayDate={index === 0 || session.date !== array[index - 1].date}
            startTime={session.startTime}
            endTime={session.endTime}
            clientName={session.clientName}
            manageMode={manageMode}
            selected={selected.includes(session.id)}
          />
        ))
      : 'You have no sessions'}
    </div>
  );
};

export default Sessions;
