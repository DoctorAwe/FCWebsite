// import ListGroup from 'react-bootstrap/ListGroup';
//
// import { useEffect } from 'react';
//
// import { alpha, styled } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
//
//
// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   'label + &': {
//     marginTop: theme.spacing(3),
//   },
//   '& .MuiInputBase-input': {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
//     border: '1px solid',
//     borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
//     fontSize: 16,
//     width: 'auto',
//     padding: '10px 12px',
//     transition: theme.transitions.create([
//       'border-color',
//       'background-color',
//       'box-shadow',
//     ]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));
// function DefaultExample( props ) {
//   const nodeId = props.node_id;
//   const nodePos = props.node_pos;
//   // useEffect(() => {
//   //   console.log("hh2-----------------");
//   // }, [nodeId]);
//
//   return (
//     <ListGroup>
//        <ListGroup.Item >{nodeId}</ListGroup.Item>
//        <ListGroup.Item >{nodePos}</ListGroup.Item>
//       <BootstrapInput defaultValue={nodeId} id="nId" />
//       <BootstrapInput defaultValue={nodePos} id="nPos" />
//       {/* 其他 ListGroup.Item */}
//     </ListGroup>
//   );
// }
//
//
//
// export default DefaultExample;
//

 // 2
//
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
// } from '@mui/x-data-grid-generator';
//
// export default function IsCellEditableGrid(props) {
//   const nodeId = props.node_id;
//   const nodePos = props.node_pos;
//   return (
//     <Box
//       sx={{
//         height: 400,
//         width: '100%',
//         '& .MuiDataGrid-cell--editable': {
//           bgcolor: (theme) =>
//             theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
//         },
//       }}
//     >
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         isCellEditable={(params) => params.row.age % 2 === 0}
//       />
//     </Box>
//   );
// }
//
// const columns = [
//   { field: 'label',
//     headerName: '属性名',
//     width: '50%',
//     editable: false
//   },
//
//   {
//     width: '50%',
//     field: 'value',
//     headerName: '值',
//     type: 'number',
//     editable: true,
//
//   }
// ];
//
// const rows = [
//   {
//     id:1,
//     label:'Node_Id',
//     value:'这是值'
//   }
//
//
//
// ];



import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { useEffect, useState } from 'react';



export default function IsCellEditableGrid(props) {
  const rows = [
    {
      id: 1,
      name: 'ID',
      age: props.curS && props.curS.id,
      editable: false
    },
    {
      id: 2,
      name: '位置',
      age: (props.curS && props.curS.position)
        ? JSON.stringify(props.curS.position.x, null, 0) + ", " + JSON.stringify(props.curS.position.y, null, 0)
        : " "
    },
    {
      id: 3,
      name: 'model',
      age: (props.curS && props.curS.model)
        ? JSON.stringify(props.curS.model, null, 0)
        : " ",
      editable: true
    }
  ];


  const columns = [
    { field: 'name',
      headerName: '属性',
      width: 180,
      sortable: false
    },
    {
      field: 'age',
      headerName: '值',
      type: 'number',
      align: 'left',
      headerAlign: 'center',
      editable: (params) => params.row.editable, // 设置可编辑状态
      sortable: false
    },

  ];

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
          backgroundColor:"pink"
        }}
    >
      <DataGrid

        style={{backgroundColor:'skyblue'}}
        rows={rows}
        columns={columns}
        hideFooterPagination={true}
      />
    </Box>
  );
}



