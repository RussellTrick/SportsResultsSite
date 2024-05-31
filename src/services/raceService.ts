import { config } from "../config";
import { ResultsData } from "../types";

export async function convertToCsv(raceResults: ResultsData) {
  const response = await fetch(`${config.baseURL}/results/convert-to-csv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(raceResults),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "race_results.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
