import { createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react"

export const APIContext = createContext();

export function APIContextProvider( props ){

    const [ moviesList , setmoviesList ] = useState( [] );
    const [ tvList , setTvList ] = useState( [] );

    async function movieApi(){
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=cdc173eac8977a114492223f477f5c84');
        let allMovies = data.results;
        setmoviesList(allMovies);
    }
    async function tvShowsApi(){
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=cdc173eac8977a114492223f477f5c84');
        let allMovies = data.results;
        setTvList(allMovies);
    }
    useEffect(  () => { 
        movieApi();
        tvShowsApi();
    } , [] );

    return <APIContext.Provider value={ { moviesList : moviesList , tvList : tvList } }>
        { props.children }
    </APIContext.Provider>
}