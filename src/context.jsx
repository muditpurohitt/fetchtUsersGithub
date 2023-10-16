import React, { createContext, useRef, useReducer } from "react";

export const DataContext = createContext();
const gitHubUrl = "https://api.github.com/users/";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_TEXT":
      return { ...state, searchText: action.searchText };
    case "UPDATE_SEACH_RESULTS":
      return {
        ...state,
        searchResults:
          action.searchResults.length === 0
            ? []
            : [...state.searchResults, action.searchResults].sort(
                (a, b) => a.followers - b.followers
              )
      };
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    searchText: "",
    searchResults: []
  });
  const throttling = useRef(false);

  const handleThrottleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.value;
    dispatch({ type: "INPUT_TEXT", searchText });

    if (throttling.current) {
      return;
    }
    if (!searchText) {
      dispatch({ type: "UPDATE_SEACH_RESULTS", searchResults: [] });
      return;
    }
    throttling.current = true;
    setTimeout(() => {
      throttling.current = false;
      fetch(gitHubUrl + searchText)
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            dispatch({ type: "UPDATE_SEACH_RESULTS", searchResults: data });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500);
  };

  return (
    <DataContext.Provider value={{ state, dispatch, handleThrottleSearch }}>
      {children}
    </DataContext.Provider>
  );
};
