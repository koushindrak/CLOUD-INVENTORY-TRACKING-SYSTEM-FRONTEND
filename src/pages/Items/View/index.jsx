import React, { useEffect, useState } from "react";
import style from "../style";
import { useNavigate, useNavigation, useParams } from "react-router-dom";

export default function View(props) {
  const propData = useNavigation().location.state;
  const navigate = useNavigate();

  const [data, setData] = useState({
    key: "1",
    name: "Item 1",
    serial_no: "b4673b3c-f535-4abd-9967-bbdc59465b12",
    category: "Category Alpha",
    referance: "referance_key/Referance X",
  });

  useEffect(() => {
    // Get your data using id here
    // if (!propData) {
    //   navigate("/items");
    // }
  }, []);

  return (
    <div style={style.container}>
      <h2 style={style.title}>View Item: {data.serial_no}</h2>
    </div>
  );
}
