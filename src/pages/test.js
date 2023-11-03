import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'test1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'test2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


const Page = () => (
  <>
    <Head>
      <title>
        Test | Devias Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <div style={{ width: '100vw', height: '100vh' }}>
          <ReactFlow nodes={initialNodes} edges={initialEdges} />
        </div>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
