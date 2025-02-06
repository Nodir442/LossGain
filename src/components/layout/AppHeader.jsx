import {
  Button,
  Col,
  Drawer,
  Layout,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";
import Title from "antd/es/skeleton/Title";

const headerStyle = {
  maxWidth: "100%",
  textAlign: "center",
  padding: "0 10px",
  display: "flex",
  background: "#001529",
  minHeight: "fit-content",
};

const titleStyle = {
  color: "#fff",
  fontFamily: "Montserrat",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => {
      document.removeEventListener("keypress", keypress);
    };
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((coin) => coin.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "10px ",
          display: "flex",
          margin: "0 auto",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          gutter={[10, 10]}
          style={{ width: "100%" }}
        >
          <Col
            xs={24}
            sm={15}
            md={12}
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Typography.Title style={titleStyle} level={4}>
              Текущие цены:
            </Typography.Title>
            <Select
              open={select}
              onSelect={handleSelect}
              onClick={() => setSelect((prev) => !prev)}
              value="Нажмите / чтобы открыть"
              options={crypto.map((coin) => ({
                label: coin.name,
                value: coin.id,
                icon: coin.icon,
              }))}
              optionRender={(option) => (
                <Space>
                  <img
                    style={{ width: 20 }}
                    src={option.data.icon}
                    alt={option.data.label}
                  />
                  {option.data.label}
                </Space>
              )}
            />
          </Col>

          <Col
            xs={24}
            sm={8}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={() => setDrawer(true)}
            >
              Добавить актив
            </Button>
          </Col>
        </Row>

        <Modal
          open={modal}
          onOk={() => setModal(false)}
          onCancel={() => setModal(false)}
          footer={null}
        >
          <CoinInfoModal coin={coin} />
        </Modal>

        <Drawer
          width={600}
          title="Добавить актив"
          onClose={() => setDrawer(false)}
          open={drawer}
          destroyOnClose
        >
          <AddAssetForm onClose={() => setDrawer(false)} />
        </Drawer>
      </div>
    </Layout.Header>
  );
}
