import { createColumnHelper, useReactTable } from "@tanstack/react-table";
import { PlayerStats } from "../types";

const columnHelper = createColumnHelper<PlayerStats>();

const columns = [
  columnHelper.accessor("rank", {
    cell: (info) => info.getValue(),
    header: () => <span>Pos.</span>,
  }),
  columnHelper.accessor("bibnumber", {
    header: () => <span>Bib Nº</span>,
  }),
  columnHelper.accessor("finishtime", {
    header: () => <span>Fin. Time</span>,
  }),
];

function ResultsTable() {
  return <div>ResultsTable</div>;
}

export default ResultsTable;
