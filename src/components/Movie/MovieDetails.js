import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import StarRating from "../StartRating";
function MovieDetails({selectedId, onCloseMovie, onAddWatchedMovie}){
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState(null)
    function handleUserRating(rating){
        setUserRating(rating)
    }
    const {
        Title :title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imbdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie
    useEffect(function(){
        async function getMovieById(){
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY}&i=${selectedId}`
                );
                setMovie(response.data)
                setIsLoading(false)
            }catch (err){
                console.log(err)
            }finally {
                setIsLoading(false)
            }
        }
        getMovieById()
    }, [selectedId])


    function handleAdd(){
        const newWatchedMovie = {
            imbdbID : selectedId,
            title,
            year,
            poster,
            userRating : userRating,
            imbdbRating: Number(imbdbRating),
            runtime : Number(runtime.split(' ').at(0)),
        }
        setUserRating(null)
        onAddWatchedMovie(newWatchedMovie)
        onCloseMovie(null)
    }

    useEffect(function(){
        if(!title) return;
        document.title = `Movie | ${title}`
        return function(){
            document.title = 'usePopcorn'
        }

    }, [title])
    useEffect(function(){
        function callback(e){
            if(e.code === "Escape"){
                onCloseMovie()
            }
        }
        document.addEventListener('keydown', callback)
        return function (){
            document.removeEventListener('keydown', callback)
        }
    },[onCloseMovie])
    return <div className={"details"}>
        {isLoading ? <Loader/> :(
            <>
                <header>
                    <button className={"btn-back"} onClick={onCloseMovie}>
                        &larr;
                    </button>
                    <img src={poster} alt={`poster of ${movie} movie`}/>
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>{released} &bull; {runtime}</p>
                        <p>{genre}</p>
                        <p>{imbdbRating} IMDb rating</p>
                    </div>
                </header>
                <section>
                    <div className="rating">
                        <StarRating maxRating={8} size={24} onSetRating={handleUserRating}/>
                        { userRating ? <button className={"btn-add"} onClick={handleAdd}>+ Add to list</button> : ""}
                    </div>
                    <p><em>{plot}</em></p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>
        )}

    </div>
}
export default MovieDetails