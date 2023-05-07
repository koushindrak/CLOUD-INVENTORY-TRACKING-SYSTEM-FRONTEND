import { Table, Button } from "antd";
import styles from "./style";
import { v4 } from "uuid";

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

// Columns are defined here instead of html
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
    title: "Edit",
    dataIndex: "edit",
    key: "edit",
    render: () => (
      <Button type="primary" block>
        Edit
      </Button>
    ),
  },
  {
    title: "Delete",
    dataIndex: "delete",
    key: "delete",
    render: () => (
      <Button type="primary" danger block>
        Delete
      </Button>
    ),
  },
];

export default function Items(params) {
  return (
    <div style={styles.container}>
      <h2 style={{ color: "#343434", fontFamily: "sans-serif", marginBottom: 40 }}>ITEMS VIEW</h2>
      <Table dataSource={mockData} columns={columns} />
    </div>
  );
}
