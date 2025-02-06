import { Divider, Tag, Typography } from "antd";
import CoinInfo from "./CoinInfo";

export default function CoinInfoModal({ coin }) {
  const renderPriceChange = (change, label) => (
    <>
      <Typography.Text strong>{label}: </Typography.Text>
      <Tag color={change > 0 ? "green" : "red"}>{change}%</Tag>
    </>
  );

  return (
    <>
      <CoinInfo coin={coin} widthSymbol />
      <Divider />
      <Typography.Paragraph>
        {renderPriceChange(coin.priceChange1h, "1 час")}
        {" "}
        {renderPriceChange(coin.priceChange1d, "1 день")}
        {" "}
        {renderPriceChange(coin.priceChange1w, "1 неделя")}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Цена: </Typography.Text> ${coin.price.toFixed(2)}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Цена в BTC: </Typography.Text> {coin.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Рыночная капитализация: </Typography.Text> ${coin.marketCap.toFixed(2)}
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Контрактный адрес: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
}
