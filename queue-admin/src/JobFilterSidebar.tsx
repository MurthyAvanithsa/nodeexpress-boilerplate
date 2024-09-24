import { Card, CardContent } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
} from "react-admin";
import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  startOfMonth,
  subMonths,
  endOfISOWeek,
  endOfMonth,
  endOfToday,
  endOfWeek,
} from "date-fns";
import { useState } from "react";

const JobFilterSidebar = () => {
  const [searchBy, setSearchBy] = useState("id");

  return (
    <Card
      sx={{
        display: {
          xs: "none",
          md: "block",
        },
        order: -1,
        flex: "0 0 15em",
        mr: 2,
        mt: 6,
        alignSelf: "flex-start",
      }}
    >
      <CardContent sx={{ pt: 1 }}>
        <FilterLiveSearch label={`Search by ${searchBy}`} source={searchBy} />
        <SavedQueriesList />

        <FilterList label="Search Options" icon={<ListIcon />}>
          <FilterListItem
            label="ID"
            value="id"
            onClick={() => setSearchBy("id")}
          />
          <FilterListItem
            label="Queue Name"
            value="queueName"
            onClick={() => setSearchBy("queueName")}
          />
          <FilterListItem
            label="Job ID"
            value="jobId"
            onClick={() => setSearchBy("jobId")}
          />
        </FilterList>

        <FilterList label="Created At" icon={<CalendarTodayIcon />}>
          <FilterListItem
            label="Today"
            value={{
              createdAt: {
                createdAt_gte: endOfYesterday().toISOString(),
                createdAt_lte: endOfToday().toISOString()
              },
            }}
          />
          <FilterListItem
            label="This Week"
            value={{
              createdAt: {
                createdAt_gte: startOfWeek(new Date()).toISOString(),
                createdAt_lte: endOfWeek(new Date()).toISOString()
              },
            }}
          />
          <FilterListItem
            label="Last Week"
            value={{
              createdAt: {
                createdAt_gte: subWeeks(
                  startOfWeek(new Date()),
                  1,
                ).toISOString(),
                createdAt_lte: subWeeks(
                  endOfISOWeek(new Date()),
                  1,
                ).toISOString(),
              },
            }}
          />
          <FilterListItem
            label="This Month"
            value={{
              createdAt: {
                createdAt_gte: startOfMonth(new Date()).toISOString(),
                createdAt_lte: endOfMonth(new Date()).toISOString(),
              },
            }}
          />
          <FilterListItem
            label="Last Month"
            value={{
              createdAt: {
                createdAt_gte: subMonths(
                  startOfMonth(new Date()),
                  1,
                ).toISOString(),
                createdAt_lte: subMonths(
                  endOfMonth(new Date()),
                  1,
                ).toISOString(),
              },
            }}
          />
        </FilterList>

        <FilterList label="Completed At" icon={<CalendarTodayIcon />}>
        <FilterListItem
            label="Today"
            value={{
              completedAt: {
                completedAt_gte: endOfYesterday().toISOString(),
                completedAt_lte: endOfToday().toISOString()
              },
            }}
          />
          <FilterListItem
            label="This Week"
            value={{
              completedAt: {
                completedAt_gte: startOfWeek(new Date()).toISOString(),
                completedAt_lte: endOfWeek(new Date()).toISOString()
              },
            }}
          />
          <FilterListItem
            label="Last Week"
            value={{
              completedAt: {
                completedAt_gte: subWeeks(
                  startOfWeek(new Date()),
                  1,
                ).toISOString(),
                completedAt_lte: subWeeks(
                  endOfISOWeek(new Date()),
                  1,
                ).toISOString(),
              },
            }}
          />
          <FilterListItem
            label="This Month"
            value={{
              completedAt: {
                completedAt_gte: startOfMonth(new Date()).toISOString(),
                completedAt_lte: endOfMonth(new Date()).toISOString(),
              },
            }}
          />
          <FilterListItem
            label="Last Month"
            value={{
              completedAt: {
                completedAt_gte: subMonths(
                  startOfMonth(new Date()),
                  1,
                ).toISOString(),
                completedAt_lte: subMonths(
                  endOfMonth(new Date()),
                  1,
                ).toISOString(),
              },
            }}
          />
        </FilterList>

        <FilterList label="Status" icon={<ListIcon />}>
          <FilterListItem label="Completed" value={{ status: "Completed" }} />
          <FilterListItem label="Waiting" value={{ status: "Waiting" }} />
          <FilterListItem label="Failed" value={{ status: "Failed" }} />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default JobFilterSidebar;
