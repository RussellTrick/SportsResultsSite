import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
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
      header: () => <span>Pos.</span>,
    }),
    columnHelper.accessor((row) => `${row.firstname} ${row.surname}`, {
      id: "fullName",
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
    getSortedRowModel: getSortedRowModel(),
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
          <button className="btn btn-primary" onClick={ConvertOnClick}>
            EXPORT
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
