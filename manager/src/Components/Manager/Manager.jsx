import * as React from 'react';
import "./Manager.css"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Passwords from "./Passwords/Passwords"
import Docs from "./Docs/Docs"

export default function LabTabs() {
  const [value, setValue] = React.useState('1');


  return (
    <>
      <div className='manager'>
        <div className="navbar">
          <div className="buttons">
            <h1 onClick={() => setValue("1")} id={value == "1" && "active"}>Passwords</h1>
            <h1 onClick={() => setValue("2")} id={value == "2" && "active"}>Docs</h1>
          </div>
          <hr />
        </div>
        <div className="content">
          {value == "1" && <Passwords />}
          {value == "2" && <Docs />}
        </div>
      </div>
    </>
  );
}