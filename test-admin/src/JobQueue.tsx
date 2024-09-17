import { useMediaQuery, Theme } from "@mui/material";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  Show,
  SimpleShowLayout,
  Filter,
  DateInput,
} from "react-admin";
import { useRecordContext } from "react-admin";

const JobFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search by ID" source="id" alwaysOn />
    <TextInput label="Search by Job ID" source="jobId" />
    <TextInput label="Search by Queue Name" source="queueName" />
    <TextInput label="Search by Status" source="status" />
    <DateInput label="Created At" source="createdAt" />
    <DateInput label="Completed At" source="completedAt" />
  </Filter>
);

const JsonField = ({ source }: any) => {
  const record = useRecordContext();
  return (
    <pre>
      {record && record[source]
        ? JSON.stringify(record[source], null, 2)
        : "N/A"}
    </pre>
  );
};

export const JobList = (props: any) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <List {...props} filters={<JobFilter />} resource="job">
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

export const JobShow = (props: any) => (
  <Show {...props}>
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
