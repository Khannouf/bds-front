import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { useUserContext } from "../context/userContext";
import { UserReturn } from "../types/form";
import { DataGrid, GridColDef, GridRowParams, frFR } from "@mui/x-data-grid";
import { Alert, Button, Snackbar } from "@mui/material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "Prénom", width: 100 },
  { field: "lastName", headerName: "Nom", width: 100 },
  { field: "email", headerName: "Email", width: 190 },
  { field: "classe", headerName: "Classe", width: 150 },
  { field: "filiere", headerName: "Filiere", width: 170 },
  { field: "role", headerName: "Roles", width: 70 },
];

function createData(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  classe: string,
  filiere: string,
  role: string
) {
  return { id, firstName, lastName, email, classe, filiere, role };
}

export default function UsersTable() {
  const { user } = useUserContext();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [users, setUsers] = useState([]);
  const [selectedRowId, setSelectedRowsId] = useState<number | null>(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [showAlert, setShowAlert] = useState("");

  const allUsers = React.useCallback(async () => {
    const allUsersData = await fetch(`http://localhost:3000/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
    if (allUsersData.type == "success") {
      setUsers(allUsersData.data);
    }
  }, [user?.token]);

  const switchToAdmin = useCallback(async (id: number) => {
    const editToAdmin = await fetch(
      `http://localhost:3000/user/toAdmin/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ roles: "admin" }),
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
    if (editToAdmin.type == "success") {
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
  }, [user?.token]);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    allUsers();
  }, [allUsers, switchToAdmin]);

  const rows = users.map((user: UserReturn) => {
    const { id, firstName, lastName, email, classe, filiere, roles } = user;
    return createData(id, firstName, lastName, email, classe, filiere, roles);
  });

  const handleButtonClick = () => {
    switchToAdmin(selectedRows[0])
  };

  return (
    <>
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        //checkboxSelection
        isRowSelectable={(params: GridRowParams) => params.row.role == "user"}
        onRowSelectionModelChange={(selection) =>
          setSelectedRows(selection.map((id) => +id))
          
        }
      />
      <Button
        variant="contained"
        onClick={() => handleButtonClick()}
        sx={{ m: 2 }}
        disabled={selectedRows.length === 0}
      >
        Passer l'utilisateur selectionné en administrateur
      </Button>
    </div>
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
    </>
  );
}
