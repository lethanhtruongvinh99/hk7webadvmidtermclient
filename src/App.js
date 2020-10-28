import "./App.css";
import React, { useEffect, useState } from "react";
import BoardList from "./Components/BoardList/BoardList";
function App() {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://hk7webadvmidtermserver.herokuapp.com/boards");
      await res
        .json()
        .then((res) => {
          setData(res);
        })
        .catch((err) => setHasError(err));
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="bg-primary text-center">Header1</h1>
      <div className="container-fluid d-flex justify-content-center">
        <BoardList ListItem={data} />
      </div>
    </div>
  );
}

export default App;
