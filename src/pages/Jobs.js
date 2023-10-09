import { useEffect, useState, Fragment } from "react";
import {
  Typography,
  TableContainer,
  TableHead,
  TableCell,
  Table,
  TableRow,
  TableBody,
  Paper,
  Collapse,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row } = props;

  const downloadResult = (file) => {
    fetch(
      file
        ? `${process.env.REACT_APP_BACKEND_URL}/getresult/${row.uid}/${file}`
        : `${process.env.REACT_APP_BACKEND_URL}/getresult/${row.uid}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => {
        console.log(res.data);

        let filename = file
          ? `${row.filename.split(".")[0]}_${file.split(".")[0]}_results.zip`
          : `${row.filename}_results.zip`;
        filename = decodeURI(filename);
        const url = URL.createObjectURL(new Blob([res.data]));
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

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => props.setOpen(props.open === row.uid ? -1 : row.uid)}
          >
            {props.open === row.uid ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.filename}
        </TableCell>
        <TableCell>{row.submitted_at}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.simulations}</TableCell>
        <TableCell>
          <Button
            onClick={downloadResult}
            disabled={row.status !== "Completed"}
          >
            Results
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={props.open === row.uid} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {row.processes.reduce(
                (acc, curr) => (acc ? acc + ", " + curr : curr),
                ""
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getjobs`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          data.sort(
            (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
          );
          setJobs(
            data.map((job) => ({
              ...job,
              simulations: job.processes.length,
            }))
          );
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Typography variant="h3" component="h3" align="center">
        Jobs
      </Typography>
      <TableContainer
        component={Paper}
        style={{ width: "90%", margin: "auto" }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Simulation Files</TableCell>
              <TableCell>Filename</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Simulations</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <Row key={job.uid} row={job} open={open} setOpen={setOpen} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Jobs;
