import { useContext, useEffect } from "react";
import "./styles.css";
import { DataContext } from "./context";

export default function App() {
  const { state, handleThrottleSearch } = useContext(DataContext);
  console.log("empty");
  return (
    <div className="App">
      <h2>Show Names</h2>
      <input
        type="text"
        value={state.searchText}
        onChange={handleThrottleSearch}
        placeholder="Enter Name"
      />
      {state.searchResults.length > 0 && (
        <table border="2px">
          <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Followers</th>
          </thead>
          <tbody>
            {state.searchResults.map((cell) => {
              const name = cell?.name ? cell.name.split(" ") : "";
              return (
                <tr>
                  <td>{name[0] ?? "NA"}</td>
                  <td>{name[1] ?? "NA"}</td>
                  <td>{cell?.followers ?? 0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
