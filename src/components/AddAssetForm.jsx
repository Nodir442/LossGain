import React, { useRef, useState } from "react";
import {
  Divider,
  Select,
  Space,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";
import { ConfigProvider } from "antd";
import ruRU from "antd/es/locale/ru_RU";

const validateMessages = {
  required: "${label} является обязательным!",
  types: {
    number: "${label} не является допустимым числом!",
  },
  number: {
    range: "${label} должен быть между ${min} и ${max}",
  },
};

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="Новый актив добавлен"
        subTitle={`Добавлено ${assRef.current.amount} ${coin.name} по цене ${assRef.current.price} $`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Закрыть
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Выберите монету"
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
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(values) {
    if (values.amount <= 0 || values.price <= 0) {
      return;
    }

    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    form.setFieldsValue({
      total: value * form.getFieldValue("price"),
    });
  }

  function handlePriceChange(value) {
    form.setFieldsValue({
      total: form.getFieldValue("amount") * value,
    });
  }

  return (
    <ConfigProvider locale={ruRU}>
      <Form
        form={form}
        name="add-asset"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{ price: +coin.price.toFixed(2), amount: 0, total: 0 }}
      >
        <CoinInfo coin={coin} />
        <Divider />

        <Form.Item
          label="Количество"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0.0001,
              message: "Количество должно быть больше 0!",
            },
          ]}
        >
          <InputNumber
            placeholder="Введите количество монет"
            onChange={handleAmountChange}
            style={{ width: "100%", marginLeft: "5px" }}
          />
        </Form.Item>

        <Form.Item
          label="Цена покупки ($)"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              min: 0.0001,
              message: "Цена покупки должна быть больше 0!",
            },
          ]}
        >
          <InputNumber
            onChange={handlePriceChange}
            style={{ width: "100%", marginLeft: "5px" }}
          />
        </Form.Item>

        <Form.Item label="Дата и время (не обязательно)" name="date">
          <DatePicker style={{ width: "100%", marginLeft: "5px" }} />
        </Form.Item>

        <Form.Item label="Итого" name="total">
          <InputNumber disabled style={{ width: "100%", marginLeft: "5px" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Добавить актив
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}
