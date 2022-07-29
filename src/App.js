import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // const [select, setSelect] = useState();
  const [sheet, setSheet] = useState();
  const [select, setSelect] = useState();
  const [selectII, setSelectII] = useState();
  const [filterData, setFilterData] = useState();
  // const [filterRoom, setFilterRoom] = useState();

  const getData = async () => {
    try {
      const res = await axios.get("https://sheetdb.io/api/v1/ow2lc6s8v5khc");
      console.log(res.data);
      setSheet(res.data);
      setFilterData(res.data);
    } catch (error) {
      console.log(error);
    }

  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name
    },
    {
      name: "Email",
      selector: (row) => row.email
    },
    {
      name: "Position",
      selector: (row) => row.position
    },
    {
      name: "Linkedin",
      selector: (row) => row.linkedin
    },
    {
      name: "Company",
      selector: (row) => row.company
    },
    {
      name: "Company Website",
      selector: (row) => row.company_website
    },
    {
      name: "Geo",
      selector: (row) => row.geo
    },
    {
      name: "Solution",
      selector: (row) => row.solution
    },
    {
      name: "Status",
      selector: (row) => row.status
    },
    {
      name: "Details",
      selector: (row) => row.details
    },
    {
      name: "Reply",
      selector: (row) => row.reply
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize:"15px"
      
      },
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = sheet?.filter((row) => {
      return row.status.toLowerCase().match(select.toLowerCase()) 

    });
    setFilterData(result);
  }, [select]);
  useEffect(()=>{
    const result = sheet?.filter((row) => {
      return row.solution.toLowerCase().match(selectII.toLowerCase());
  });
  setFilterData(result);
}, [selectII]);


  return (
    <>
      <div className="App">
        <div className="logo">
          <img className="logo" src="https://nexuses.in/wp-content/uploads/2019/05/logo-big-1.png"/>
        </div>
        <div className="dropdowns">
        <select
          className="select"
          type="select"
          value={select}
          onChange={(e) => setSelect(e.target.value)}
        >
          <option value={filterData}>Status</option>
          <option value="Hot">Hot</option>
          <option value="Meeting Done">Meeting Done</option>
          <option value="Meeting Scheduled">Meeting Scheduled</option>
          <option value="Meeting Re-scheduled">Meeting Re-scheduled</option>
          <option value="Lost">Lost</option>
          <option value="Contact Later">Contact Later</option>
        </select>
        <select
          className="select"
          type="select"
          value={selectII}
          onChange={(e) => setSelectII(e.target.value)}
        >
          <option value={setFilterData}>Solution</option>
          <option value="Product Dev">Product Dev</option>
          <option value="Testing & QA">Testing & QA</option>
        </select>
        </div>
        <div className="container">
          <div className="card">
            <p className="para">Lost</p>
            {sheet?.map((e) => (
              <h3 className="num">{e.Lost}</h3>
            ))}
          </div>
          <div className="card">
            <p>Contact Later</p>
            {sheet?.map((e) => (
              <>
                <h3>{e.Contact_Later}</h3>
              </>
            ))}
          </div>
          <div className="card">
            <p>Hot Leads</p>
            {sheet?.map((e) => (
              <>
                <h3>{e.Hot}</h3>
              </>
            ))}
          </div>
          <div className="card">
            <p>Meeting Done</p>
            {sheet?.map((e) => (
              <>
                <h3>{e.Meeting_Done}</h3>
              </>
            ))}
          </div>
          <div className="card">
            <p id="para2">Meeting Scheduled </p>
            {sheet?.map((e) => (
              <>
                <h3>{e.Meeting_Scheduled}</h3>
              </>
            ))}
          </div>
          <div className="card">
            <p>Meeting Re-scheduled </p>
            {sheet?.map((e) => (
              <>
                <h3>{e.Meeting_Re_scheduled}</h3>
              </>
            ))}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filterData}
          className="table"
          pagination
          paginationAlign="bottom"
          selectableRows
          fixedHeader
          fixedHeaderScrollHeight="490px"
          highlightOnHover
          subHeader
          subHeaderAlign="right"
          customStyles={customStyles}
        />
      </div>
    </>
  );
}

export default App;
