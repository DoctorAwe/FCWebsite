import React from 'react';
import { Button, Flex } from 'antd';
import { FaCoffee, FaCode, FaCamera, FaMusic } from 'react-icons/fa';

import { Divider, Tooltip } from '@mui/material'; // 使用Font Awesome图标
import App1 from 'src/paint/App1.js';
// 或者
// import { AccessAlarm, ThreeDRotation, AlarmOn, AirplanemodeActive } from '@mui/icons-material'; // 使用Material Icons

const Toolbar = ({hooks}) => {

  return (
    <div className="toolbar" style={{display:"flex",flexDirection:"column", alignItems:"center",padding:'0px'}}>
      <Tooltip title="这是Add" placement="right" >
        <Button className="icon-button" onClick={hooks.onAdd}>
          <FaCoffee />
        </Button>
      </Tooltip>

      <Tooltip title="这是save" placement="right">
        <Button className="icon-button" onClick={hooks.onSave2}>
          <FaCode /> {/* 使用Font Awesome图标 */}
          {/* 或 */}
          {/* <ThreeDRotation /> 使用Material Icons */}
        </Button>
      </Tooltip>

      <Tooltip title="这是3" placement="right">
        <Button className="icon-button">
        <FaCamera /> {/* 使用Font Awesome图标 */}
        {/* 或 */}
        {/* <AlarmOn /> 使用Material Icons */}
        </Button>
      </Tooltip>

      <Tooltip title="这是4" placement="right">
        <Button className="icon-button">
        <FaMusic /> {/* 使用Font Awesome图标 */}
        {/* 或 */}
        {/* <AirplanemodeActive /> 使用Material Icons */}
        </Button>
      </Tooltip>

      <hr className="line"  />
    </div>
  );
};

export default Toolbar;
