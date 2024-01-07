// connect出额外点
// 切换不出去  useeffect导致的
// id有问题
// 右键菜单位置不对
// 用curS 位置未实时更新
// 无选中回复空


  import React, { useCallback, useEffect, useRef, useState } from 'react';
  import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Panel,
  useOnSelectionChange,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  MarkerType,
  Background,
  MiniMap, Controls
} from 'reactflow';
  import 'reactflow/dist/style.css';
  import Sside_bar from 'src/paint/Sside_bar.js';
  import Show_group from './show_group';
import ContextMenu from '../pages/ContextMenu';
import { icons as reactFlowBounds } from 'antd/lib/image/PreviewGroup';
import { getMonth } from 'date-fns';
import { Col, Input, Modal, Row, Select } from 'antd';
import * as tag2Options from 'react-bootstrap/ElementChildren';
import * as tag1Options from 'react-bootstrap/ElementChildren';

import { blue } from '@mui/material/colors';
import { duration } from '@mui/material';
import { color, fontFamily, fontStyle } from '@mui/system';


  // 若有额外属性add处也得改
  const initialNodes = [
    {
      id: `100`,
      type: 'input',
      data: { label: '开始' },
      position: { x: 0, y: 50 },
      dd:45125,
      model: 0,
      sourcePosition: 'bottom', // 拖出点在底部
      targetPosition: 'top',    // 接入点在顶部
    },
    {
      id: `1847`,
      type: 'output',
      data: { label: '结束' },
      position: { x: 0, y: 100 },
      dd:45125,
      model: 0,
      sourcePosition: 'bottom', // 拖出点在底部
      targetPosition: 'top',    // 接入点在顶部
    },
    {
      id: `9`,
      // type: 'input',
      data: { label: '分支', money: 666 },
      position: { x: 110, y: 150 },
      dd:45124225,
      model: 1,
      sourcePosition: 'bottom', // 拖出点在底部
      targetPosition: 'top',    // 接入点在顶部
    },

  ];

  const initialEdges = [
    // {
    //   id: '0->1',
    //   source: '0',
    //   target: '1',
    //   markerEnd: {
    //     type: MarkerType.ArrowClosed,
    //     width: 20,
    //     height: 20,
    //     color: '#FF0072',
    //   },
    //   label: 'marker size and color',
    //   style: {
    //     strokeWidth: 2,
    //     stroke: '#FF0072',
    //   },
    //
    // },
  ];


