

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { useEffect, useState } from 'react';
import { GridRowParams } from '@mui/x-data-grid';



export default function IsCellEditableGrid(props) {
  // const [rows, setRows] =  useState([Initrows]);
  const rows = [
    {
      id: 1,
      name: 'ID',
      age: props.curS && props.curS.id,
    },
    {
      id: 2,
      name: '坐标',
      age: (props.curS && props.curS.position)
        ? JSON.stringify(props.curS.position.x, null, 0) + ", " + JSON.stringify(props.curS.position.y, null, 0)
        : null,

    },
    {
      id: 3,
      name: 'model',
      type: 'number',
      age: (props.curS && props.curS.model != null)
        ? JSON.stringify(props.curS.model, null, 0)
        : null,
    }
  ];


  const columns = [
    { field: 'name',
      headerName: '属性',
      sortable: false,
      flex:1,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'age',
      headerName: '值',
      type: 'string',
      align: 'center',
      headerAlign: 'center',
      editable: true,
      // editable: (params) => params.row.editable, // 设置可编辑状态
      sortable: false,
      width: 140,
      disableColumnMenu: true

    },

  ];


  const testhangdle = () =>{
    console.log("hh");
  };

  // SG更新后告知父组件
  const handleEdit = (params) =>{
    console.log("size = " + rows.length);
    const editValue = {
      id:  rows[0].age,
      name: params.name,
      newValue: params.age,
    }
    props.onSGChange(editValue);
  };

  const handleCellEditCommit = (params) => {
    console.log("zzzzzzzzzzzzzzzzzzzzzz");
  };

  // const handleRowUpdate = async (params) => {
  //   try {
  //     // 执行更新逻辑，比如将数据保存到后端
  //     await api.updateRow(params.id, { [params.field]: params.value });
  //
  //     // 处理更新成功
  //     console.log("Row updated successfully");
  //   } catch (error) {
  //     // 处理更新失败
  //     console.error("Error updating row", error);
  //   }
  // };

  return (
    <Box
        sx={{

          height: 400,
          width: '100%',
          '& .MuiDataGrid-cell--editable': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
          },
        }}
        style={{
          backgroundColor:"pink",

        }}
    >
      <DataGrid
        style={{backgroundColor:'skyblue'}}
        rows={rows}
        columns={columns}
        hideFooterPagination={true}
        processRowUpdate={handleEdit}
        onRowSelectionModelChange={testhangdle}
        isCellEditable={(params) => params.row.id === 3}
        onProcessRowUpdateError = {(err)=>{console.log(err)}}
        onCellEditCommit = {handleCellEditCommit }
      />
    </Box>
  );
}



