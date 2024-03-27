import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Timer from "./timer";
import moment from "moment";
import { useUserContext } from "../context/userContext";
import ParticipantsTable from "./TableParticipant";

interface Activitie {
  id: number;
  name: string;
  description: string;
  addresse: string;
  prix: string;
  dateDeb: string;
  dateFin: string;
  CreatedAt: string;
  updatedAt: string;
  creatorId: number;
  ImageActivitie: ImageActivitie[];
  creator: Creator;
}

interface ImageActivitie {
  id: number;
  filename: string;
  activitieId: number;
}

interface Creator {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  classe: string;
  filiere: string;
  roles: string;
}

interface EventCardProps {
  activitie: Activitie;
}

export default function EventCard(props: EventCardProps) {
  const { user, setUser } = useUserContext();
  //a passer en context
  const [token, setToken] = useState("");
  const [participants, setParticipants] = useState([])

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAllParticipant, setOpenAllParticipant] = useState(false);
  const [showAlert, setShowAlert] = useState("");


  const [alreadyRegisterVar, setAlreadyRegisterVar] = useState(false);
  const [passif, setPassif] = useState(false);
  const dateDebut = moment
    .utc(props.activitie.dateDeb)
    .format("DD/MM/YYYY HH:mm");
  const dateFin = moment
    .utc(props.activitie.dateFin)
    .format("DD/MM/YYYY HH:mm");

  const getActif = () => {
    const deadline = new Date(props.activitie.dateDeb);
    const dateNow = new Date();

    const difference = deadline.getTime() - dateNow.getTime();
    if (difference < 0) {
      setPassif(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickOpenAllParticipant = () => {
    setOpenAllParticipant(true);
    allParticipant()
  };

  const handleClickCloseAllParticipant = () => {
    setOpenAllParticipant(false);
  };

  const allParticipant = useCallback(async() => {
    const allParticipantData = await fetch(
      `http://localhost:3000/activitie/participants/${props.activitie.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
    if (allParticipantData.type == "success") {
      setParticipants(allParticipantData.data)
    }
  }, [participants, props.activitie.id, token]);

  const alreadyRegister = useCallback(async () => {
    const alreadyRegisterVerif = await fetch(
      "http://localhost:3000/activitie/register/already",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: props.activitie.id }),
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
    if (alreadyRegisterVerif.type == "success") {
      console.log(alreadyRegisterVerif);

      setAlreadyRegisterVar(true);
    }
  }, [token, props.activitie.id]);

  const eventRegister = async () => {
    const eventRegisterData = await fetch(
      "http://localhost:3000/activitie/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: props.activitie.id }),
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
    if (eventRegisterData.type == "success") {
      setShowAlert("success");
      setOpenAlert(true);
    } else {
      //setError("root", { message: "L'email ou mot de passe incorrecte" });
      setShowAlert("fail");
      setOpenAlert(true);
    }
    setTimeout(() => {
      setShowAlert("");
    }, 2000);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      alreadyRegister();
      getActif();
    } else {
      setPassif(true);
    }
  }, [token, alreadyRegister]);

  return (
    <>
      <Card sx={{ maxWidth: 345, borderRadius: "24px", boxShadow: 3 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={props.activitie.ImageActivitie[0]?.filename}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.activitie.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={
              {
                // overflow: "hidden",
                // textOverflow: "ellipsis"
              }
            }
          >
            {props.activitie.description}
          </Typography>
          <Timer dateDeb={props.activitie.dateDeb} />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            sx={{ m: "1" }}
            onClick={handleClickOpen}
            disabled={passif}
          >
            Je m'inscris
          </Button>
          {user?.role == "admin" ? (
            <Button
            size="medium"
            variant="contained"
            color="secondary"
            sx={{ m: "1" }}
            onClick={handleClickOpenAllParticipant}
          >
            Voir les participants
          </Button>
          ) : (
            <>
            </>
          )}
        </CardActions>
      </Card>

      {/* Boite de dialog de participants disponible seuleemnt par l'admin  */}
      <Dialog open={openAllParticipant} onClose={handleClickCloseAllParticipant} maxWidth="xl">
        <DialogTitle>{props.activitie.name}</DialogTitle>
        <DialogContent>
        {/* {participants.map((participant: Participant) => {
                console.log(participant.user.email);
                
                return <div>{participant.user.email}</div>;
              })} */}
              <ParticipantsTable id={props.activitie.id}/>
        </DialogContent>
      </Dialog>

      {/* Boite de dialog d'inscription */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.activitie.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1" color="text.primary" sx={{ m: 2 }}>
              {props.activitie.description}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ m: 2 }}>
              Lieu : <strong>{props.activitie.addresse}</strong>
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ m: 2 }}>
              Prix : <strong>{props.activitie.prix} €</strong>
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ m: 2 }}>
              Début : <strong>{dateDebut}</strong>
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ m: 2 }}>
              Fin : <strong>{dateFin}</strong>
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          {alreadyRegisterVar ? (
            <Button type="submit" onClick={eventRegister} disabled={true}>
              Inscription
            </Button>
          ) : (
            <Button type="submit" onClick={eventRegister} disabled={false}>
              Inscription
            </Button>
          )}
        </DialogActions>
        {showAlert === "success" && (
          // <Alert severity="success">Vous êtes bien inscrit a l'évènement</Alert>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={openAlert}
            autoHideDuration={6000} // durée d'affichage automatique en millisecondes (6 secondes dans cet exemple)
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="success"
              sx={{ width: "100%" }}
            >
              L'inscription a l'évènement est validé
            </Alert>
          </Snackbar>
        )}
        {showAlert === "fail" && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={openAlert}
            autoHideDuration={6000} // durée d'affichage automatique en millisecondes (6 secondes dans cet exemple)
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity="error"
              sx={{ width: "100%" }}
            >
              Une erreur s'est produite
            </Alert>
          </Snackbar>
        )}
      </Dialog>
    </>
  );
}
