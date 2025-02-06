import React, { useContext, useState, useEffect } from "react";
import {
  Drawer,
  List,
  Card,
  Typography,
  Button,
  Statistic,
  Tag,
  Row,
  Col,
  Empty,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CryptoContext from "../../context/crypto-context";
import { capitalized } from "../../utils";

const drawerStyle = {
  padding: "1rem",
  backgroundColor: "#f0f2f5", 
  minHeight: "100vh",
};

export default function AssetsDrawer({ open, onClose }) {
  const { assets, removeAsset } = useContext(CryptoContext);
  const [drawerWidth, setDrawerWidth] = useState(getDrawerWidth());

  function getDrawerWidth() {
    const width = window.innerWidth;
    if (width <= 420) return "100%";
    if (width <= 576) return "80%";
    if (width <= 992) return "50%";
    return "35%";
  }

  useEffect(() => {
    const handleResize = () => setDrawerWidth(getDrawerWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Drawer
      title="Мои активы"
      placement="left"
      onClose={onClose}
      open={open}
      width={drawerWidth}
      style={drawerStyle}
    >
      {assets.length === 0 ? (
        <Empty
          description="Добавьте активы"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: "20px" }}
        />
      ) : (
        assets.map((asset, index) => (
          <Card
            key={`${asset.id}-${index}`}
            style={{ marginBottom: "1rem" }}
            actions={[
              <Row justify="center" key="delete">
                <Col xs={24} sm={18} md={12} lg={8}>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeAsset(asset.id)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>,
            ]}
          >
            <Statistic
              title={capitalized(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  widthTag: true,
                },
                { title: "Asset Amount", value: asset.amount, isPlain: true },
              ]}
              renderItem={({ title, value, widthTag, isPlain }) => (
                <List.Item>
                  <span>{title}</span>
                  <span>
                    {widthTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {isPlain ? (
                      value
                    ) : (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))
      )}
    </Drawer>
  );
}
