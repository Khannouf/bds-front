import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  TextField,
} from "@mui/material";
import { User, activity, activitySchema } from "../types/form";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useUserContext } from "../context/userContext";

export const CreateEventForm = () => {
  const {user, setUser} = useUserContext()
  const [showAlert, setShowAlert] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [dateDeb, setDateDeb] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [image, setSelectedFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<activity>({
    /*defaultValues: {
      email: "lkhannouf@gmail.com"
    }*/
    resolver: zodResolver(activitySchema),
  });
  const onSubmit: SubmitHandler<activity> = async (values) => {
    if (!dateDeb || !dateFin || !image) return;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("addresse", values.addresse);
    formData.append("prix", values.prix);
    formData.append("dateDeb", new Date(dateDeb).toISOString());
    formData.append("dateFin", new Date(dateFin).toISOString());
    formData.append("image", image);
    // const data = {
    //   ...values,
    //   dateDeb: new Date(dateDeb).toISOString(),
    //   dateFin: new Date(dateFin).toISOString(),
    //   image: image
    // };
      const fetchData = await fetch("http://localhost:3000/activitie", {
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error);
        });

      if (fetchData.type == "success") {
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
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          //background: "linear-gradient(15deg, #934AFE 35%, #FE4ACD 85%)",
          //bgcolor: "#e0e0e0",
        }}
      >
        <Box
          sx={{
            margin: "2rem",
            height: "16rem",
            maxWidth: "50rem",
          }}
        >
          <Card sx={{ maxWidth: 500, borderRadius: "24px", boxShadow: 20 }}>
            <CardContent>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit, console.log)}
              >
                <TextField
                  {...register("name", { required: true })}
                  margin="dense"
                  id="name"
                  name="name"
                  label="Nom"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  {...register("description", { required: true })}
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  {...register("addresse")}
                  margin="dense"
                  id="addresse"
                  name="addresse"
                  label="Addresse"
                  //type="email"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  {...register("prix")}
                  margin="dense"
                  id="prix"
                  name="prix"
                  label="Prix"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
                <DateTimePicker
                  label="Date de Début"
                  ampm={false}
                  format="DD/MM/YYYY HH:mm"
                  value={dateDeb}
                  onChange={(value: Date | null) => setDateDeb(value)}
                  sx={{
                    width: "100%",
                    mt: 1,
                    mb: 1,
                  }}
                />
                <DateTimePicker
                  label="Date de fin"
                  ampm={false}
                  format="DD/MM/YYYY HH:mm"
                  onChange={(value: Date | null) => setDateFin(value)}
                  sx={{
                    width: "100%",
                    mt: 1,
                    mb: 1,
                  }}
                />
                <div>
                  <InputLabel htmlFor="image">Upload File</InputLabel>
                  <Input
                    id="image"
                    type="file"
                    inputProps={{
                      accept: 'image/*',  // Limite aux fichiers image
                    }}
                    onChange={handleFileChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>
                          <CloudUploadIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? "Chargement..." : "Inscription"}
                </Button>
                {errors.root && (
                  <Box sx={{ color: "red" }}>{errors.root.message}</Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
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
              L'évènement a bien été crée
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
    </>
  );
};
