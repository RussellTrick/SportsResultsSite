import data from "../assets/MarathonResults.json";
import { ResultsData } from "../types";

const MockApiService = {
  // Args to set a delay to make the emulated API more realistic
  fetchData: (delay = 0): Promise<ResultsData> => {
    // Simulate an API call with a Promise
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data as ResultsData);
      }, delay);
    });
  },
};

export default MockApiService;
