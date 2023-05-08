import React, { useEffect, useState } from "react";
import style from "../style";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "antd";

export default function View() {
  const location = useLocation();
  const navigate = useNavigate();

  let { state } = location;

  useEffect(() => {
    // Get your data using id here

    // Handle the case when user directly visits /items/view
    // TODO handle dynamically, the below code is a hack
    if (!state) {
      state = {
        key: "1",
        name: "Item 1",
        serial_no: "b4673b3c-f535-4abd-9967-bbdc59465b12",
        category: "Category Alpha",
        referance: "referance_key/Referance X",
      };
      // navigate("/items");
    }
  }, []);

  return (
    <div style={style.container}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Card title={"Name: " + state?.name}>
          <p>Serial Number: {state?.serial_no}</p>
          <p>Category: {state?.category}</p>
          <p>Referance: {state?.referance}</p>
        </Card>
        <Card title="Suplied By">
          <p>Some other data here</p>
        </Card>
        <Card title="Requires">
          <p>Even more data here</p>
        </Card>
        <Card title="Referenced By">
          <p>Some additional data here</p>
        </Card>
      </div>
    </div>
  );
}
