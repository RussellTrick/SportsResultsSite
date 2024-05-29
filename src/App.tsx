import { useState } from "react";
import ResultsTable from "./components/ResultsTable";
import logo from "./assets/cropped-1.-Logo-949-x-240-Logo-Horizontal.png";

function App() {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  const menuItems = [
    { id: 1, label: "Work" },
    { id: 2, label: "Services" },
    { id: 3, label: "Toybox" },
    { id: 4, label: "About" },
    { id: 5, label: "Blog" },
    { id: 6, label: "Contact" },
  ];

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <a href="https://girraphic.com" target="_blank">
        <img src={logo} className="logo" alt="Girraphic Logo" />
      </a>
      <div className="the-menu">
        <ul>
          {menuItems.map((menuItem, index) => (
            <li
              key={menuItem.id}
              className={`menu-item-${index + 1}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                transition: "color 0.3s ease",
                backgroundColor: "none",
                color:
                  hoveredIndex === index
                    ? "black"
                    : hoveredIndex !== null
                    ? "#e0e0e0"
                    : "black",
              }}
            >
              <a>{menuItem.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <ResultsTable />
    </>
  );
}

export default App;
