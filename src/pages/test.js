import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import App1 from '../paint/App1';
import { styled } from '@mui/material/styles';
const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
  height: "100vh"

});
const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  height: '100%',
}));
const Page = () => (
  <LayoutRoot>
  <LayoutContainer>
    <App1 />
  </LayoutContainer>
  </LayoutRoot>
);



export default Page;