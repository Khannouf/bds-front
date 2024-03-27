import { Box, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

interface ResponsiveBoxProps {
  children: ReactNode;
}

interface TimerProps {
  dateDeb: string;
}

export const Timer = (props: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [actif, setActif] = useState(true);
  //const [ dateToBegin, setDateToBegin] = useState(new Date())
  //const [ dateToEnd, setDateToEnd] = useState(new Date())

  useEffect(() => {
    const getTime = (/*begin: Date, end: Date*/) => {
      const deadline = new Date(props.dateDeb);
      const dateNow = new Date();

      const difference = deadline.getTime() - dateNow.getTime();
      if (difference < 0) {
        setActif(false);
      } else {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor(difference / (1000 * 60 * 60)) % 24);
        setMinutes(Math.floor(difference / (1000 * 60)) % 60);
        setSeconds(Math.floor(difference / 1000) % 60);
      }
    };

    const interval = setInterval(() => {
      getTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const ResponsiveBox: React.FC<ResponsiveBoxProps> = ({ children }) => {
    return (
      <Box
        sx={{
          flexGrow: 1,
          minWidth: "30px", // Définir une largeur minimale pour éviter la compression excessive
          textAlign: "center",
          //bgcolor: "#fff"
        }}
      >
        {children}
      </Box>
    );
  };

  return (
    <>
      {actif ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "10vh",
            //bgcolor: "#DCC4FF",
            background: "linear-gradient(15deg, #934AFE 35%, #FE4ACD 85%)",
            borderRadius: 3,
            boxShadow: 3,
            m: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // Par défaut, flex est row, pas besoin de spécifier
              flexWrap: "flexWrap",
              "& > *": {
                margin: "5px",
              },
            }}
          >
            <ResponsiveBox>
              <Typography variant="h4">
                {days < 10 ? `0${days}` : days}
              </Typography>
            </ResponsiveBox>
            <Typography variant="h4">:</Typography>
            <ResponsiveBox>
              <Typography variant="h4">
                {hours < 10 ? `0${hours}` : hours}
              </Typography>
            </ResponsiveBox>
            <Typography variant="h4">:</Typography>
            <ResponsiveBox>
              <Typography variant="h4">
                {minutes < 10 ? `0${minutes}` : minutes}
              </Typography>
            </ResponsiveBox>
            <Typography variant="h4">:</Typography>
            <ResponsiveBox>
              <Typography variant="h4">
                {seconds < 10 ? `0${seconds}` : seconds}
              </Typography>
            </ResponsiveBox>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "10vh",
            bgcolor: "#e0e0e0",
            borderRadius: 3,
            boxShadow: 3,
            m: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // Par défaut, flex est row, pas besoin de spécifier
              flexWrap: "flexWrap",
              "& > *": {
                margin: "5px",
              },
            }}
          >
            <ResponsiveBox>
              <Typography variant="h4">Time out</Typography>
            </ResponsiveBox>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Timer;
