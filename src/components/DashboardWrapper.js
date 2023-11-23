import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const DashboardWrapper = ({ children }) => {
  const location = useLocation();
  const currentURL = location.pathname;

  return (
    <Layout>
      <Sider
        width={200}
        style={{
          position: "sticky",
          left: 0,
          top: 0,
          height: "100vh",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={currentURL.split("/").length > 2 ? ["2"] : ["1"]}
          theme="dark"
          style={{
            height: "100%",
            borderRight: 0,
            padding: "20px 10px",
          }}
          items={[
            { key: "1", label: <Link to="/dashboard">Projects</Link> },
            { key: "2", label: <Link to="/dashboard/add">Add Project</Link> },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: 0,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardWrapper;
