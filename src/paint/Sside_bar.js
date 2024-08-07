import React from 'react';
import { Button, Flex } from 'antd';
import {
  FaCoffee,
  FaCode,
  FaCamera,
  FaMusic,
  FaEnvelope,
  FaCheck,
  FaStar,
  FaUser
} from 'react-icons/fa';

import { Divider, Tooltip } from '@mui/material'; // 使用Font Awesome图标
import App1 from 'src/paint/App1.js';
// 或者
// import { AccessAlarm, ThreeDRotation, AlarmOn, AirplanemodeActive } from '@mui/icons-material'; // 使用Material Icons

const Toolbar = ({hooks}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };



  return (
    <div className="toolbar" style={{display:"flex",flexDirection:"column", alignItems:"center",padding:'0px'}}>
      <Tooltip title="添加默认结点" placement="right" >
        <Button className="icon-button" onClick={hooks.onAdd}>
          <FaCoffee />
        </Button>
      </Tooltip>

      <Tooltip title="保存(见日志)" placement="right">
        <Button className="icon-button" onClick={hooks.onSave2}>
          <FaCode /> {/* 使用Font Awesome图标 */}
          {/* 或 */}
          {/* <ThreeDRotation /> 使用Material Icons */}
        </Button>
      </Tooltip>

      <Tooltip title="Button3(无效果)" placement="right">
        <Button className="icon-button" onClick={hooks.testButton}>
        <FaCamera /> {/* 使用Font Awesome图标 */}
        {/* 或 */}
        {/* <AlarmOn /> 使用Material Icons */}
        </Button>
      </Tooltip>

      <Tooltip title="Button4(无效果)" placement="right">
        <Button className="icon-button">
        <FaMusic /> {/* 使用Font Awesome图标 */}
        {/* 或 */}
        {/* <AirplanemodeActive /> 使用Material Icons */}
        </Button>
      </Tooltip>

      <hr className="line"  />

      <Tooltip title="拖入输入结点" placement="right">
        {/*<Button className="icon-button"  onDragStart={(event) => onDragStart(event, 'input')} draggable>*/}
          <Button className="icon-button"  onDragStart={(event) => onDragStart(event, '输入')} draggable>
            <FaEnvelope />
          {/* 或 */}
          {/* <AirplanemodeActive /> 使用Material Icons */}
        </Button>
      </Tooltip>
      <Tooltip title="拖入输出结点" placement="right" onDragStart={(event) => onDragStart(event, '输出')} draggable>
        <Button className="icon-button">
          <FaCheck />
          {/* 或 */}
          {/* <AirplanemodeActive /> 使用Material Icons */}
        </Button>
      </Tooltip>
      <Tooltip title="拖入循环结点" placement="right" onDragStart={(event) => onDragStart(event, '循环')} draggable>
        <Button className="icon-button">
          <FaStar />
          {/* 或 */}
          {/* <AirplanemodeActive /> 使用Material Icons */}
        </Button>
      </Tooltip>
      <Tooltip title="拖入第四类结点(暂无)" placement="right">
        <Button className="icon-button">
          <FaUser />
          {/* 或 */}
          {/* <AirplanemodeActive /> 使用Material Icons */}
        </Button>
      </Tooltip>

      <hr className="line"  />

    </div>
  );
};

export default Toolbar;
