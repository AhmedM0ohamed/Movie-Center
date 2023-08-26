import { useContext } from "react";
import { APIContext } from "../../Context/APIContext";

export function TvShows(){
    const { tvList } = useContext(APIContext);
    return <>
        <div className="container"> 
            <div className="row align-items-center">
                <div className="col-md-4">
                    <div className="title">
                        <h3>Trending tv shows To Watch</h3>
                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                    </div>
                </div>
                {
                    tvList.map( (tvShows , index) => 
                            <div key={index} className="col-md-2">
                                <div className="movie">
                                    <img className='w-100' src={ `https://image.tmdb.org/t/p/w500${tvShows.poster_path}` } alt="holllla" />
                                    <h5>{tvShows.name}</h5>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    </>
}