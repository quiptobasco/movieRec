import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
    const [searchTitle, setSearchTitle] = useState('');
    // const [recommendedBy, setRecommendedBy] = useState('');
    // const [notes, setNotes] = useState('');
    // const [moviesList, setMoviesList] = useState([]);
    const [currentlyWatching, setCurrentlyWatching] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({});

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:8008/api/movies')
    //         .then((res) => setMoviesList(res.data))
    //         .catch((err) => console.log(err));
    // }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8008/api/movies/isWatching')
            .then((res) => setCurrentlyWatching(res.data[0].title))
            .catch((err) => console.log(err));
    }, []);

    const handleMovieSearch = (e) => {
        e.preventDefault();

        if (!searchTitle) {
            alert('Please enter a title');
            return;
        }
        axios
            .get(
                `http://www.omdbapi.com/?apikey=${
                    import.meta.env.VITE_OMDB_API_KEY
                }&s=${searchTitle}`
            )
            .then((res) => {
                console.log(res.data);
                setSearchResults(res.data.Search);
            })
            .catch((err) => console.log(err));
    };

    const handleMovieSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8008/api/movies', {
                title: selectedMovie.Title,
                // recommendedBy: recommendedBy,
                // notes: notes,
                imdbID: selectedMovie.imdbID,
            })
            .then((res) => {
                // setTitle('');
                // setRecommendedBy('');
                // setNotes('');
                console.log(res);
            })
            .catch((err) => {
                // if (res.status === 400) {
                console.log(err, 'This movie is already on the list');
            });
    };

    return (
        <div className="Main">
            <h1>I am currently watching:</h1>
            <h2>{currentlyWatching}</h2>

            <form>
                <input
                    type="text"
                    placeholder="Type the title of the movie to search for it"
                    onChange={(e) => setSearchTitle(e.target.value)}
                    value={searchTitle}
                />
                <button type="submit" onClick={handleMovieSearch}>
                    Search
                </button>
                {searchResults.length > 0 && (
                    <div className="searchResults">
                        {searchResults.map((result) => (
                            <div
                                key={result.imdbID}
                                className="result"
                                onClick={() => setSelectedMovie(result)}
                            >
                                <h3>{result.Title}</h3>
                            </div>
                        ))}
                    </div>
                )}
                {selectedMovie && (
                    <div className="selectedMovie">
                        <img
                            src={selectedMovie.Poster}
                            alt={selectedMovie.Title}
                        />
                        <h3>{selectedMovie.Title}</h3>
                        <p>{selectedMovie.Year}</p>
                        <p>{selectedMovie.Type}</p>
                        <p>{selectedMovie.imdbID}</p>
                    </div>
                )}
                {/* <input
                    type="text"
                    placeholder="Enter your recommendedBy here.  (optional)"
                    onChange={(e) => setRecommendedBy(e.target.value)}
                    value={recommendedBy}
                />
                <input
                    type="text"
                    placeholder="Enter your notes here.  (optional)"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                /> */}
                <button type="submit" onClick={handleMovieSubmit}>
                    Submit
                </button>
            </form>

            {/* <div className="moviesList">
                {moviesList.map((movie) => (
                    <div key={movie._id} className="movie">
                        <h3>{movie.title}</h3>
                        <p>{movie.recommendedBy}</p>
                        <p>{movie.notes}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default App;
