import { Input } from 'antd';
import React, {useContext, useEffect} from 'react'
import { DataContext } from '../../../context/data';

const Search= () : JSX.Element => {
  const {querySearch,setQuerySearch} = useContext(DataContext);
  useEffect(() => {}, [querySearch]);

  return (
    <Input value={querySearch} onChange={e =>setQuerySearch(e.target.value)} />
  )
}

export default Search