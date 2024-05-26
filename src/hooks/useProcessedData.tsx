import { useEffect, useState } from "react";
import MockApiService from "../services/MockApiService";
import { PlayerStats, ResultsData } from "../types";

// Function to convert HH:MM:SS into seconds
function timeToSeconds(time: string): number {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to calculate time differences
function calculateTimeDifferences(athletes: PlayerStats[]): PlayerStats[] {
  // Sort athletes by rank
  athletes.sort((a, b) => a.rank - b.rank);

  // Get finish time of the first-place athlete in seconds
  const firstPlaceFinishTimeInSeconds = timeToSeconds(athletes[0].finishtime);

  // Calculate time differences
  for (let i = 0; i < athletes.length; i++) {
    const currentFinishTimeInSeconds = timeToSeconds(athletes[i].finishtime);
    const timeDifferenceInSeconds =
      currentFinishTimeInSeconds - firstPlaceFinishTimeInSeconds;

    // Convert time difference in seconds to HH:MM:SS format
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const minutes = Math.floor((timeDifferenceInSeconds - hours * 3600) / 60);
    const seconds = timeDifferenceInSeconds - hours * 3600 - minutes * 60;

    athletes[i].timeDifference = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return athletes;
}

function useProcessedData() {
  const [data, setData] = useState<ResultsData | null>(null);

  useEffect(() => {
    MockApiService.fetchData().then((fetchedData: ResultsData) => {
      const processedData = calculateTimeDifferences(
        fetchedData.results.athletes
      );
      setData({
        ...fetchedData,
        results: { ...fetchedData.results, athletes: processedData },
      });
    });
  }, []);

  return data;
}

export default useProcessedData;
