import {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import Main from "./components/Main/Main";
import Box from "./components/Box/Box";
import Loader from "./components/Loader/Loader";
import MovieList from "./components/Movie/MovieList";
import ErrorMessage from "./components/Error/ErrorMessage";
import MovieDetails from "./components/Movie/MovieDetails";
import WatchedSummary from "./components/Watched/WatchedSummary";
import WatchedMoviesList from "./components/Watched/WatchedMovieList";
import NumResults from "./components/Navbar/NumResults";
export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [query, setQuery] = useState("");
    const [selectedId, setSelecteId] = useState(null)
    function handleSelectedMovie(id){
        setSelecteId((selectedId)=> selectedId === id ? null : id)
    }
    function handleCloseMovie(){
    setSelecteId(null)
    }
function handleAddWatched(movie){
    setWatched(watched => [...watched, movie])
}
    useEffect(function () {
        const controller = new AbortController()
        async function getMovies() {
            try {
                setIsLoading(true)
                setError('')
                const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY}&s=${query}`, {signal : controller.signal});
                if(response.data.Response === "False"){
                   return  setError("Movies not found")
                }
                setMovies(response.data.Search);
                setIsLoading(false)
                setError('')

            } catch (error) {
                   if(error.toJSON().message === "canceled")
                   {
                       setError("Movies not found")
                   }
                   else
                   {
                       setError(error.toJSON().message)
                   }
            }
            finally {
                setIsLoading(false)
            }
        }
        getMovies()
        return function(){
            controller.abort()
        }
    }, [query])
    return (
        <>
            <Navbar>
                <Logo/>
                <Search query={query} setQuery={setQuery}/>
                <NumResults result={movies}/>
            </Navbar>
            <Main>
                <Box>
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />}
                    {error && <ErrorMessage message={error}/>}
                </Box>
                <Box>
                    {
                        selectedId ? (<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatchedMovie={handleAddWatched}/>
                            ) : (
                                <>
                                <WatchedSummary watched={watched}/>
                                <WatchedMoviesList watched={watched}/>
                            </>
                        )
                    }

                </Box>
            </Main>
        </>
    );
}




