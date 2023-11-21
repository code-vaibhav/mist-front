import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Home = () => {
  const overview = [
    "C++ binary",
    "Multi-ensemble simulation",
    "Mixtures and multi-component systems",
    "Force field library",
  ];

  const features = [
    "MIST can be useful for variety of ensembles such as NPT, NVT, GCMC, CBMC, TMMC ensembles",
    "It is useful for multicomponent or mixture simulations",
    "The inputs requirements is minimal for simulations. For complex systems some advance commands are needed",
    "Several types of force- fields are implemented such as Lennard Jones potential, Coulombic potential with Ewald summation technique",
    "Implementation of new force field is very easy",
    "Parallel programming is implemented for TMMC simulation",
  ];

  return (
    <div>
      <Typography variant="h3" component="h3" align="center" m={5}>
        Molecular Simulation Insight Tool (MIST)
      </Typography>
      <div style={{ padding: "0 20px" }}>
        <Typography component="p" align="left" mb={4}>
          MIST is a general-purpose classical simulation software. We have
          developed C++ object-oriented programming software for doing various
          Monte Carlo simulations such as NPT, NVT, GCMC, TMMC etc. Monte Carlo
          simulation is clearly an efficient way to study gas adsorption, gas
          separation in nanoporous materials and phase diagram calculation.
          Hence the development is entirely focused on running simulations
          faster with minimum input details from the users. Our software is used
          along with machine learning models to predict the best materials from
          h-MOF database for ethane / ethylene separation.
        </Typography>

        <Typography component="p" align="left" mb={4}>
          It has been actively developed by the Computational Nanoscience Group
          led by Prof. Jayant K. Singh at the Indian Institute of Technology,
          Kanpur for over five years. It has been used for publication purposes
          in peer reviewed journals, primarily as a tool for Monte Carlo
          simulations. In particular, it has been used for the simulation of
          molecules in the gaseous or fluid phase, in conjunction with
          adsorbents.
        </Typography>
      </div>

      <section className="overview">
        <Typography variant="h4" component="h4" m={3}>
          Overview
        </Typography>
        <List ml={3}>
          {overview.map((item) => (
            <ListItem id={item}>
              <ListItemIcon>
                <ArrowForwardIosIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </section>

      <section className="features">
        <Typography variant="h4" component="h4" m={3} mb={5}>
          Implemented Features
        </Typography>

        <Grid container rowSpacing={10} columnSpacing={4} pr={5} pl={5}>
          {features.map((feature) => (
            <Grid item md={4} xs={12}>
              <Card
                variant="elevation"
                sx={{
                  height: "100%",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h6" align="center">
                    {feature}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
    </div>
  );
};

export default Home;
