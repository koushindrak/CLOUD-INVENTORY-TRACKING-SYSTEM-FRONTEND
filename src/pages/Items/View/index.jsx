import React, { useEffect, useState } from "react";
import style from "../style";
import { useNavigate, useLocation } from "react-router-dom";

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
      <h2 style={style.title}>View Item: {state?.serial_no}</h2>
    </div>
  );
}
