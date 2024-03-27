import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Login, loginSchema } from "../types/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export const Connexion = () => {
  const { setUser } = useUserContext()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    /*defaultValues: {
      email: "lkhannouf@gmail.com"
    }*/
    resolver: zodResolver(loginSchema)
  });
  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      //console.log("L'inscription a marché");
      const loginData = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
    .catch(error =>{ throw new Error(error)
    })
    if(loginData.type == "success"){
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user))
      setUser(loginData.user)
      navigate('/')
    }else{
      setError("root", { message: "L'email ou mot de passe incorrecte" });
    }
      
      //throw new Error();
    } catch (error) {
      setError("root", { message: "Cet email est déjà utilisé" });
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          background: 'linear-gradient(15deg, #934AFE 35%, #FE4ACD 85%)',
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
          <Typography
            variant="h2"
            fontWeight={900}
            fontFamily="Poppins"
            sx={{
              mb: 2,
            }}
          >
            Connexion
          </Typography>
          <Card sx={{ maxWidth: 500, borderRadius: "24px", boxShadow: 3 }}>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("email")}
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email"
                  //type="email"
                  fullWidth
                  variant="outlined"
                />
                {errors.email && (
                  <Box sx={{ color: "red" }}>{errors.email.message}</Box>
                )}
                <TextField
                  {...register("password")}
                  margin="dense"
                  id="password"
                  name="password"
                  label="Mot de passe"
                  type="password"
                  fullWidth
                  variant="outlined"
                />
                {errors.password && (
                  <Box sx={{ color: "red" }}>{errors.password.message}</Box>
                )}
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? "Chargement..." : "Connexion"}
                </Button>
                {errors.root && (
                  <Box sx={{ color: "red" }}>{errors.root.message}</Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};
