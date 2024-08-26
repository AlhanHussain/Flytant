import { createContext } from "react";

export const DataContext = createContext(null);

function formatDate(dateString) {
    const date = new Date(dateString);
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
  
    return date.toLocaleDateString('en-US', options);
  }
  

  
  
  export const DataContextProvider = ( props ) => {
     const content = {
        formatDate
      };

    return (
        <DataContext.Provider value={content}>
            {props.children}
        </DataContext.Provider>
    );
};
