import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlayerStats } from "../types";
import useProcessedData from "../hooks/useProcessedData";

const columnHelper = createColumnHelper<PlayerStats>();

const columns = [
  columnHelper.accessor("rank", {
    cell: (info) => info.getValue(),
    header: () => <span>Pos.</span>,
  }),
  columnHelper.accessor((row) => `${row.firstname} ${row.surname}`, {
    id: "fullName",
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("bibnumber", {
    header: () => <span>Bib Nº</span>,
  }),
  columnHelper.accessor("finishtime", {
    header: () => <span>Fin. Time</span>,
  }),
  columnHelper.accessor("timeDifference", {
    header: () => <span>Time Diff.</span>,
  }),
  columnHelper.accessor((row) => row.flag, {
    header: () => <span>Country</span>,
    id: "flag",
    cell: (info) => {
      const flagUrl = info.row.original.flagUrl;
      return flagUrl ? (
        <img
          src={flagUrl}
          alt={`Flag of ${info.row.original.countryname}`}
          className="border border-dark"
          width={40}
        />
      ) : (
        <span>{info.getValue()}</span>
      );
    },
  }),
];

function ResultsTable() {
  const data = useProcessedData();

  const table = useReactTable({
    data: data?.results.athletes || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

export default ResultsTable;
