import React, { Component } from "react";

export default function Teste(){



const [state, setState] = React.useState(false)
 
  function fetchData(){
    setState(true);

    console.log(state)
    //Faking API call here
    setTimeout(() => {
      setState(false);
    }, 2000);

    console.log(state)
  }



    return (
      <div style={{ marginTop: "60px" }}>
        <button className="button" onClick={fetchData} disabled={state}>
          {state && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {state&& <span>Loading Data from Server</span>}
          {!state && <span>Fetch Data from Server</span>}
        </button>
      </div>
    );
  }

