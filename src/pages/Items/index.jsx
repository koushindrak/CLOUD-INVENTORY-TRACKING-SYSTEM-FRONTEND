import React from "react";

import { Table, Button } from "antd";
import styles from "./style";
import { v4 } from "uuid";
import { useNavigate, Link, BrowserRouter } from "react-router-dom";

const uuid = v4();

const mockData = [
  {
    key: "1",
    name: "Item 1",
    serial_no: uuid,
    category: "Category Alpha",
    referance: "referance_key/Referance X",
  },
  {
    key: "2",
    name: "Item 2",
    serial_no: uuid,
    category: "Category Beta",
    referance: "referance_key/Referance X",
  },
];

export default function Items() {
  const navigate = useNavigate();

  function deleteItem(record) {
    const { serial_no, name } = record;
    window.alert(`Delete ${name}?`);
    // Delete Item logic goes here
    return 0;
  }

  // Default antd way
  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Serial Number",
      dataIndex: "serial_no",
      key: "serial_no",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Referance",
      dataIndex: "referance",
      key: "referance",
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <Button type="dashed" block onClick={() => navigate("/items/view", { state: record })}>
          View
        </Button>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button type="primary" block onClick={() => navigate("/items/edit", { state: record })}>
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Button type="primary" danger block onClick={() => deleteItem(record)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ITEMS VIEW</h2>
      <Table dataSource={mockData} columns={columns} />
    </div>
  );
}
