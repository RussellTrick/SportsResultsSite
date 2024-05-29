import { useState } from "react";
import ResultsTable from "./components/ResultsTable";
import logo from "./assets/cropped-1.-Logo-949-x-240-Logo-Horizontal.png";

function App() {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  const menuItems = [
    { id: 1, label: "Work", link: "https://www.google.com" },
    { id: 2, label: "Services", link: "https://www.google.com" },
    { id: 3, label: "Toybox", link: "https://www.google.com" },
    { id: 4, label: "About", link: "https://www.google.com" },
    { id: 5, label: "Blog", link: "https://www.google.com" },
    { id: 6, label: "Contact", link: "https://www.google.com" },
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
              <a href={menuItem.link} target="_blank">
                {menuItem.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ResultsTable />
    </>
  );
}

export default App;
