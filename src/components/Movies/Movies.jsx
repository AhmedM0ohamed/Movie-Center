import { useContext } from "react"
import { APIContext } from "../../Context/APIContext";

export function Movies(){
    const { moviesList } = useContext(APIContext);
    return<>
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
                                <div className="movie">
                                    <img className='w-100' src={ `https://image.tmdb.org/t/p/w500${movie.poster_path}` } alt="holllla" />
                                    <h5>{movie.title}</h5>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    </>
}