import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
    const [searchTitle, setSearchTitle] = useState('');
    const [recommendedBy, setRecommendedBy] = useState('');
    const [notes, setNotes] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({});

    const handleMovieSearch = (e) => {
        e.preventDefault();

        if (!searchTitle) {
            alert('Please enter a title');
            return;
        }

        axios
            .post('http://localhost:8008/api/movies/search', {
                search: searchTitle,
            })
            .then((res) => {
                setSearchResults(res.data.Search);
            })
            .catch((err) => console.log(err));
    };

    const handleMovieSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8008/api/movies', {
                title: selectedMovie.Title,
                recommendedBy: recommendedBy,
                notes: notes,
                imdbID: selectedMovie.imdbID,
            })
            .then((res) => {
                setSearchTitle('');
                setSearchResults([]);
                setSelectedMovie({});
                setRecommendedBy('');
                setNotes('');
                console.log(res);
            })
            .catch((err) => {
                console.log(err, 'This movie is already on the list');
            });
    };

    return (
        <>
            <div className="Main">
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
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Enter your name here.  (optional)"
                        onChange={(e) => setRecommendedBy(e.target.value)}
                        value={recommendedBy}
                    />
                    <input
                        type="text"
                        placeholder="Enter your notes here.  (optional)"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                    />
                    <button type="submit" onClick={handleMovieSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}

export default App;
