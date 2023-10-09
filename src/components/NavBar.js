import { Link } from "react-router-dom";
import {
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WorkIcon from "@mui/icons-material/Work";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="desktop">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          style={{ padding: "10px 20px" }}
        >
          <Grid item xs={4}>
            <Typography variant="h4" component="h4">
              MIST Simulation
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              spacing={2}
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item xs={2}>
                <Link to="/">
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <HomeIcon />
                    <Typography component="p">Home</Typography>
                  </Stack>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link to="/about">
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <PermIdentityIcon />
                    <Typography component="p">About</Typography>
                  </Stack>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link to="/demo">
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <PlayArrowIcon />
                    <Typography component="p">Demo</Typography>
                  </Stack>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Link to="/jobs">
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <WorkIcon />
                    <Typography component="p">Jobs</Typography>
                  </Stack>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="mobile">
        <Grid container justifyContent="flex-end">
          <Grid item xs={2}>
            <Button onClick={() => setOpen(true)}>
              <MenuIcon />
            </Button>
          </Grid>
        </Grid>

        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Box
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
          >
            <List>
              <ListItem key="Home" disablePadding>
                <Link to="/">
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem key="About" disablePadding>
                <Link to="about">
                  <ListItemButton>
                    <ListItemIcon>
                      <PermIdentityIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem key="Demo" disablePadding>
                <Link to="demo">
                  <ListItemButton>
                    <ListItemIcon>
                      <PlayArrowIcon />
                    </ListItemIcon>
                    <ListItemText primary="Demo" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem key="Jobs" disablePadding>
                <Link to="jobs">
                  <ListItemButton>
                    <ListItemIcon>
                      <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Jobs" />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </div>
    </div>
  );
};

export default NavBar;
