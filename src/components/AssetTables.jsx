import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";
import { useState, useEffect } from "react";

export default function AssetsTable() {
  const { assets } = useCrypto();
  const [tableSize, setTableSize] = useState(getTableSize());

  function getTableSize() {
    if (window.innerWidth < 768) return "small";
    if (window.innerWidth < 1024) return "middle";
    return "large";
  }

  useEffect(() => {
    const handleResize = () => setTableSize(getTableSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    { title: "Название", dataIndex: "name" },
    { title: "Цена, $", dataIndex: "price" },
    { title: "Количество", dataIndex: "amount" },
  ];

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price.toFixed(2),
    amount: asset.amount,
  }));

  return (
    <Table
      size={tableSize}
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
}
