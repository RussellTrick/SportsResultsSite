import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlayerStats } from "../types";
import useProcessedData from "../hooks/useProcessedData";
import PlayerModal from "./PlayerModal";
import { useEffect, useState } from "react";
import loadingLogo from "../assets/GirraphicLogo.svg";

const columnHelper = createColumnHelper<PlayerStats>();

function ResultsTable() {
  const data = useProcessedData();
  const [modalPlayer, setModalPlayer] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [logoLoading, setLogoLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data !== null) {
      setLogoLoading(false);
      setTimeout(() => setLoading(false), 750);
    }
  }, [data]);

  const columns = [
    columnHelper.accessor("rank", {
      cell: (info) => info.getValue(),
      header: () => <span>Pos.</span>,
    }),
    columnHelper.accessor((row) => `${row.firstname} ${row.surname}`, {
      id: "fullName",
      header: () => <span>Name</span>,
      cell: (cell) => {
        const rowData = cell.row.original;
        return (
          <button
            className="btn btn-outline-primary border-0 p-0 hover-none"
            onClick={() => {
              setModalPlayer(rowData);
            }}
          >
            {cell.getValue()}
          </button>
        );
      },
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
  const table = useReactTable({
    data: data?.results.athletes || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="loader-container">
        <img
          src={loadingLogo}
          className={`loading-logo ${!logoLoading && "animate"}`}
        />
      </div>
    );
  } else {
    return (
      <>
        <PlayerModal
          row={modalPlayer}
          isOpen={modalPlayer !== null}
          onClose={() => setModalPlayer(null)}
        />
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 border">
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
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
      </>
    );
  }
}

export default ResultsTable;
