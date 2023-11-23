import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/Projects";
import Wrapper from "./components/Wrapper";
import DashboardWrapper from "./components/DashboardWrapper";
import AddProject from "./pages/AddProject";
import Project from "./pages/Project";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Wrapper children={<Home />} footer={true} />}
        />
        <Route
          path="/dashboard"
          element={
            <DashboardWrapper
              children={<Wrapper children={<Dashboard />} footer={false} />}
            />
          }
        />
        <Route
          path="/dashboard/add"
          element={
            <DashboardWrapper
              children={<Wrapper children={<AddProject />} />}
            />
          }
        />
        <Route
          path="/dashboard/:uid"
          element={
            <DashboardWrapper children={<Wrapper children={<Project />} />} />
          }
        />
        <Route path="/faq" element={<Wrapper children={<FAQ />} />} />
      </Routes>
    </div>
  );
};

export default App;
