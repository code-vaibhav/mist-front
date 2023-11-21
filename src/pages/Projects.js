import { useEffect, useState } from "react";
import { Typography, Box, Button, Chip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    maxHeight: "100%", // Set height to 100% of the parent container
    width: "95%", // Set the width of the container
    margin: "0 auto", // Center the container horizontally
  },
  row: {
    width: "100%", // Allow rows to occupy the full width
    maxWidth: "100%",
  },
}));

const Projects = () => {
  const [jobs, setJobs] = useState([]);

  const downloadResult = (row) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getresult/${row.uid}`, {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    })
      .then((res) => res.blob())
      .then((blob) => {
        let filename = `${row.filename.split(".")[0]}_results.zip`;
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const classes = useStyles();

  const columns = [
    {
      field: "filename",
      headerName: "Simulation name",
      flex: 1,
    },
    {
      field: "submitted_at",
      headerName: "Submitted At",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Sim Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={params.row.status === "Completed" ? "success" : "warning"}
          variant="outlined"
        />
      ),
    },
    {
      field: "completed_at",
      headerName: "Time Taken",
      flex: 1,
      valueGetter: (params) =>
        (params.row.completed_at
          ? (new Date(params.row.completed_at) -
              new Date(params.row.submitted_at)) /
            (1000 * 60 * 60)
          : (new Date() - new Date(params.row.submitted_at)) / (1000 * 60 * 60)
        ).toFixed(2) + " hours",
    },
    {
      field: "simulations",
      headerName: "Sim Count",
      flex: 0,
    },
    {
      field: "uid",
      headerName: "Simulation Names",
      renderCell: (params) => (
        <Box sx={{ margin: 1 }}>
          {params.row.processes.reduce(
            (acc, curr) => (acc ? acc + ", " + curr : curr),
            ""
          )}
        </Box>
      ),
      flex: 1,
    },
    {
      field: "result",
      headerName: "Simulation Result",
      renderCell: (params) => (
        <Button
          onClick={() => downloadResult(params.row)}
          disabled={params.row.status !== "Completed"}
          type="button"
          color="primary"
        >
          Download Results
        </Button>
      ),
      flex: 1,
    },
    {
      field: "details",
      headerName: "Project Details",
      renderCell: (params) => (
        <Link to={`/dashboard/${params.row.uid}`}>
          <Button>View Details</Button>
        </Link>
      ),
      flex: 1,
    },
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getjobs`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        data.sort(
          (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
        );
        setJobs(
          data.map((job) => ({
            ...job,
            simulations: job.processes.length,
          }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h4" align="center" m={5}>
        Projects
      </Typography>
      <DataGrid
        rows={jobs}
        columns={columns}
        getRowId={(row) => row.uid}
        showColumnVerticalBorder
        showCellVerticalBorder
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        getRowClassName={() => classes.row}
        slots={{ toolbar: GridToolbar }}
        disableExtendRowFullWidth
      />
    </div>
  );
};

export default Projects;
