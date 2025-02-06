import { Layout, Spin, Button } from "antd";
import { useContext, useState } from "react";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import CryptoContext from "../../context/crypto-context";
import AssetsDrawer from "./AppSider";

const layoutStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
};

const outerLayoutStyle = {
  backgroundColor: "#001529",
  height: "100%",
};

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout style={outerLayoutStyle}>
      <AppHeader />
      <Layout style={layoutStyle}>
        <AppSider />
        <AppContent />

        <Button
          type="primary"
          onClick={() => setDrawerOpen(true)}
          style={{ position: "fixed", bottom: 25, left: 25 }}
        >
          Открыть активы
        </Button>
        <AssetsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </Layout>
    </Layout>
  );
}
