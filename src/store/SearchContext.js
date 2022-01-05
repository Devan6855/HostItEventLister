import React, { createContext, useState } from 'react'

export const SearchContext = createContext(null)

function Search({children}) {

    const [searchItem, setSearchItem] = useState()

    return (
        <SearchContext.Provider value={{searchItem,setSearchItem}}>
            {children}
        </SearchContext.Provider>
    )
}

export default Search