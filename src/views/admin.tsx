import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CreateEventForm } from "../components/CreateEventForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import DateProviders from "../providers/localizationProvider";
import UsersTable from "../components/tableUser";
import UpdateEvent from "../components/UpdateEvent";
import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Admin = () => {
  const { user } = useUserContext();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    
  };

  return (
    <Box sx={{ width: "100%" }}>
      {user?.role == "admin" ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="Statistiques" {...a11yProps(0)} />
              <Tab label="Listes d'utilisateurs" {...a11yProps(1)} />
              <Tab label="Créer un évènement" {...a11yProps(2)} />
              <Tab label="Mes évènements" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <UsersTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CreateEventForm />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <UpdateEvent />
          </CustomTabPanel>
        </>
      ) : (
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
              Vous n'avez pas les droits nécéssaires pour accéder à cette page
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
