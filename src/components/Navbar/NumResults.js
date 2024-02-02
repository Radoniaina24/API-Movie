function NumResults({result}){
    return(
        <p className="num-results">
            Found <strong>{result.length}</strong> results
        </p>
    )
}
export default NumResults