import * as React from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { UserReturn } from "../types/form";
import { DataGrid, GridColDef, GridRowParams, frFR } from "@mui/x-data-grid";

interface Participant {
  user: UserReturn;
}

interface ActivitieId {
  id: number;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "Prénom", width: 100 },
  { field: "lastName", headerName: "Nom", width: 100 },
  { field: "email", headerName: "Email", width: 190 },
  { field: "classe", headerName: "Classe", width: 150 },
  { field: "filiere", headerName: "Filiere", width: 170 },
];

function createData(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  classe: string,
  filiere: string
) {
  return { id, firstName, lastName, email, classe, filiere };
}

export default function ParticipantsTable(id: ActivitieId) {
  const { user } = useUserContext();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isSelectionEnabled, setIsSelectionEnabled] = useState(true);
  const [participants, setParticipants] = useState([]);

  const allParticipant = React.useCallback(async () => {
    const allParticipantData = await fetch(
      `http://localhost:3000/activitie/participants/${id.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
    if (allParticipantData.type == "success") {
      setParticipants(allParticipantData.data);
    }
  }, [id, user?.token]);

  useEffect(() => {
    allParticipant();
  }, [allParticipant]);

  const rows = participants.map((participant: Participant) => {
    const { id, firstName, lastName, email, classe, filiere } =
      participant.user;
    return createData(id, firstName, lastName, email, classe, filiere);
  });

  console.log(rows);

  const handleButtonClick = () => {
    const selectedRowId = selectedRows[0];
    console.log("ID de la ligne sélectionnée :", selectedRowId);
  };

  return (
    <div style={{ height: 371, width: "100%" }}>
      <DataGrid
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        //checkboxSelection
        isRowSelectable={(params: GridRowParams) => params.row.classe == "Master 1"}
        onRowSelectionModelChange={(selection) =>
          setSelectedRows(selection.map((id) => +id))
        }
      />
      <button onClick={() => handleButtonClick()}>
        Obtenir l'ID de la colonne sélectionnée
      </button>
    </div>
  );
}
