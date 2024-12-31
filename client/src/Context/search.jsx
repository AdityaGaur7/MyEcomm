import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider 
      value={{ 
        searchQuery, 
        setSearchQuery, 
        searchResults, 
        setSearchResults 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use search context
export const useSearch = () => useContext(SearchContext); 