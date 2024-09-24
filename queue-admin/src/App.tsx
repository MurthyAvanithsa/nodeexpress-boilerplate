import { Admin, Resource } from "react-admin";

import { dataProvider } from "./dataProvider";
import { JobList, JobShow } from "./JobQueue";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="job" list={JobList} show={JobShow}/>
  </Admin>
);