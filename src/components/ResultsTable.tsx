import React from "react";
import { createColumnHelper, useReactTable } from "@tanstack/react-table";

type PlayerStats = {
  rank: number;
  firstname: string;
  surname: string;
  athleteid: string;
  finishtime: string;
  raceprogress: string;
  teamname: string;
  bibnumber: string;
  flag: string;
  countryname: string;
};

const columnHelper = createColumnHelper<PlayerStats>();

const columns = [
  columnHelper.accessor("rank", {
    cell: (info) => info.getValue(),
    header: () => <span>Rank</span>
  }),
  columnHelper.accessor("finishtime", {header: () => <span>Finish Time</span>
];

function ResultsTable() {
  return <div>ResultsTable</div>;
}

export default ResultsTable;
