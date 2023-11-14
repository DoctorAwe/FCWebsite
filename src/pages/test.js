import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import React, { useState, useCallback } from 'react';
import App1 from '../paint/App1';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
} from 'reactflow';
import { height } from '@mui/system';
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'test1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'test2' } },
  { id: '3', position: { x: 0, y: 200 }, data: { label: 'test3' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' },{ id: 'e2-3', source: '2', target: '3' }];



const Page = () => (
  <div style={{height:'100%', width:'100%'}}>
    <App1 />
  </div>





);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;