function WatchedMovie({movie}){
    return(
        <li>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{!movie.imdbRating ? 0 : movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{!movie.userRating ? 0 : movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{!movie.runtime ? 0 : movie.runtime} min</span>
                </p>
            </div>
        </li>
    )
}
export default WatchedMovie