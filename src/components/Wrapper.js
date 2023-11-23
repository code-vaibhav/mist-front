import { Layout, Menu, Typography, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";

const { Header, Content, Footer: FooterContainer } = Layout;
const { Title } = Typography;

const Wrapper = ({ children, footer }) => {
  const location = useLocation();
  const currentURL = location.pathname;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ position: "sticky", top: "0", zIndex: 1000 }}>
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Title level={3} style={{ color: "white", margin: 0 }}>
              MIST Simulation
            </Title>
          </Link>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={
              currentURL.split("/")[1] === ""
                ? ["1"]
                : currentURL.split("/")[1] === "dashboard"
                ? ["2"]
                : ["3"]
            }
            items={[
              { key: "1", label: <Link to="/">Home</Link> },
              { key: "2", label: <Link to="/dashboard">Dashboard</Link> },
              { key: "3", label: <Link to="/faq">FAQ</Link> },
            ]}
          />
        </Flex>
      </Header>
      <Content
        style={{
          margin: 0,
          minHeight: "100%",
          backgroundColor: "white",
          paddingBottom: "50px",
        }}
      >
        {children}
      </Content>
      {footer && (
        <FooterContainer>
          <Footer />
        </FooterContainer>
      )}
    </Layout>
  );
};

export default Wrapper;
