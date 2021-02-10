import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NewReleasesComponent from "./components/NewReleases";

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {
    let token = hash.access_token;
    if (token) {
      console.log(token);
      setToken(token);
    }
  }, [])

  const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce((initial:any, item)=> {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

  return (
    <div>
      <Header token={token}/>
    </div>
  );
}

export default App;
