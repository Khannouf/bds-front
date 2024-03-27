import { Box, Button, Skeleton, Typography } from "@mui/material";
import "@fontsource/poppins";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";

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

export const Title = () => {
  const [activities, setActivities] = useState([]);
  const loadingSkel = true;

  const handleScrollToEvent = () => {
    const eventSection = document.getElementById("event");
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/activitie", {
      method: "GET", // Utilisez la méthode GET pour ne pas inclure de corps
      headers: {
        // Ajoutez des en-têtes si nécessaire
        "Content-Type": "application/json", // Ajoutez des en-têtes selon les besoins
        // Autres en-têtes...
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // ou response.text() ou autre selon la réponse attendue
      })
      .then((data) => {
        // Faites quelque chose avec les données
        setActivities(data);
      })
      .catch((error) => {
        // Gérez les erreurs
        console.error("Erreur lors de la requête :", error);
      });
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          //background: 'linear-gradient(15deg, #934AFE 35%, #FF8E53 85%)',
        }}
      >
        <Box
          sx={{
            margin: "7rem",
            height: "16rem",
            maxWidth: "50rem",
            display: "flex",
          flexDirection: "column",
          alignItems: "center",
          }}
        >
          <Typography variant="h2" fontWeight={900} fontFamily="Poppins">
            Ynov Aix Bureau Des Sports
          </Typography>
          <Button variant="contained" onClick={handleScrollToEvent} sx={{ m: 8}} color="secondary">
            Voir les évènements
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#e0e0e0",
          // height: "100vh",
          //justifyContent: "flex-start",
          //alignItems: "center",
        }}
      >
        <Box
        id="event"
          sx={{
            margin: "3rem",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            "& > *": {
              m: 3,
            },
          }}
        >
          {loadingSkel ? (
            <>
              {activities.map((activitie: Activitie) => {
                console.log(activitie.id);
                return <EventCard key={activitie.id} activitie={activitie} />;
              })}
            </>
          ) : (
            <Skeleton variant="rectangular" width={345} height={392} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Title;
