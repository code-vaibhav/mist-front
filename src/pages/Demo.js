import { Button, Grid, Typography, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const Demo = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);

  const submitFile = () => {
    setProcessing(true);
    console.log(process.env.REACT_APP_BACKEND_URL);
    const formData = new FormData();
    formData.append("zipFile", file);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/postjob`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
        setFile(null);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3" component="h3" align="center">
        MIST Simulation Demo
      </Typography>
      <Typography component="p" align="center">
        Make a zip file containing all the simulation files
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Stack alignItems="center">
            <input
              accept=".zip"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              value={file?.filename}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                disabled={processing}
              >
                Upload
              </Button>
            </label>
            {file && (
              <Typography component="p" align="center">
                {file.name}
              </Typography>
            )}
          </Stack>
        </Grid>
        <Grid item>
          <Button
            style={{ position: "relative" }}
            variant="outlined"
            component="span"
            onClick={submitFile}
            disabled={processing}
          >
            {processing && (
              <CircularProgress
                size={30}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  translate: "-50% -50%",
                }}
              />
            )}
            Submit
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Demo;
