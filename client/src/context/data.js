import React, { useEffect, useState } from 'react';

export const DataContext = React.createContext();

export function DataContextProvider({ children }) {
  const [data, setData] = useState(null);
  const [querySearch, setQuerySearch] = useState('');
  const [quantity, setQuantity] = useState(50);
  const [loading, setLoading] = useState(true);
  const [searchResult , setSearchResult] = useState([]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        querySearch,
        setQuerySearch,
        setSearchResult,
        searchResult,
        loading,
        setLoading,
        quantity,
        setQuantity
      }}
    >
      {children}
    </DataContext.Provider>
  );

}
