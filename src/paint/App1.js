
  import React, { useCallback, useEffect, useRef, useState } from 'react';

  import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    Panel, useOnSelectionChange, getIncomers, getOutgoers, getConnectedEdges, MarkerType
  } from 'reactflow';
  import 'reactflow/dist/style.css';
  import Sside_bar from 'src/paint/Sside_bar.js';
  import Show_group from './show_group';
  import ServiceProviderListComponent from './ServiceProviderListComponent';
  import ServiceProviderDetailComponent from './ServiceProviderDetailComponent';


  // 若有额外属性add处也得改
  const initialNodes = [
    {
      id: '0',
      // type: 'input',
      data: { label: 'Node' },
      position: { x: 0, y: 50 },
      dd:45125,
      model: 0,
      provider_id:null,
    },
    {
      id: '1',
      // type: 'input',

      data: { label: 'Node' },
      position: { x: 110, y: 150 },
      dd:45125,
      model: 1,
      provider_id:null,
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

  const flowKey = 'example-flow';
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

    // useEffect(() => {
    //    console.log("380 点个数" + nodes.length);
    // }, [nodes]);

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
        setEdges((eds) => addEdge(params, eds))

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
            data: { label: `Node ${id}` },
            origin: [0.5, 0.0],
            model:  1,
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

                label: '选择其一',
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
      [project, nodes],
    );

    const onAdd = useCallback(() => {
      console.log("onadd--------------");
      const newNode = {

        id: `randomnode_${+new Date()}`,
        data: { label: 'Added node' },
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

    const hooks = {
      onAdd,
      onSave2,
      hook2: () => {
        console.log('钩子函数2被调用');
      },
    };

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


    useEffect(() => {
      // 创建一个新的样式对象
      const updatedNodes = nodes.map((node) => {
        // console.log("被选中："+ selectedNodeIds + "now" + node.id);
        if (selectedNodeIds.includes(node.id)) {
          // console.log("jinle");
          // 对node 修改
          node.className = 'selected-node';
          // update Pos
          setSelectedNodePos(node.position);

          // curSelect
          setCurSelect(node);

          // 594 被选中对象的信息
          // console.log("alallalalalal595 " + JSON.stringify(CurSelect, null, 2));
        }else {
          node.className = '.react-flow__node';
        }

        // 否则，保持原始样式
        return node;
      });


      // 更新节点状态
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

    const [selectedProvider, setSelectedProvider] = useState(null);

    const serviceProviders = [{ "name":"provider1","id":0 }, { "name":"provider2","id":2 }, { "name":"provider3","id":1 },]; // 示例服务商列表

    const handleProviderClick = (provider) => {
      // todo judge if current node is None
      if(CurSelect.length != 0){
        console.log(CurSelect)
      setSelectedProvider(provider);}
    };

    const handleBackClick = () => {

      setSelectedProvider(null);
    };
    const handleConfirmClick = (selectedProvider) => {
      // todo set this provider for current node, to complement this, you might to set a global var for now selected provider,and when the code run to here,set this var for current node.

      CurSelect.provider = selectedProvider.id;
      setCurSelect(CurSelect)
      console.log(CurSelect.provider)
      setSelectedProvider(null);
    };

    return (


      <div className="wrapper" ref={reactFlowWrapper} style={{overflow:"hidden"}}>
        <div style={{ height: '100%', width: '100%', display:"flex",flexDirection:"column", padding:0, margin:0 }}>
          {/*顶部菜单栏*/}
          <div className={'my_div'} style={{ height: '8%', width: '100%', display:"flex",flexDirection:"row" }} >

          </div>

          <div style={{ height: '90%', width: '100%', display:"flex",flexDirection:"row", backgroundColor:"yellow", margin:0 }} >

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

                fitViewOptions={{ padding: 2 }}
                nodeOrigin={[0.5, 0]}
                onInit={setRfInstance}
              />
              <Panel position={"top-center"}></Panel>
            </div>

            {/*右侧信息栏*/}
            <div className={'my_div'} style={{height:'100%',width:'24%',flexDirection:'column', background:'white'}}>
              <div className={'my_div'} style={{height:'40%',width:'100%', backgroundColor: "pink"}}>
                {selectedProvider ? (
                  // eslint-disable-next-line react/jsx-no-undef
                  <ServiceProviderDetailComponent
                    selectedProvider={selectedProvider}
                    onBackClick={handleBackClick}
                    onConfirmClick={handleConfirmClick}
                  />
                ) : (
                  <ServiceProviderListComponent
                    serviceProviders={serviceProviders}
                    onProviderClick={handleProviderClick}
                  />
                )}
              </div>
              <div className={'my_div'} style={{height:'60%',width:'100%',display:"flex", overflow:"hidden"}}>
                {/*<Show_group node_id ={selectedNodeIds} node_pos  = '点的位置'/>*/}
                <Show_group node_id ={selectedNodeIds} node_pos  ={selectedNodePos} curS = {CurSelect} onSGChange = {onSGChange} />

                {/*<Show_group curS = {CurSelect} />*/}
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












  // eslint-disable-next-line react-hooks/rules-of-hooks




  //
  //
  // import React, { useCallback, useEffect, useRef, useState } from 'react';
  // import ReactFlow, {
  //   useNodesState,
  //   useEdgesState,
  //   addEdge,
  //   useReactFlow,
  //   ReactFlowProvider,
  //   Panel, useOnSelectionChange, getIncomers, getOutgoers, getConnectedEdges, MarkerType
  // } from 'reactflow';
  // import 'reactflow/dist/style.css';
  // import Sside_bar from 'src/paint/Sside_bar.js';
  // import Show_group from './show_group';
  //
  //
  // // 若有额外属性add处也得改
  // const initialNodes = [
  //   {
  //     id: '0',
  //     // type: 'input',
  //     data: { label: 'Node' },
  //     position: { x: 0, y: 50 },
  //     dd:45125,
  //     model: '0'
  //   },
  //   {
  //     id: '1',
  //     // type: 'input',
  //
  //     data: { label: 'Node' },
  //     position: { x: 110, y: 150 },
  //     dd:45125,
  //     model: '1'
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
  // const flowKey = 'example-flow';
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
  //
  //   useEffect(() => {
  //     console.log("380 点个数" + nodes.length);
  //   }, [nodes]);
  //
  //   const onNodesDelete = useCallback(
  //     (deleted) => {
  //       console.log("380 setedges")
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
  //       setEdges((eds) => addEdge(params, eds))
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
  //           model: '1',
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
  //         if (connectingNode && connectingNode.model === '1' || connectingNode && connectingNode.model === '\"1\"') {
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
  //         } else if (connectingNode && connectingNode.model === '0'|| connectingNode && connectingNode.model === '\"0\"') {
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
  //         // if( nodes.find((node) => node.id === connectingNodeId.current).model === 1)
  //         // {
  //         //   console.log("model 为 1");
  //         //   setEdges((eds) =>
  //         //     eds.concat({ id, source: connectingNodeId.current, target: id, markerEnd: {
  //         //         type: MarkerType.ArrowClosed,
  //         //         width: 20,
  //         //         height: 20,
  //         //         color: '#FF0072',
  //         //       },
  //         //
  //         //       label: '选择其一',
  //         //       style: {
  //         //         strokeWidth: 2,
  //         //         stroke: '#FF0072',
  //         //       }}),
  //         //   );
  //         // }
  //         // else{
  //         //   console.log("model 为0");
  //         //   setEdges((eds) =>
  //         //     eds.concat({ id, source: connectingNodeId.current, target: id, markerEnd: {
  //         //         type: MarkerType.ArrowClosed,
  //         //         width: 20,
  //         //         height: 20,
  //         //         color: '#00FF00',
  //         //       },
  //         //
  //         //       label: '选择其一',
  //         //       style: {
  //         //         strokeWidth: 2,
  //         //         stroke: '#00FF00',
  //         //       }}),
  //         //   );
  //         // }
  //
  //       }
  //       console.log("onConnectEnd------退出");
  //     },
  //     [project, nodes],
  //   );
  //
  //
  //
  //
  //
  //   const onAdd = useCallback(() => {
  //     console.log("onadd--------------");
  //     const newNode = {
  //
  //       id: `randomnode_${+new Date()}`,
  //       data: { label: 'Added node' },
  //       position: {
  //         x: Math.random() * window.innerWidth - 100,
  //         y: Math.random() * window.innerHeight,
  //       },
  //       dd:52525,
  //       model:'0',
  //     };
  //
  //
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
  //   const hooks = {
  //     onAdd,
  //     onSave2,
  //     hook2: () => {
  //       console.log('钩子函数2被调用');
  //     },
  //   };
  //
  //   useEffect(() => {
  //     console.log("22");
  //     // 创建一个新的样式对象
  //     const updatedNodes = nodes.map((node) => {
  //       console.log("被选中："+ selectedNodeIds + "now" + node.id);
  //       if (selectedNodeIds.includes(node.id)) {
  //         console.log("jinle");
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
  //   }, [selectedNodeIds]);
  //
  //   const onSGChange = (sgData)=>{
  //     console.log("孩子传给父亲 + 615 " + JSON.stringify(sgData, null, 2));
  //     const updatedNodes = nodes.map((node) => {
  //       console.log("被选中："+ selectedNodeIds + "now" + node.id);
  //       if (sgData.id.includes(node.id)) {
  //         console.log("619 父 亲 收 到 信 息 正 在 找");
  //         // 对node 修改
  //         node.model = sgData.newValue;
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
  //
  //
  //
  //
  //   const handleSelectionChange = ({ nodes, edges }) => {
  //     const curNodeIds = nodes.map((node) => node.id);
  //     const selectedEdgeIds = edges.map((edge) => edge.id);
  //     setSelectedNodeIds(curNodeIds);
  //
  //   };
  //
  //
  //
  //
  //   useOnSelectionChange({
  //     onChange: handleSelectionChange,
  //   });
  //
  //
  //
  //
  //
  //   return (
  //
  //
  //     <div className="wrapper" ref={reactFlowWrapper} style={{overflow:"hidden"}}>
  //       <div style={{ height: '100%', width: '100%', display:"flex",flexDirection:"column", padding:0, margin:0 }}>
  //         {/*顶部菜单栏*/}
  //         <div className={'my_div'} style={{ height: '8%', width: '100%', display:"flex",flexDirection:"row" }} >
  //
  //         </div>
  //
  //         <div style={{ height: '90%', width: '100%', display:"flex",flexDirection:"row", backgroundColor:"yellow", margin:0 }} >
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
  //
  //               fitViewOptions={{ padding: 2 }}
  //               nodeOrigin={[0.5, 0]}
  //               onInit={setRfInstance}
  //             />
  //             <Panel position={"top-center"}></Panel>
  //           </div>
  //
  //           {/*右侧信息栏*/}
  //           <div className={'my_div'} style={{height:'100%',width:'24%',flexDirection:'column', background:'white'}}>
  //             <div className={'my_div'} style={{height:'40%',width:'100%', backgroundColor: "pink"}}>
  //
  //             </div>
  //             <div className={'my_div'} style={{height:'60%',width:'100%',display:"flex", overflow:"hidden"}}>
  //               {/*<Show_group node_id ={selectedNodeIds} node_pos  = '点的位置'/>*/}
  //               <Show_group node_id ={selectedNodeIds} node_pos  ={selectedNodePos} curS = {CurSelect} onSGChange = {onSGChange} />
  //
  //               {/*<Show_group curS = {CurSelect} />*/}
  //             </div>
  //
  //           </div>
  //         </div>
  //
  //       </div>
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



