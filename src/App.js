import React,{ Fragment, useState, useEffect}  from "react";
import DetailSimpson from "./components/DetailSimpson/DetailSimpson";
import SimpsonsList from "./components/SimpsonsList/SimpsonsList";
import AddSimpson from './components/AddSimpson/AddSimpson'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HttpContext } from "./contexts/http-context";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const App =() => {
 

  
    const [getData, setGetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    const fetchUsersHandler =  async () => {
        setIsLoading(true);
        try {
          let response = await fetch("https://624d59cfc172b69d6931844d.mockapi.io/simpsons");
          if (!response.ok ) {
            throw new Error("Something Went Wrong!");
          }
          let data = await response.json();
          setGetData(data) 
        } catch (error) {
          setIsError(error.message);
        }
        setIsLoading(false);
      }

      useEffect(()=>{
        fetchUsersHandler();
      },[])

      const reffreshListDelete =  (simpson) =>{
        setGetData(getData.filter(element => element.id !== simpson.id))
      }

      const reffreshListAdd =  (simpson) =>{
         setGetData(getData.concat(simpson))
      }

      
  return (
    <Fragment>
      <HttpContext.Provider value={{reffreshListDelete,reffreshListAdd}}>
        <BrowserRouter>
          <Routes>
            <Route path="/"  element={<SimpsonsList getData={getData} isLoading={isLoading} isError={isError}/>} />
            <Route path="/details/:id" element={<DetailSimpson />} />
            <Route path="/add_new_character" element={<AddSimpson getData={getData}/>} />
            <Route path="/*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </HttpContext.Provider>
    </Fragment>
  );
}

export default App;
