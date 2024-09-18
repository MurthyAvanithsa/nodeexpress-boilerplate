import { useMediaQuery, Theme } from "@mui/material";
import {
  List,
  SimpleList,
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  ExportButton,
  SelectColumnsButton,
  TopToolbar,
  DatagridConfigurable,
} from "react-admin";
import { useRecordContext } from "react-admin";
import JobFilterSidebar from "./JobFilterSidebar";

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

const JobActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

export const JobList = (props: any) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <List
      aside={<JobFilterSidebar />}
      {...props}
      resource="job"
      actions={<JobActions />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.queueName}
          secondaryText={(record) => record.status}
          tertiaryText={(record) => record.jobId}
        />
      ) : (
        <DatagridConfigurable
          rowClick="edit"
          sx={{
            "& .column-groups": {
              md: { display: "none" },
              lg: { display: "table-cell" },
            },
          }}
          omit={["payload", "error"]}
        >
          <TextField source="id" />
          <TextField source="queueName" />
          <TextField source="jobId" />
          <TextField source="status" />
          <JsonField source="payload" />
          <DateField source="createdAt" />
          <DateField source="completedAt" />
          <TextField source="error" />
        </DatagridConfigurable>
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
