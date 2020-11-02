import "./App.css";
import React, { useEffect, useState } from "react";
import BoardList from "./Components/BoardList/BoardList";
import Header from "./Components/Header/Header"
import Login from "./Components/Login/Login"
import Signup from "./Components/Login/Signup";
function App() {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      // const res = await fetch("https://hk7webadvmidtermserver.herokuapp.com/boards");
      const res = await fetch("http://localhost:3000/boards");
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
      <Header />
      <Signup />
      <div className="container-fluid d-flex justify-content-center">
        <BoardList ListItem={data} />
      </div>
    </div>
  );
}

export default App;
