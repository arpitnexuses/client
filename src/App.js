import './App.css';
import DataTable from "react-data-table-component"
import { useState, useEffect } from 'react';
import axios from 'axios'


function App() {
  const [select , setSelect] = useState();
  const [sheet, setSheet] = useState();
  const [filterRoom, setFilterRoom] = useState();

  const getData = async () => {
    try {
      const res = await axios.get('https://sheet.best/api/sheets/d8ad8973-e73c-4dd9-9e62-b8e7b49bd394')
      console.log(res.data)
      setSheet(res.data)
      setFilterRoom(res.data)
    } catch (error) {
      console.log(error);
    }



    // const target = "lost";
    // const lostcounter = 0; 
    // for (status in sheet ){
    //   if (sheet === target){
    //     lostcounter++
    //   }
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
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

  useEffect(() => {
    getData();
  }, []);


 
  // const handleSelectedSite=(status)=>{
  //   let aux = JSON.parse(JSON.stringify(sheet));
  //   if (status!==""){
  //     aux=aux.filter(row=>row.status === status)
  //     setFilterRoom=aux; 
  //   }
  // }
  useEffect(()=>{
    const result= sheet.filter(rooms => {
      return (rooms.status.toLowerCase().match(select.toLowerCase())
       )
      
    },
    
    )
    setFilterRoom(result);
  },[select])
  return (
    <>
    <div className="App">
     
     <select  type="select" onChange={(e)=>(e.target.value)}>
      <option>Status</option>
      <option 
      value="Hot">Hot</option> 
     <option value="Meeting Done">Meeting Done</option>
      <option value="Meeting Scheduled">Meeting Scheduled</option>
      <option value="Meeting Re-scheduled">Meeting Re-scheduled</option>
      <option value="Lost">Lost</option>
      <option value="Contact Later">Contact Later</option>
   </select>


      <div className="container">
        <div className="card">
          <p className='para'>Lost</p>
          {sheet?.map((e) => (
            <h3 className='num'>{e.Lost}</h3>
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



      <DataTable columns={columns} data={filterRoom} className="table"
        pagination
        paginationAlign="bottom"
        selectableRows
        fixedHeader
        fixedHeaderScrollHeight='490px'
        highlightOnHover
        subHeader
        subHeaderAlign='right'
      />

    </div>
    </>
  );
}

export default App;
