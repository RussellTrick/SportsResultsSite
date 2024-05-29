import ResultsTable from "./components/ResultsTable";
import logo from "./assets/cropped-1.-Logo-949-x-240-Logo-Horizontal.png";

function App() {
  return (
    <>
      <img src={logo} className="logo"></img>
      <ResultsTable />
    </>
  );
}

export default App;
