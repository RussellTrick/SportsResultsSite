import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlayerStats, ResultsData } from "../types";
import useProcessedData from "../hooks/useProcessedData";
import PlayerModal from "./PlayerModal";
import { useEffect, useState } from "react";
import loadingLogo from "../assets/GirraphicLogo.svg";
import { convertToCsv } from "../services/raceService";

const columnHelper = createColumnHelper<PlayerStats>();

function ResultsTable() {
  const data = useProcessedData();
  const [modalPlayer, setModalPlayer] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [logoLoading, setLogoLoading] = useState<boolean>(true);
  const [raceDetails, setRaceDetails] = useState<ResultsData | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const caretHeight = 30;
  const caretWidth = 30;

  useEffect(() => {
    if (data !== null) {
      setLogoLoading(false);
      const newData = { ...data };
      if (newData.results.gender === "male") {
        newData.results.gender = "mens";
      } else if (newData.results.gender === "female") {
        newData.results.gender = "womens";
      }
      setRaceDetails(newData as ResultsData);
      setTimeout(() => setLoading(false), 750);
    }
  }, [data]);

  const columns = [
    columnHelper.accessor("rank", {
      cell: (info) => info.getValue(),
      header: () => <span>Rank</span>,
    }),
    columnHelper.accessor((row) => `${row.firstname} ${row.surname}`, {
      id: "fullName",
      size: 220,
      header: () => <span>Name</span>,
      enableSorting: false,
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
      enableSorting: false,
    }),
    columnHelper.accessor("raceprogress", {
      header: () => <span>Status</span>,
      enableSorting: false,
    }),
    columnHelper.accessor("timeDifference", {
      header: () => <span>Time Diff.</span>,
      size: 120,
      enableSorting: false,
    }),
    columnHelper.accessor((row) => row.flag, {
      header: () => <span>Country</span>,
      enableSorting: false,
      id: "flag",
      cell: (info) => {
        const flagUrl = info.row.original.flagUrl;
        return flagUrl ? (
          <img
            src={flagUrl}
            alt={`Flag of ${info.row.original.countryname}`}
            className="border border-dark icon-flag"
            title={info.row.original.countryname}
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
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const ConvertOnClick = () => {
    if (data !== null) {
      convertToCsv(data).catch((error) => alert("Error: " + error.message));
    } else {
      console.error("Data is null");
    }
  };
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
        <div className="d-flex justify-content-between align-items-center py-3 mt-5">
          <h5 className="m-0 race-title">
            {`${raceDetails?.results?.gender?.toLocaleUpperCase()} ${raceDetails?.results.racename.toLocaleUpperCase()}`}
          </h5>
          <button
            className="d-flex align-items-center justify-content-center btn bg-yellow"
            onClick={ConvertOnClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              width="20"
              viewBox="0 0 512 512"
            >
              <path
                fill="#000000"
                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
              />
            </svg>
          </button>
        </div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 border user-select-none">
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort() ? "cursor-pointer" : ""
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
                        {header.column.getCanSort() &&
                        !header.column.getIsSorted() ? (
                          <svg
                            height={caretHeight}
                            width={caretWidth}
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polygon
                              points="50,25 60,45 40,45"
                              fill="#7A7C7F"
                            />
                            <polygon
                              points="50,75 60,55 40,55"
                              fill="#7A7C7F"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                        {{
                          asc: (
                            <svg
                              height={caretHeight}
                              width={caretWidth}
                              viewBox="0 0 100 100"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polygon
                                points="50,25 60,45 40,45"
                                fill="black"
                              />
                              <polygon
                                points="50,75 60,55 40,55"
                                fill="#7A7C7F"
                              />
                            </svg>
                          ),
                          desc: (
                            <svg
                              height={caretHeight}
                              width={caretWidth}
                              viewBox="0 0 100 100"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polygon
                                points="50,25 60,45 40,45"
                                fill="#7A7C7F"
                              />
                              <polygon
                                points="50,75 60,55 40,55"
                                fill="Black"
                              />
                            </svg>
                          ),
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
                  <td
                    key={cell.id}
                    className="p-2 border"
                    style={{ width: cell.column.getSize() }}
                  >
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
        <div className="d-flex align-items-center gap-2 my-2">
          <button
            className="btn bg-yellow text-black user-select-none"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="btn bg-yellow text-black user-select-none"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="btn bg-yellow text-black user-select-none"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="btn bg-yellow text-black user-select-none"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="d-flex align-items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="d-flex align-items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16 bg-white text-black"
              min="1"
              max={table.getPageCount()}
            />
          </span>
          <select
            className="bg-white text-black"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
}

export default ResultsTable;
