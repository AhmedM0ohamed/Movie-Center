import { useContext } from "react"
import { Link } from "react-router-dom";
import { APIContext } from "../../Context/APIContext";

export function Home(){

    const { moviesList , tvList } = useContext( APIContext );
    
    return<>
        {
            moviesList.length>0 && tvList.length>0 ? <>
                <div className="container">
                    <div className="row align-items-center ">
                        <div className="col-md-4">
                            <div className="title">
                                <h3>Trending Movies To Watch</h3>
                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                            </div>
                        </div>
                        {
                            moviesList.map( (movie , index) => 
                                <div key={index} className="col-md-2">
                                    <Link to={ `/moviedetails/${movie.id}` } >
                                        <div className="movie">
                                            <img className='w-100' src={ `https://image.tmdb.org/t/p/w500${movie.poster_path}` } alt="holllla" />
                                            <h5>{movie.title}</h5>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
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
            </> : <>
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <i className="fa-solid fa-spinner fa-5x fa-spin text-white"></i>
                </div>
            </>
        }
    </>
}
