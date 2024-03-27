import {
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { User, userSchema } from "../types/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const classeEnum = [
  {
    value: "bachelor 1",
    label: "B1",
  },
  {
    value: "bachelor 2",
    label: "B2",
  },
  {
    value: "bachelor 3",
    label: "B3",
  },
  {
    value: "Master 1",
    label: "M1",
  },
  {
    value: "Master 2",
    label: "M2",
  },
  {
    value: "Externe",
    label: "Externe",
  },
];
const filiereEnum = [
  {
    value: "Marketing Communication",
    label: "Marketing Communication",
  },
  {
    value: "Informatique",
    label: "Informatique",
  },
  {
    value: "Audiovisuel",
    label: "Audiovisuel",
  },
  {
    value: "Crea Design",
    label: "Crea Design",
  },
  {
    value: "3D Animation",
    label: "3D Animation",
  },
  {
    value: "Architecture",
    label: "Architecture",
  },
  {
    value: "Externe",
    label: "Externe",
  },
];

export const Inscription = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    /*defaultValues: {
      email: "lkhannouf@gmail.com"
    }*/
    resolver: zodResolver(userSchema)
  });
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      const fetchData = await fetch("http://localhost:3000/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
    .catch(error =>{ throw new Error(error)
    })

    if(fetchData.type == "success"){
      //console.log("L'inscription a marché");
      const loginData = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
        
      }),
    }).then(res => res.json())
    .catch(error =>{ throw new Error(error)
    })
    if(loginData.type == "success")
      localStorage.setItem("token", loginData.token)
      localStorage.setItem("user", JSON.stringify(loginData.user))
      navigate('/')
      window.location.reload()
    }
      
      //throw new Error();
    } catch (error) {
      setError("root", { message: "Cet email est déjà utilisé" });
    }
  };

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [classe, setClasse] = useState("");
  // const [filiere, setFiliere] = useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     firstName: data.get("firstName"),
  //     lastName: data.get("lastName"),
  //     email: data.get("email"),
  //     password: data.get("password"),
  //     classe: data.get("classe"),
  //     filiere: data.get("filiere"),
  //   });
  //   const fetchData = await fetch("http://localhost:3000/user/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       password: password,
  //       classe: classe,
  //       filiere: filiere,
  //     }),
  //   })
  //   .then(res => res.json())
  //   .catch(error => {
  //     console.log("une erreur s'est produite");
  //   });
  //   if(fetchData.type == "success"){
  //     console.log(fetchData.data);

  //   }

  // };

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
            Inscription
          </Typography>
          <Card sx={{ maxWidth: 500, borderRadius: "24px", boxShadow: 3 }}>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("firstName", { required: true })}
                  margin="dense"
                  id="firstName"
                  name="firstName"
                  label="Prénom"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  {...register("lastName", { required: true })}
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  label="Nom"
                  fullWidth
                  variant="outlined"
                />
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
                <InputLabel htmlFor="classe" shrink>
                  Sélectionnez votre classe
                </InputLabel>
                <TextField
                  {...register("classe", { required: true })}
                  id="classe"
                  select
                  //helperText="Choisissez votre classe"
                  fullWidth
                  variant="outlined"
                >
                  {classeEnum.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <InputLabel htmlFor="classe" shrink>
                  Sélectionnez votre filiere
                </InputLabel>
                <TextField
                  {...register("filiere", { required: true })}
                  id="filiere"
                  select
                  fullWidth
                  variant="outlined"
                >
                  {filiereEnum.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {/* n'apparait pas et envoi un role user automatiquement  */}
                <TextField
                  {...register("role", { required: true })}
                  margin="dense"
                  id="role"
                  name="=role"
                  label="role"
                  value="user"
                  fullWidth
                  variant="outlined"
                  style={{ display: 'none'}}
                />
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
    </>
  );
};
