import logo from "./logo.svg";
import "./App.css";
import mock_data from "./data/mock_data";
import React, { useState, useEffect } from "react";

// console.log(mock_data);
function App() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);
  const [searchType, setSearchType] = useState("Search category ▾");
  const [filterType, setFilterType] = useState("all");
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
    if (input.length >= 3) {
      setSearch(e.target.value);
    }
  };

  const onClickDropdown = () => {
    setOpen(!open);
  };
  const onClickType = (type) => {
    setFilterType(type);
    setSearchType(type);
    setOpen(!open);
  };

  const renderSwitch = () => {
    switch (filterType) {
      case "user":
        return mock_data.filter((item) =>
          item.user.toLowerCase().includes(input.toLowerCase())
        );
      case "city":
        return mock_data.filter((item) =>
          item.city.toLowerCase().includes(input.toLowerCase())
        );
      case "language":
        return mock_data.filter((item) =>
          item.language.toLowerCase().includes(input.toLowerCase())
        );
      default:
        return mock_data.filter((item) =>
          Object.keys(item).some((key) =>
            item[key].toLowerCase().includes(input.toLowerCase())
          )
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-area">
          <div className="dropdown">
            <button onClick={onClickDropdown} className="dropbtn">
              {searchType}
            </button>
            {open && (
              <div className="dropdown-content">
                <button onClick={() => onClickType("all")}>all</button>
                <button onClick={() => onClickType("user")}>user</button>
                <button onClick={() => onClickType("city")}>city</button>
                <button onClick={() => onClickType("language")}>
                  language
                </button>
              </div>
            )}
          </div>
          <input placeholder="Search" onChange={handleChange} value={input} />
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>City</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {renderSwitch().map((item, key) => (
                <tr key={key}>
                  <td>{item.user}</td>
                  <td>{item.city}</td>
                  <td>{item.language}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
