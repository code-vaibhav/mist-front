import { Typography, Grid, Card, CardContent } from "@mui/material";
import { Flex } from "antd";
import { Collapse } from "antd";

const Home = () => {
  const getOverview = (panelStyle) => [
    {
      key: 1,
      label: "C++ binary",
      children: (
        <Typography component="p">
          C++ is a powerful programming language that is often used in the
          development of molecular simulation software. It allows for efficient
          computation and can handle complex tasks involved in molecular
          simulations12. A C++ binary refers to the executable file that is
          generated after the C++ code is compiled. This binary file can be run
          directly to perform the molecular simulations
        </Typography>
      ),
      style: panelStyle,
    },
    {
      key: 2,
      label: "Multi-ensemble simulation",
      children: (
        <Typography component="p">
          Multi-ensemble simulation is a technique used in molecular dynamics to
          simulate a system under different conditions or ensembles. This
          approach provides a comprehensive understanding of the system’s
          behavior under various thermodynamic conditions
        </Typography>
      ),
      style: panelStyle,
    },
    {
      key: 3,
      label: "Mixtures and multi-component systems",
      children: (
        <Typography component="p">
          In molecular simulations, mixtures and multi-component systems refer
          to the simulations that involve more than one type of molecule. These
          simulations are crucial in studying the interactions and behavior of
          different molecules in a system, which is particularly important in
          fields like materials science, biochemistry, and drug discovery
        </Typography>
      ),
      style: panelStyle,
    },
    {
      key: 4,
      label: "Force field library",
      children: (
        <Typography component="p">
          A force field library is a collection of equations and parameters used
          to calculate the potential energy of a system of atoms or particles in
          molecular mechanics, molecular dynamics, or Monte Carlo simulations.
          These libraries provide the necessary data to model intra- and
          intermolecular interactions accurately, making them a vital part of
          any molecular simulation software
        </Typography>
      ),
      style: panelStyle,
    },
  ];

  const features = [
    {
      title:
        "MIST can be useful for variety of ensembles such as NPT, NVT, GCMC, CBMC, TMMC ensembles",
      src: "b1.jpeg",
    },
    {
      title: "It is useful for multicomponent or mixture simulations",
      src: "b2.jpeg",
    },
    {
      title:
        "The inputs requirements is minimal for simulations. For complex systems some advance commands are needed",
      src: "b3.jpeg",
    },
    {
      title:
        "Several types of force- fields are implemented such as Lennard Jones potential, Coulombic potential with Ewald summation technique",
      src: "b4.jpeg",
    },
    { title: "Implementation of new force field is very easy", src: "b5.jpeg" },
    {
      title: "Parallel programming is implemented for TMMC simulation",
      src: "b6.jpeg",
    },
  ];

  const panelStyle = {
    marginBottom: 24,
    background: "white",
    borderRadius: 5,
    border: "none",
  };

  return (
    <div>
      <Flex
        style={{ backgroundColor: "#d5f2fe" }}
        align="center"
        justify="space-evenly"
      >
        <img src="1.jpeg" alt="landing_image" style={{ width: "40%" }} />
        <div style={{ marginBottom: "5%", textAlign: "center" }}>
          <Typography variant="h3" component="h3" align="center" m={5}>
            MIST <br /> Molecular Simulation Insight Tool
          </Typography>
          <Typography variant="h5" component="h5">
            Representative bulk CO2 simulation visualized in VMD.
          </Typography>
        </div>
      </Flex>

      <section style={{ padding: "3% 5%" }}>
        <Typography variant="h4" component="h4" m={3} mb={5} align="center">
          About
        </Typography>
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
      </section>

      <section className="overview" style={{ padding: "3% 5%" }}>
        <Typography variant="h4" component="h4" m={3} mb={5} align="center">
          Overview
        </Typography>
        <Flex>
          <img
            style={{ width: "35%", marginRight: "5%", borderRadius: "15px" }}
            src="2.jpeg"
            alt=""
          />
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            accordion
            ml={3}
            items={getOverview(panelStyle)}
            style={{ backgroundColor: "white" }}
          />
        </Flex>
      </section>

      <section className="features" style={{ padding: "3% 5%" }}>
        <Typography variant="h4" component="h4" m={3} mb={5} align="center">
          Implemented Features
        </Typography>

        <Grid container rowSpacing={10} columnSpacing={4} pr={5} pl={5}>
          {features.map((feature) => (
            <Grid item md={4} xs={12}>
              <Card
                variant="elevation"
                sx={{
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
                  margin: "0 10px",
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "1", // Setting aspect ratio to 1 for a square shape
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${feature.src})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    opacity: "0.1", // Adjust the opacity here
                  }}
                />
                <CardContent style={{ zIndex: 1 }}>
                  <Typography variant="h6" component="h6" align="center">
                    {feature.title}
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