const AddNodeOnEdgeDrop = () => {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { project } = useReactFlow();
    const [rfInstance, setRfInstance] = useState(null);
    const [selectedNodeIds, setSelectedNodeIds] = useState([]);
    const [selectedNodePos, setSelectedNodePos] = useState([]);
    const [CurSelect, setCurSelect] = useState([]);
    const [curId, setCurId] = useState(1);
    const [connectPreNode, setconnectPreNode] = useState([]);
    let id = 0;
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const getId = () => `dndnode_${id++}`;
    const [menu, setMenu] = useState(null);
    const ref = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentId, setCurrentId]=useState(0);
    const { setViewport, zoomIn, zoomOut } = useReactFlow();
  const minimapStyle = {
    height: 120,

  };
    const [newData, setNewData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    address: '',
    tags: [],
    createdAt: new Date().toLocaleString(),
    tag1: '',
    tag2: '',

   });

    function generateUniqueId() {
      setCurrentId(currentId+1);
      return currentId.toString();
    }

    const onNodesDelete = useCallback(
      (deleted) => {
        // console.log("380 setedges")
        setEdges(
          deleted.reduce((acc, node) => {

            const incomers = getIncomers(node, nodes, edges);
            const outgoers = getOutgoers(node, nodes, edges);
            const connectedEdges = getConnectedEdges([node], edges);

            const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

            const createdEdges = incomers.flatMap(({ id: source }) =>
              outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
            );

            return [...remainingEdges, ...createdEdges];
          }, edges)
        );
      },
      [nodes, edges]
    );



      const onConnect = useCallback(
        (params) => {
          console.log("onConnect");

          console.log("412Params:", JSON.stringify(params, null, 2));
          // setEdges((eds) => addEdge(params, eds))
            console.log("model 为0");
            setEdges((eds) =>
              eds.concat({ id:`random_${new Date()}`, source: params.source, target: params.target, markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: '#00FF00',
                },

                label: '执行连接, 立刻更新覆盖此字段',
                style: {
                  strokeWidth: 2,
                  stroke: '#00FF00',
                }}),
            );




        },
        []
      );

    const onConnectStart = useCallback((_, { nodeId }) => {
      console.log("onConnectStart" + nodeId );
      connectingNodeId.current = nodeId;
    }, []);




    const onConnectEnd = useCallback(

      (event) => {
        console.log("onConnectEnd------进入");
        const targetIsPane = event.target.classList.contains('react-flow__pane');
        console.log("431 nodes length = " + nodes.length);
        if (targetIsPane) {
          console.log("inininin");
          // we need to remove the wrapper bounds, in order to get the correct position
          const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
          const id = `randomnode_${+new Date()}`;
          const newNode = {
            id,
            position: project({
              x: event.clientX - left,
              y: event.clientY - top,

            }),
            // data: { label: `Node ${id}` },
            data: { label: `事件结点` },
            origin: [0.5, 0.0],
            model:  0,
          };
          console.log("451 setnode");

          setNodes((nds) => nds.concat(newNode));
          // console.log("139" + connectingNodeId.current);
          // model?

        console.log("456");
        console.log("connectingNodeId.current = " +  connectingNodeId.current);
        console.log("456 nodes length = " + nodes.length);
        console.log("458");
        console.log("所有node " + nodes);
          const connectingNode = nodes.find((node) => node.id === connectingNodeId.current);
          console.log("---------------------------connectingNode model =" + connectingNode.id);

          if (connectingNode && connectingNode.model === 1) {
            console.log("model 为 1");
            setEdges((eds) =>
              eds.concat({ id, source: connectingNodeId.current, target: id, markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: '#FF0072',

                },

                label: '选择其一',
                style: {
                  strokeWidth: 2,
                  stroke: '#FF0072',
                }}),
            );
          } else if (connectingNode && connectingNode.model === 0) {
            console.log("model 为0");
            setEdges((eds) =>
              eds.concat({ id, source: connectingNodeId.current, target: id, markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 20,
                  height: 20,
                  color: '#00FF00',
                },

                label: ' ',
                style: {
                  strokeWidth: 2,
                  stroke: '#00FF00',
                }}),
            );
          } else{
            console.log("model乱写？");
          }

        }
        console.log("onConnectEnd------退出");
      },
      [project, nodes,edges],
    );

    const onAdd = useCallback(() => {
      console.log("onadd--------------");
      const newNode = {


        id: `random_${new Date()}`,
        // id: `randomnode_${+new Date()}`,
        data: { label: '默认结点' },
        position: {
          x: Math.random() * window.innerWidth - 100,
          y: Math.random() * window.innerHeight,
        },
        dd:52525,
        model: 0,
      };

      console.log("开始setNodes -");
      setNodes((nds) => nds.concat(newNode));
      console.log("结束setNodes -")
    }, [setNodes]);

    const onSave2 = useCallback(() => {
      console.log(rfInstance);
      if (rfInstance) {
        const flow = rfInstance.toObject();
        const flowString = JSON.stringify(flow);
        console.log("保存的数据: ", flowString);

      }
    }, [rfInstance]);

    const testButton = useCallback(() => {
      console.log("生成编号 " + generateUniqueId());
    });

    // 左侧工具栏
    const hooks = {
      onAdd,
      onSave2,
      testButton,


      hook2: () => {
        console.log('钩子函数2被调用');
      },
    };

    // 维护边样式
    useEffect(() => {
      // 根据 source 节点的 model 值更新边的样式
      const updatedEdges = edges.map((edge) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        if (sourceNode) {
          const newEdge = { ...edge }; // 创建边的副本以避免直接修改原始边
          // 根据 source 节点的 model 值修改边的样式
          if (sourceNode.model === 1) {
            newEdge.markerEnd = {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: '#FF0072',
            };
            newEdge.animated=true;
            newEdge.label = '选择其一';
            newEdge.style = {
              strokeWidth: 2,
              stroke: '#FF0072',
            };
          } else if (sourceNode.model === 0) {
            newEdge.markerEnd = {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: '#00FF00',
            };
            newEdge.label = ' ';
            newEdge.style = {
              strokeWidth: 2,
              stroke: '#00FF00',
            };
          }
          return newEdge;
        }
        return edge;
      });

      // 更新边的样式
      setEdges(updatedEdges);
    }, [nodes, edges]);


    // 维护边的样式
    useEffect(() => {
      // 创建一个新的样式对象
      const updatedNodes = nodes.map((node) => {
        if (selectedNodeIds.includes(node.id)) {
          node.className = 'selected-node';
          setSelectedNodePos(node.position);
          setCurSelect(node);
        }else if(node.model ===1) {
          node.className = 'logic_node';
        } else{
          node.className = 'react-flow__node';
        }
        return node;
      });
      setNodes(updatedNodes);
    }, [selectedNodeIds, nodes]);





    const onSGChange = (sgData)=>{
      console.log("孩子传给父亲 + 615 " + JSON.stringify(sgData, null, 2));
      const updatedNodes = nodes.map((node) => {
        console.log("被选中："+ selectedNodeIds + "now" + node.id);
        if (sgData.id === node.id) {
          console.log("619 父 亲 收 到 信 息 正 在 找");
          // 对node 修改
          node.model = parseInt(sgData.newValue);
          console.log("被修改节点现在的信息为 " + JSON.stringify(node, null, 2));
        }else {

        }

        // 否则，保持原始样式
        return node;
      });


      // 更新节点状态
      setNodes(updatedNodes);

    };

    const handleSelectionChange = ({ nodes, edges }) => {
      const curNodeIds = nodes.map((node) => node.id);
      const selectedEdgeIds = edges.map((edge) => edge.id);
      setSelectedNodeIds(curNodeIds);

    };

    useOnSelectionChange({
      onChange: handleSelectionChange,
    });

    // 拖放， 未实现
    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
      (event) => {
        event.preventDefault();

        const type = event.dataTransfer.getData('application/reactflow');

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
        // and you don't need to subtract the reactFlowBounds.left/top anymore
        // details: https://reactflow.dev/whats-new/2023-11-10
        console.log("409 初始化" + reactFlowInstance);
        // 位置
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: 0.85 * (event.clientX - reactFlowBounds.left),
          y: 0.85 *  (event.clientY - reactFlowBounds.top)
        });
        const newNode = {
          id: `random_${new Date()}`,
          position,
          data: { label: `${type}` },
          model: 1,

          sourcePosition: 'bottom', // 拖出点在底部
          targetPosition: 'top',    // 接入点在顶部

        };

        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowInstance],
    );

    // const onNodeContextMenu = useCallback(
    //   (event, node) => {
    //     // Prevent native context menu from showing
    //     event.preventDefault();
    //
    //     // Calculate position of the context menu. We want to make sure it
    //     // doesn't get positioned off-screen.
    //     const pane = ref.current.getBoundingClientRect();
    //     setMenu({
    //       id: node.id,
    //       top: event.clientY < pane.height - 200 && event.clientY,
    //       left: event.clientX < pane.width - 200 && event.clientX,
    //       right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
    //       bottom:
    //         event.clientY >= pane.height - 200 && pane.height - event.clientY,
    //     });
    //   },
    //   [setMenu],
    // );
    const onNodeContextMenu = useCallback(
      (event, node) => {
        // Prevent native context menu from showing
        event.preventDefault();

        // Set the menu position based on the mouse click
        setMenu({
          id: node.id,
          top: event.clientY,
          left: event.clientX,
        });
      },
      [setMenu],
    );

    // Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => setMenu(null), [setMenu]);


    const onInit = (instance) => {
      setRfInstance(instance);
      setReactFlowInstance(instance);
    };

  const showModal = () => {
    setIsModalVisible(true);
    setNewData({
      firstName: '',
      lastName: '',
      age: '',
      address: '',
      tags: [],
      createdAt: new Date().toLocaleString(),
    });
  };
  //
  const handleOK = () =>{
    console.log("ant ok");
    setIsModalVisible(false);
  }
  const handleCancel = () =>{
    console.log("ant cancel");
    setIsModalVisible(false);
  }
  const handleTag1Change = () =>{
    console.log("ant handleTag1Change");
  }

  const handleTag2Change = () =>{
    console.log("ant handleTag2Change");
  }

  const sayhello = ()=>{
    console.log("hello");
  }

  function nodeColor(node) {
    switch (node.type) {
      case 'input':
        return '#6ede87';
      case 'output':
        return '#6865A5';
      default:
        return '#ff0072';
    }
  }


  return (


      <div className="wrapper" ref={reactFlowWrapper} style={{overflow:"hidden"}}>
        <Modal
          title="Add Data"
          visible={isModalVisible}
          onOk={handleOK}
          onCancel={handleCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <div style={{ marginBottom: '10px' }}>
            <span>Map Title:</span>
            <Input placeholder="Map Title" onChange={(e) => handleChange(e, 'firstName')} value={newData.firstName} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span>Creation Time:</span>
            <Input value={newData.createdAt} disabled />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <span>Explain:</span>
            <Input placeholder="Explain" onChange={(e) => handleChange(e, 'address')} value={newData.address} />
          </div>
          <div>
            <span>Tags:</span>
            <Row gutter={8}>
              <Col span={12}>
                <Select value={newData.tag1} onChange={handleTag1Change} style={{ width: '100%' }}>
                  {tag1Options.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col span={12}>
                <Select value={newData.tag2} onChange={handleTag2Change} style={{ width: '100%' }}>
                  {tag2Options.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </div>
        </Modal>

        <div style={{ height: '100%', width: '100%', display:"flex",flexDirection:"column", padding:0, margin:0 }}>
          {/*顶部菜单栏*/}
          <div className={'my_div'} style={{ height: '8%', width: '100%', display:"flex",flexDirection:"row", alignItems:"center", justifyContent: "center"}} >
            {/*<p style={{ fontFamily: 'KaiTi', fontWeight: 'bold' }}>面向多流程协同的云制造流程定制</p>*/}
            <p className={'headText'}>面向多流程协同的云制造流程定制</p>

          </div>

          <div style={{ height: '90%', width: '100%', display:"flex",flexDirection:"row", margin:0 }} >

            {/*左侧边工具栏*/}
            <div className={'my_div'} style={{height:'100%',width:'6%',flexDirection:'column', alignContent:'center'}}>

              <Sside_bar hooks={hooks}/>


              {/*<button onClick={onAdd} className={'side_button'}>Add one</button>*/}
              {/*<button className={'side_button'}></button>*/}
              {/*<button className={'side_button'}></button>*/}
              {/*<button className={'side_button'}></button>*/}
              {/*<button className={'side_button'}></button>*/}
              {/*<button className={'side_button'}></button>*/}

            </div>

            {/*显示主体  */}
            <div className={'my_div'} style={{height:'100%',width:'75%',margin:0}}>

              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesDelete={onNodesDelete}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                fitView
                // onInit={setReactFlowInstance}
                fitViewOptions={{ padding: 2 }}
                nodeOrigin={[0.5, 0]}
                onInit={onInit}
                onPaneClick={onPaneClick}
                onNodeContextMenu={onNodeContextMenu}
                onDrop={onDrop}
                onDragOver={onDragOver}
                ref={ref}
              >
                <Panel position={"top-center"}></Panel>
                {menu && <ContextMenu   showModal = {showModal}  onClick={onPaneClick} {...menu}  />}
                <MiniMap style={minimapStyle} position = 'bottom-right' nodeColor={nodeColor} zoomable pannable />
                <Controls  onZoomOut={() => zoomOut({ duration: 150 })} onZoomIn={() => zoomIn({ duration: 150 }) }/>
                <Background color="#ccc" gap={25} size ={3} />
            </ReactFlow>

            </div>

            {/*右侧信息栏*/}
            <div className={'my_div'} style={{height:'100%',width:'24%',flexDirection:'column', background:'white'}}>
              <div className={'my_div'} style={{height:'40%',width:'100%'}}>
              </div>
              <div className={'my_div'} style={{height:'60%',width:'100%',display:"flex", overflow:"hidden"}}>
                {/*<Show_group node_id ={selectedNodeIds} node_pos  = '点的位置'/>*/}
                {/*<Show_group node_id ={selectedNodeIds} node_pos  ={selectedNodePos} curS = {CurSelect} onSGChange = {onSGChange} />*/}
                <Show_group curS = {CurSelect} onSGChange = {onSGChange} />
              </div>

            </div>
          </div>

        </div>

      </div>

    );
  };

  export default () => (
    <ReactFlowProvider>
      <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
  );


















//
// // connect出额外点
// // 切换不出去
// // id有问题
// // 415位置不对
//
//
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import ReactFlow, {
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   useReactFlow,
//   ReactFlowProvider,
//   Panel,
//   useOnSelectionChange,
//   getIncomers,
//   getOutgoers,
//   getConnectedEdges,
//   MarkerType,
//   Background,
//   MiniMap
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import Sside_bar from 'src/paint/Sside_bar.js';
// import Show_group from './show_group';
// import ContextMenu from '../pages/ContextMenu';
// import { icons as reactFlowBounds } from 'antd/lib/image/PreviewGroup';
// import { getMonth } from 'date-fns';
// import { Col, Input, Modal, Row, Select } from 'antd';
// import * as tag2Options from 'react-bootstrap/ElementChildren';
// import * as tag1Options from 'react-bootstrap/ElementChildren';
//
//
// // 若有额外属性add处也得改
// const initialNodes = [
//   {
//     id: '99999',
//     // type: 'input',
//     data: { label: 'Node' },
//     position: { x: 0, y: 50 },
//     dd:45125,
//     model: 0,
//     sourcePosition: 'bottom', // 拖出点在底部
//     targetPosition: 'top',    // 接入点在顶部
//   },
//   {
//     id: '100000',
//     // type: 'input',
//
//     data: { label: 'Node', money: 666 },
//     position: { x: 110, y: 150 },
//     dd:45124225,
//     model: 1,
//     sourcePosition: 'bottom', // 拖出点在底部
//     targetPosition: 'top',    // 接入点在顶部
//   },
//
// ];
//
// const initialEdges = [
//   // {
//   //   id: '0->1',
//   //   source: '0',
//   //   target: '1',
//   //   markerEnd: {
//   //     type: MarkerType.ArrowClosed,
//   //     width: 20,
//   //     height: 20,
//   //     color: '#FF0072',
//   //   },
//   //   label: 'marker size and color',
//   //   style: {
//   //     strokeWidth: 2,
//   //     stroke: '#FF0072',
//   //   },
//   //
//   // },
// ];
//
//
// const AddNodeOnEdgeDrop = () => {
//   const reactFlowWrapper = useRef(null);
//   const connectingNodeId = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const { project } = useReactFlow();
//   const [rfInstance, setRfInstance] = useState(null);
//   const [selectedNodeIds, setSelectedNodeIds] = useState([]);
//   const [selectedNodePos, setSelectedNodePos] = useState([]);
//   const [CurSelect, setCurSelect] = useState([]);
//   const [curId, setCurId] = useState(1);
//   const [connectPreNode, setconnectPreNode] = useState([]);
//   let id = 0;
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);
//   const getId = () => `dndnode_${id++}`;
//   const [menu, setMenu] = useState(null);
//   const ref = useRef(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentId, setCurrentId]=useState(0);
//   const minimapStyle = {
//     height: 120,
//   };
//   const [newData, setNewData] = useState({
//     firstName: '',
//     lastName: '',
//     age: '',
//     address: '',
//     tags: [],
//     createdAt: new Date().toLocaleString(),
//     tag1: '',
//     tag2: '',
//
//   });
//
//   function generateUniqueId() {
//     setCurrentId(currentId+1);
//     return currentId.toString();
//   }
//
//   const onNodesDelete = useCallback(
//     (deleted) => {
//       // console.log("380 setedges")
//       setEdges(
//         deleted.reduce((acc, node) => {
//
//           const incomers = getIncomers(node, nodes, edges);
//           const outgoers = getOutgoers(node, nodes, edges);
//           const connectedEdges = getConnectedEdges([node], edges);
//
//           const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));
//
//           const createdEdges = incomers.flatMap(({ id: source }) =>
//             outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
//           );
//
//           return [...remainingEdges, ...createdEdges];
//         }, edges)
//       );
//     },
//     [nodes, edges]
//   );
//
//
//
//   const onConnect = useCallback(
//     (params) => {
//       console.log("onConnect");
//
//       console.log("412Params:", JSON.stringify(params, null, 2));
//       // setEdges((eds) => addEdge(params, eds))
//
//
//
//       console.log("model 为0");
//       setEdges((eds) =>
//         eds.concat({ id:generateUniqueId(), source: params.source, target: params.target, markerEnd: {
//             type: MarkerType.ArrowClosed,
//             width: 20,
//             height: 20,
//             color: '#00FF00',
//           },
//
//           label: '选择其一',
//           style: {
//             strokeWidth: 2,
//             stroke: '#00FF00',
//           }}),
//       );
//
//
//
//
//     },
//     []
//   );
//
//   const onConnectStart = useCallback((_, { nodeId }) => {
//     console.log("onConnectStart" + nodeId );
//     connectingNodeId.current = nodeId;
//   }, []);
//
//
//   const onConnectEnd = useCallback(
//
//     (event) => {
//       console.log("onConnectEnd------进入");
//       const targetIsPane = event.target.classList.contains('react-flow__pane');
//       console.log("431 nodes length = " + nodes.length);
//       if (targetIsPane) {
//         console.log("inininin");
//         // we need to remove the wrapper bounds, in order to get the correct position
//         const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
//         const id = `randomnode_${+new Date()}`;
//         const newNode = {
//           id,
//           position: project({
//             x: event.clientX - left,
//             y: event.clientY - top,
//
//           }),
//           data: { label: `Node ${id}` },
//           origin: [0.5, 0.0],
//           model:  1,
//         };
//         console.log("451 setnode");
//
//         setNodes((nds) => nds.concat(newNode));
//         // console.log("139" + connectingNodeId.current);
//         // model?
//
//         console.log("456");
//         console.log("connectingNodeId.current = " +  connectingNodeId.current);
//         console.log("456 nodes length = " + nodes.length);
//         console.log("458");
//         console.log("所有node " + nodes);
//         const connectingNode = nodes.find((node) => node.id === connectingNodeId.current);
//         console.log("---------------------------connectingNode model =" + connectingNode.id);
//
//         if (connectingNode && connectingNode.model === 1) {
//           console.log("model 为 1");
//           setEdges((eds) =>
//             eds.concat({ id, source: connectingNodeId.current, target: id, markerEnd: {
//                 type: MarkerType.ArrowClosed,
//                 width: 20,
//                 height: 20,
//                 color: '#FF0072',
//               },
//
//               label: '选择其一',
//               style: {
//                 strokeWidth: 2,
//                 stroke: '#FF0072',
//               }}),
//           );
//         } else if (connectingNode && connectingNode.model === 0) {
//           console.log("model 为0");
//           setEdges((eds) =>
//             eds.concat({ id, source: connectingNodeId.current, target: id, markerEnd: {
//                 type: MarkerType.ArrowClosed,
//                 width: 20,
//                 height: 20,
//                 color: '#00FF00',
//               },
//
//               label: '选择其一',
//               style: {
//                 strokeWidth: 2,
//                 stroke: '#00FF00',
//               }}),
//           );
//         } else{
//           console.log("model乱写？");
//         }
//
//       }
//       console.log("onConnectEnd------退出");
//     },
//     [project, nodes,edges],
//   );
//
//   const onAdd = useCallback(() => {
//     console.log("onadd--------------");
//     const newNode = {
//
//
//       id: `random_${new Date()}`,
//       // id: `randomnode_${+new Date()}`,
//       data: { label: 'Added node' },
//       position: {
//         x: Math.random() * window.innerWidth - 100,
//         y: Math.random() * window.innerHeight,
//       },
//       dd:52525,
//       model: 0,
//     };
//
//     console.log("开始setNodes -");
//     setNodes((nds) => nds.concat(newNode));
//     console.log("结束setNodes -")
//   }, [setNodes]);
//
//   const onSave2 = useCallback(() => {
//     console.log(rfInstance);
//     if (rfInstance) {
//       const flow = rfInstance.toObject();
//       const flowString = JSON.stringify(flow);
//       console.log("保存的数据: ", flowString);
//
//     }
//   }, [rfInstance]);
//
//   const testButton = useCallback(() => {
//     console.log("生成编号 " + generateUniqueId());
//   });
//
//   // 左侧工具栏
//   const hooks = {
//     onAdd,
//     onSave2,
//     testButton,
//
//
//     hook2: () => {
//       console.log('钩子函数2被调用');
//     },
//   };
//
//   useEffect(() => {
//     // 根据 source 节点的 model 值更新边的样式
//     const updatedEdges = edges.map((edge) => {
//       const sourceNode = nodes.find((node) => node.id === edge.source);
//       if (sourceNode) {
//         const newEdge = { ...edge }; // 创建边的副本以避免直接修改原始边
//         // 根据 source 节点的 model 值修改边的样式
//         if (sourceNode.model === 1) {
//           newEdge.markerEnd = {
//             type: MarkerType.ArrowClosed,
//             width: 20,
//             height: 20,
//             color: '#FF0072',
//           };
//           newEdge.style = {
//             strokeWidth: 2,
//             stroke: '#FF0072',
//           };
//         } else if (sourceNode.model === 0) {
//           newEdge.markerEnd = {
//             type: MarkerType.ArrowClosed,
//             width: 20,
//             height: 20,
//             color: '#00FF00',
//           };
//           newEdge.style = {
//             strokeWidth: 2,
//             stroke: '#00FF00',
//           };
//         }
//         return newEdge;
//       }
//       return edge;
//     });
//
//     // 更新边的样式
//     setEdges(updatedEdges);
//   }, [nodes, edges]);
//
//
//   useEffect(() => {
//     // 创建一个新的样式对象
//     const updatedNodes = nodes.map((node) => {
//       // console.log("被选中："+ selectedNodeIds + "now" + node.id);
//
//       if (selectedNodeIds.includes(node.id)) {
//         // console.log("jinle");
//         // 对node 修改
//         node.className = 'selected-node';
//         // update Pos
//         setSelectedNodePos(node.position);
//
//         // curSelect
//         setCurSelect(node);
//
//         // 594 被选中对象的信息
//         // console.log("alallalalalal595 " + JSON.stringify(CurSelect, null, 2));
//       }else {
//         node.className = '.react-flow__node';
//       }
//
//       // 否则，保持原始样式
//       return node;
//     });
//
//
//     // 更新节点状态
//     setNodes(updatedNodes);
//   }, [selectedNodeIds, nodes]);
//
//
//
//   const onSGChange = (sgData)=>{
//     console.log("孩子传给父亲 + 615 " + JSON.stringify(sgData, null, 2));
//     const updatedNodes = nodes.map((node) => {
//       console.log("被选中："+ selectedNodeIds + "now" + node.id);
//       if (sgData.id === node.id) {
//         console.log("619 父 亲 收 到 信 息 正 在 找");
//         // 对node 修改
//         node.model = parseInt(sgData.newValue);
//         console.log("被修改节点现在的信息为 " + JSON.stringify(node, null, 2));
//       }else {
//
//       }
//
//       // 否则，保持原始样式
//       return node;
//     });
//
//
//     // 更新节点状态
//     setNodes(updatedNodes);
//
//   };
//
//   const handleSelectionChange = ({ nodes, edges }) => {
//     const curNodeIds = nodes.map((node) => node.id);
//     const selectedEdgeIds = edges.map((edge) => edge.id);
//     setSelectedNodeIds(curNodeIds);
//
//   };
//
//   useOnSelectionChange({
//     onChange: handleSelectionChange,
//   });
//
//   // 拖放， 未实现
//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
//   }, []);
//
//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();
//
//       const type = event.dataTransfer.getData('application/reactflow');
//
//       // check if the dropped element is valid
//       if (typeof type === 'undefined' || !type) {
//         return;
//       }
//
//       // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
//       // and you don't need to subtract the reactFlowBounds.left/top anymore
//       // details: https://reactflow.dev/whats-new/2023-11-10
//       console.log("409 初始化" + reactFlowInstance);
//       // 位置
//       const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//       const position = reactFlowInstance.project({
//         x: 0.85 * (event.clientX - reactFlowBounds.left),
//         y: 0.85 *  (event.clientY - reactFlowBounds.top)
//       });
//
//
//
//       const newNode = {
//         id: getId(),
//         position,
//         data: { label: `${type} node` },
//         model: 1,
//
//         sourcePosition: 'bottom', // 拖出点在底部
//         targetPosition: 'top',    // 接入点在顶部
//
//
//
//
//       };
//
//       setNodes((nds) => nds.concat(newNode));
//     },
//     [reactFlowInstance],
//   );
//
//   // const onNodeContextMenu = useCallback(
//   //   (event, node) => {
//   //     // Prevent native context menu from showing
//   //     event.preventDefault();
//   //
//   //     // Calculate position of the context menu. We want to make sure it
//   //     // doesn't get positioned off-screen.
//   //     const pane = ref.current.getBoundingClientRect();
//   //     setMenu({
//   //       id: node.id,
//   //       top: event.clientY < pane.height - 200 && event.clientY,
//   //       left: event.clientX < pane.width - 200 && event.clientX,
//   //       right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
//   //       bottom:
//   //         event.clientY >= pane.height - 200 && pane.height - event.clientY,
//   //     });
//   //   },
//   //   [setMenu],
//   // );
//   const onNodeContextMenu = useCallback(
//     (event, node) => {
//       // Prevent native context menu from showing
//       event.preventDefault();
//
//       // Set the menu position based on the mouse click
//       setMenu({
//         id: node.id,
//         top: event.clientY,
//         left: event.clientX,
//       });
//     },
//     [setMenu],
//   );
//
//   // Close the context menu if it's open whenever the window is clicked.
//   const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
//
//
//   const onInit = (instance) => {
//     setRfInstance(instance);
//     setReactFlowInstance(instance);
//   };
//
//   const showModal = () => {
//     setIsModalVisible(true);
//     setNewData({
//       firstName: '',
//       lastName: '',
//       age: '',
//       address: '',
//       tags: [],
//       createdAt: new Date().toLocaleString(),
//     });
//   };
//   //
//   const handleOK = () =>{
//     console.log("ant ok");
//     setIsModalVisible(false);
//   }
//   const handleCancel = () =>{
//     console.log("ant cancel");
//     setIsModalVisible(false);
//   }
//   const handleTag1Change = () =>{
//     console.log("ant handleTag1Change");
//   }
//
//   const handleTag2Change = () =>{
//     console.log("ant handleTag2Change");
//   }
//
//   const sayhello = ()=>{
//     console.log("hello");
//   }
//
//   return (
//
//
//     <div className="wrapper" ref={reactFlowWrapper} style={{overflow:"hidden"}}>
//       <Modal
//         title="Add Data"
//         visible={isModalVisible}
//         onOk={handleOK}
//         onCancel={handleCancel}
//         okText="Ok"
//         cancelText="Cancel"
//       >
//         <div style={{ marginBottom: '10px' }}>
//           <span>Map Title:</span>
//           <Input placeholder="Map Title" onChange={(e) => handleChange(e, 'firstName')} value={newData.firstName} />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <span>Creation Time:</span>
//           <Input value={newData.createdAt} disabled />
//         </div>
//         <div style={{ marginBottom: '10px' }}>
//           <span>Explain:</span>
//           <Input placeholder="Explain" onChange={(e) => handleChange(e, 'address')} value={newData.address} />
//         </div>
//         <div>
//           <span>Tags:</span>
//           <Row gutter={8}>
//             <Col span={12}>
//               <Select value={newData.tag1} onChange={handleTag1Change} style={{ width: '100%' }}>
//                 {tag1Options.map(option => (
//                   <Option key={option.value} value={option.value}>
//                     {option.label}
//                   </Option>
//                 ))}
//               </Select>
//             </Col>
//
//             <Col span={12}>
//               <Select value={newData.tag2} onChange={handleTag2Change} style={{ width: '100%' }}>
//                 {tag2Options.map(option => (
//                   <Option key={option.value} value={option.value}>
//                     {option.label}
//                   </Option>
//                 ))}
//               </Select>
//             </Col>
//           </Row>
//         </div>
//       </Modal>
//
//       <div style={{ height: '100%', width: '100%', display:"flex",flexDirection:"column", padding:0, margin:0 }}>
//         {/*顶部菜单栏*/}
//         <div className={'my_div'} style={{ height: '8%', width: '100%', display:"flex",flexDirection:"row" }} >
//
//         </div>
//
//         <div style={{ height: '90%', width: '100%', display:"flex",flexDirection:"row", margin:0 }} >
//
//           {/*左侧边工具栏*/}
//           <div className={'my_div'} style={{height:'100%',width:'6%',flexDirection:'column', alignContent:'center'}}>
//
//             <Sside_bar hooks={hooks}/>
//
//
//             {/*<button onClick={onAdd} className={'side_button'}>Add one</button>*/}
//             {/*<button className={'side_button'}></button>*/}
//             {/*<button className={'side_button'}></button>*/}
//             {/*<button className={'side_button'}></button>*/}
//             {/*<button className={'side_button'}></button>*/}
//             {/*<button className={'side_button'}></button>*/}
//
//           </div>
//
//           {/*显示主体  */}
//           <div className={'my_div'} style={{height:'100%',width:'75%',margin:0}}>
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodesDelete={onNodesDelete}
//               onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange}
//               onConnect={onConnect}
//               onConnectStart={onConnectStart}
//               onConnectEnd={onConnectEnd}
//               fitView
//               // onInit={setReactFlowInstance}
//               fitViewOptions={{ padding: 2 }}
//               nodeOrigin={[0.5, 0]}
//               onInit={onInit}
//               onPaneClick={onPaneClick}
//               onNodeContextMenu={onNodeContextMenu}
//               onDrop={onDrop}
//               onDragOver={onDragOver}
//               ref={ref}
//             />
//             {menu && <ContextMenu  showModal = {showModal}  onClick={onPaneClick} {...menu}  />}
//             <Panel position={"top-center"}></Panel>
//             <MiniMap style={minimapStyle} zoomable pannable />
//
//
//           </div>
//
//           {/*右侧信息栏*/}
//           <div className={'my_div'} style={{height:'100%',width:'24%',flexDirection:'column', background:'white'}}>
//             <div className={'my_div'} style={{height:'40%',width:'100%'}}>
//             </div>
//             <div className={'my_div'} style={{height:'60%',width:'100%',display:"flex", overflow:"hidden"}}>
//               {/*<Show_group node_id ={selectedNodeIds} node_pos  = '点的位置'/>*/}
//               {/*<Show_group node_id ={selectedNodeIds} node_pos  ={selectedNodePos} curS = {CurSelect} onSGChange = {onSGChange} />*/}
//               <Show_group curS = {CurSelect} onSGChange = {onSGChange} />
//             </div>
//
//           </div>
//         </div>
//
//       </div>
//
//     </div>
//
//   );
// };
//
// export default () => (
//   <ReactFlowProvider>
//     <AddNodeOnEdgeDrop />
//   </ReactFlowProvider>
// );
