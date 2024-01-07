import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCellEditStopReasons, useGridApiRef } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { GridCellEditStopParams } from '@mui/x-data-grid';
import { MuiEvent } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
export default function IsCellEditableGrid(props) {
  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#9c6a7c',
      },
    },
  });
  const apiRef = useGridApiRef();
  const cellRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const ke = new KeyboardEvent('keydown', {
    bubbles: true, cancelable: true, keyCode: 27
  });

  const [currentId, setCurrentId]=useState(0.1);
  function generateUniqueId() {

    return currentId.toString();
  }

  const [rows, setRows] = useState([
    {
      id: 0,
      name: 'ID',
      age: props.curS && props.curS.id,
      editable: false
    },
    {
      id: 11,
      name: '坐标',
      age: (props.curS && props.curS.position)
        ? JSON.stringify(props.curS.position.x, null, 0) + ", " + JSON.stringify(props.curS.position.y, null, 0)
        : null,
      editable: false
    },
    // {
    //   id: 2,
    //   name: 'model',
    //   type: 'number',
    //   age: (props.curS && props.curS.model != null)
    //     ? JSON.stringify(props.curS.model, null, 0)
    //     : null,
    //   editable: true
    // },
    // {
    //   id: 3,
    //   name: 'model',
    //   type: 'number',
    //   age: (props.curS && props.curS.model != null)
    //     ? JSON.stringify(props.curS.model, null, 0)
    //     : null,
    //   editable: false
    // },
  ]);

  // function transformCurS(curS) {
  //
  //   const transformedList = Object.entries(curS.data).map(([key, value]) => ({
  //     id: generateUniqueId(),
  //     name: key,
  //     age: value,
  //     editable: false,
  //   }));
  //
  //   return transformedList;
  // }
  function transformCurS(curS) {
    if (!curS || !curS.data) {
      return [
        {
          id: generateUniqueId(),
          name: ' ',
          type: ' ',
          age: null,
          editable: true,
        },
      ];
    }


    const transformedList = [];
    const keys = Object.keys(curS.data);

    // keys.forEach((key, index) => {
    //   const value = curS.data[key];
    //   transformedList.push({
    //     id: curS.id + 0.01 * index,
    //     name: key,
    //     age: curS.data[key],
    //     editable: false,
    //   });
    // )

    keys.forEach((key, index) => {
      transformedList.push({
        id: curS.id + 0.01 * index,
        name: key,
        age: curS.data[key],
        editable: false,
      });
    });
    return transformedList;
  }


  // useEffect(() => {
  //
  //   console.log("传入的curs " + JSON.stringify(props.curS, null, 2));
  //   console.log(transformCurS(props.curS));
  //   // setRows(transformCurS(props.curS));
  //   setRows(transformCurS(props.curS));
  //
  // }, [props.curS.id]);


  // useEffect(() => {
  //   console.log("传入的curs " + JSON.stringify(props.curS, null, 2));
  //   const transformedList = transformCurS(props.curS);
  //   setRows((prevRows) => [
  //     ...prevRows.slice(0, 2), // 保持前两项不变
  //     ...transformedList, // 将 transformCurS 返回的数据覆盖第三行及以后的项
  //   ]);
  //   console.log("追加完后 " + JSON.stringify(rows, null, -10));
  // }, [props.curS.id]);

  useEffect(() => {
    console.log("传入的curs " + JSON.stringify(props.curS, null, 2));
    const transformedList = transformCurS(props.curS);
    setRows((prevRows) => [
      {
        id: 0,
        name: 'ID',
        age: props.curS && props.curS.id,
        editable: false
      },
      {
        id: 11,
        name: '坐标',
        age: (props.curS && props.curS.position)
          ? JSON.stringify(props.curS.position.x, null, 0) + ", " + JSON.stringify(props.curS.position.y, null, 0)
          : null,
        editable: false
      },
      {
        id: 3,
        name: 'model',
        type: 'number',
        age: (props.curS && props.curS.model != null)
          ? JSON.stringify(props.curS.model, null, 0)
          : null,
        editable: true
      },
      ...transformedList, // 从第三行开始使用 transformCurS 返回的数据
    ]);
  }, [props.curS.id]);

  const columns = [
    { field: 'name',
      headerName: '属性',
      sortable: true,
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
    console.log("加完了");
    console.log("size = " + rows.length);
    const editValue = {
      id:  rows[0].age,
      name: params.name,
      newValue: params.age,
    }
    props.onSGChange(editValue);
    console.log(JSON.stringify(props.curS.data, null, 2));


  };

  const testStop = ()=>{
    console.log("99999999999999999999");
  }


  return (
    <ThemeProvider theme={theme}>
    <Box
        sx={{

          height: 400,
          width: '100%',
          '& .MuiDataGrid-cell--editable': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#376331' : 'lightgray',
          },
        }}
    >

      <DataGrid

        rows={rows}
        columns={columns}
        hideFooterPagination={true}
        processRowUpdate={handleEdit}
        onRowSelectionModelChange={testhangdle}
        // isCellEditable={(params) => params.row.id === 3}
        isCellEditable={(params) => params.row.editable}
        onProcessRowUpdateError = {(err)=>{console.log(err)}}
        onRowEditStop={testStop}
        onRowEditCommit={testStop}
        onCellEditStop={(params, event) => {
          console.log("结束编辑");

          // 按下ESC退出编辑状态
        }}
      />
    </Box>
    </ThemeProvider>
  );
}



