import React, { useCallback, useState } from 'react';
import { useReactFlow } from 'reactflow';

export default function ContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  ...props
})
{
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();


  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({ ...node, id: `${node.id}-copy`, position });
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  const chooseServe = useCallback(() => {
    console.log( "id: " + id +  "开始挑选服务类型" );
    props.showModal();

  }, [id, setNodes, setEdges, props.showModal]);




  return (
    <div
      // style={{ top, left, right, bottom }}
      // className="context-menu"
      // {...props}
      style={{ top, left, right, bottom }}
      className="context-menu"
    >
      <p style={{ margin: '0.5em' }}>
        <small>node: {id}</small>
      </p>
      <button onClick={duplicateNode}>duplicate</button>
      <button onClick={chooseServe}>选择服务类型</button>
      <button onClick={deleteNode}>删除</button>

    </div>
  );
}
