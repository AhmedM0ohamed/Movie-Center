import { Link } from "react-router-dom";

export function Navbar({ currentUser , clearUserData }){
    return <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='home' >NOXE</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                            currentUser? <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link"  to='home'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link"  to='movies'>Movies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link"  to='tv'>Tv shows</Link>
                                </li>
                            </ul> : ''
                        }
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto d-flex align-items-center">
                            
                            <li className="nav-item ">
                                <i className="fa-brands me-3 fa-facebook"></i>
                                <i className="fa-brands me-3 fa-instagram"></i>
                                <i className="fa-brands me-3 fa-twitter"></i>
                                <i className="fa-brands me-3 fa-spotify"></i>
                            </li>
                            {
                                currentUser? <li className="nav-item">
                                    <span onClick={ clearUserData } className="nav-link" >Logout</span>
                                </li> : <>
                                    <li className="nav-item">
                                        <Link className="nav-link"  to='register'>Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link"  to='login'>Login</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
}