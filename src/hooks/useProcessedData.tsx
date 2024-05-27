import { useEffect, useState } from "react";
import MockApiService from "../services/MockApiService";
import flagService from "../services/flagService";
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

    if (hours.toString().padStart(2, "0") === "00") {
      athletes[i].timeDifference = `+${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      athletes[i].timeDifference = `+${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  }

  return athletes;
}

async function fetchFlags(athletes: PlayerStats[]): Promise<PlayerStats[]> {
  for (let i = 0; i < athletes.length; i++) {
    const flagUrl = flagService.fetchFlag(athletes[i].flag);
    athletes[i].flagUrl = flagUrl;
  }
  return athletes;
}

function useProcessedData() {
  const [data, setData] = useState<ResultsData | null>(null);

  useEffect(() => {
    MockApiService.fetchData().then(async (fetchedData: ResultsData) => {
      const processedData = calculateTimeDifferences(
        fetchedData.results.athletes
      );
      const athletesWithFlags = await fetchFlags(processedData);
      setData({
        ...fetchedData,
        results: { ...fetchedData.results, athletes: athletesWithFlags },
      });
    });
  }, []);

  return data;
}

export default useProcessedData;
