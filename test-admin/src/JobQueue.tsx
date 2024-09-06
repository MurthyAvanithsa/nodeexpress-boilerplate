import { useMediaQuery, Theme } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
} from "react-admin";
import { useRecordContext } from 'react-admin';

const JsonField = ({ source }) => {
  const record = useRecordContext();
  if (!record || Object.keys(record).length === 0) {
    console.log("Record is empty:", record);
    return <pre>N/A</pre>;
  }
  return (
    <pre>{record[source] ? JSON.stringify(record[source], null, 2) : 'N/A'}</pre>
  );
};

export const JobList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <List resource="job">
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.queueName}
          secondaryText={(record) => record.status}
          tertiaryText={(record) => record.jobId}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="queueName" />
          <TextField source="jobId" />
          <TextField source="status" />
          <DateField source="createdAt" />
          <DateField source="completedAt" />
        </Datagrid>
      )}
    </List>
  );
};

export const JobShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="queueName" />
      <TextField source="jobId" />
      <TextField source="status" />
      <JsonField source="payload" />
      <DateField source="createdAt" />
      <DateField source="completedAt" />
      <TextField source="error" />
    </SimpleShowLayout>
  </Show>
);