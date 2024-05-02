import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";

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



export const UpdateEvent = () => {
  const [activities, setActivities] = useState([]);
  const loadingSkel = true;

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
    <Box
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
  );
};
export default UpdateEvent;

