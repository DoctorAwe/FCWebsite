import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import App1 from '../paint/App1';
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
