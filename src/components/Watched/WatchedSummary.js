
const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
function WatchedSummary({watched}){
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = watched.reduce((prev, acc)=> prev + acc.userRating,0);
    const avgRuntime = watched.reduce((prev, acc)=> prev + (!acc.runtime ? 0 : acc.runtime), 0)
    return(
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{!avgImdbRating ? "" : avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    )
}
export default WatchedSummary