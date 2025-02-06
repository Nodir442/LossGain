import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetTables";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "20px 10px 50px 20px",
  position: "relative",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const totalPortfolioValue = assets
    .reduce((total, { id, amount }) => {
      const assetPrice = crypto.find((coin) => coin.id === id)?.price || 0;
      return total + amount * assetPrice;
    }, 0)
    .toFixed(2);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title
        level={3}
        style={{
          display: "flex",
          justifyContent: "center",
          height: "400px",
          color: "#fff",
          fontFamily: "Montserrat",
          alignItems: "center",
        }}
      >
        {assets.length === 0
          ? "Добавьте активы и узнайте, получаете ли вы прибыль или находитесь в убытке!"
          : `Общая сумма: ${totalPortfolioValue} $`}
      </Typography.Title>
      {assets.length > 0 && (
        <>
          <PortfolioChart />
          <AssetsTable />
        </>
      )}

      <div style={{ position: "absolute", bottom: 20, right: 0 }}>
        <Typography.Text
          style={{
            fontFamily: "Montserrat",
            fontSize: "12px",
            color: "#fff",
          }}
        >
          Данные актуальны на 3 февраля 2025 года
        </Typography.Text>
      </div>
      <div style={{ position: "absolute", bottom: 0, right: 50, left: 50 }}>
        <Typography.Text
          style={{
            fontFamily: "Montserrat",
            fontSize: "16px",
            color: "rgb(299, 9, 20)",
            fontWeight: 700,
            textShadow: "0px 0px 40px rgb(255, 255, 255)",
          }}
        >
          Loss<span style={{color:"rgb(106, 255, 47)"}}>Gain</span>
        </Typography.Text>
      </div>
    </Layout.Content>
  );
}
