import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export function MovieDetails(){
    let { id } = useParams();
    let [data , setData] = useState({});
    async function getMovieDetails(){
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=cdc173eac8977a114492223f477f5c84`);
        setData(data);
    }
    useEffect(() => {
        getMovieDetails()
    } , []);
    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="myImage">
                        <img className="w-100" src={ `https://image.tmdb.org/t/p/original${data.poster_path}` } alt="" />
                    </div>
                </div>
                <div className="col-md-8">
                    <h3>{data.original_title}</h3>
                    <p>{data.overview}</p>
                    {
                        data.genres?.map( (genre , index) =>  <span key = {index} className="me-2 p-2 bg-info text-white">
                            { genre.name }
                        </span>
                        )
                    }
                </div>
            </div>
        </div>
    </>
}