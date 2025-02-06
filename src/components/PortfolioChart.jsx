import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const { assets } = useCrypto();
  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: "$",
        data: assets.map((asset) => asset.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(241, 196, 15, 1)",
          "rgba(52, 152, 219, 1)",
        ],
      },
    ],
  };
  const getChartWith = () => {
    const width = window.innerWidth;
    if (width <= 440) return "100%";
    if (width <= 576) return "85%";
    if (width <= 992) return "60%";
    return "50%";
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "25px auto 25px auto",
        padding: "0 20px",
        width: getChartWith(),
      }}
    >
      <Pie data={data} />
    </div>
  );
}
