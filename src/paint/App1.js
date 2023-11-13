import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Panel, useOnSelectionChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sside_bar from 'src/paint/Sside_bar.js';
import Show_group from './show_group';

const initialNodes = [
  {
    id: '0',
    type: 'input',
    data: { label: 'Node' },
    position: { x: 0, y: 50 },
    dd:45125,
  },
];
const flowKey = 'example-flow';
const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  const [curId, setCurId] = useState(1);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
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
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id }),
        );
      }
    },
    [project],
  );

  const onAdd = useCallback(() => {

    const newNode = {

      id: `randomnode_${+new Date()}`,
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
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
    console.log("22");
    // 创建一个新的样式对象
    const updatedNodes = nodes.map((node) => {
      console.log("被选中："+ selectedNodeIds + "now" + node.id);
      if (selectedNodeIds.includes(node.id)) {
        console.log("jinle");
        // 对node 修改
        node.className = 'selected-node';
      }else {
        node.className = '.react-flow__node';
      }

      // 否则，保持原始样式
      return node;
    });

    // 更新节点状态
    setNodes(updatedNodes);
  }, [selectedNodeIds]);






  const handleSelectionChange = ({ nodes, edges }) => {
    const curNodeIds = nodes.map((node) => node.id);
    const selectedEdgeIds = edges.map((edge) => edge.id);
    setSelectedNodeIds(curNodeIds);

  };




  useOnSelectionChange({
    onChange: handleSelectionChange,
  });




  return (

    <div className="wrapper" ref={reactFlowWrapper}>
      <div style={{ height: '100%', width: '100%', display:"flex",flexDirection:"column" }}>
        {/*顶部菜单栏*/}
        <div className={'my_div'} style={{ height: '8%', width: '100%', display:"flex",flexDirection:"row" }} >

        </div>

        <div style={{ height: '90%', width: '100%', display:"flex",flexDirection:"row" }} >

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
          <div className={'my_div'} style={{height:'100%',width:'75%'}}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
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
            <div className={'my_div'} style={{height:'40%',width:'100%'}}>

            </div>
            <div className={'my_div'} style={{height:'60%',width:'100%',display:"flex"}}>
              <Show_group node_id ={selectedNodeIds} node_pos  = '点的位置'/>

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
