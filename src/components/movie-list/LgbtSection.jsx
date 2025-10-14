import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import MovieList from "../movie-list/MovieList";
import './abas.scss'

const LGBT_GENRES = [
  { id: 10749, name: "Romance" },     
  { id: 18, name: "Drama" },          
  { id: 35, name: "Comédia" },         
  { id: 99, name: "Documentário" },    
  { id: 10402, name: "Música" },       
  { id: 10751, name: "Família" },      
  { id: 14, name: "Fantasia" },
  { id: 28, name: "Ação" }
];

// Componente de Abas para cada gênero
const GenreTabs = ({ genre, movies, tvShows }) => {
  const [activeTab, setActiveTab] = useState('movies');

  // Se não há conteúdo, não renderiza nada
  if (!movies?.length && !tvShows?.length) return null;

  return (
    <div className="genre-tabs-section">
      <div className="section__header">
        <h2 className="genre-title">{genre.name}</h2>
        
        {/* Navegação por Abas */}
        <div className="media-tabs-navigation">
          <button 
            className={`tab-btn ${activeTab === 'movies' ? 'tab-btn--active' : ''} ${
              !movies?.length ? 'tab-btn--disabled' : ''
            }`}
            onClick={() => movies?.length && setActiveTab('movies')}
            disabled={!movies?.length}
          >
            <span className="tab-icon">🎬</span>
            <span className="tab-label">Filmes</span>
            {movies?.length > 0 && (
              <span className="tab-badge">{movies.length}</span>
            )}
          </button>
          
          <button 
            className={`tab-btn ${activeTab === 'tv' ? 'tab-btn--active' : ''} ${
              !tvShows?.length ? 'tab-btn--disabled' : ''
            }`}
            onClick={() => tvShows?.length && setActiveTab('tv')}
            disabled={!tvShows?.length}
          >
            <span className="tab-icon">📺</span>
            <span className="tab-label">Séries</span>
            {tvShows?.length > 0 && (
              <span className="tab-badge">{tvShows.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* Conteúdo das Abas */}
      <div className="tab-content">
        {activeTab === 'movies' && movies?.length > 0 && (
          <div className="tab-panel tab-panel--active">
            <div className="panel-header">
              <h3 className="panel-title">
                <span className="panel-icon">🎬</span>
                Filmes LGBT - {genre.name}
              </h3>
              <span className="panel-subtitle">{movies.length} títulos</span>
            </div>
            <MovieList items={movies} category="movie" />
          </div>
        )}
        
        {activeTab === 'tv' && tvShows?.length > 0 && (
          <div className="tab-panel tab-panel--active">
            <div className="panel-header">
              <h3 className="panel-title">
                <span className="panel-icon">📺</span>
                Séries LGBT - {genre.name}
              </h3>
              <span className="panel-subtitle">{tvShows.length} títulos</span>
            </div>
            <MovieList items={tvShows} category="tv" />
          </div>
        )}

        {/* Estado vazio */}
        {(activeTab === 'movies' && !movies?.length) && (
          <div className="empty-state">
            <div className="empty-icon">🎬</div>
            <h4>Nenhum filme encontrado</h4>
            <p>Não há filmes LGBT disponíveis para {genre.name} no momento.</p>
          </div>
        )}
        
        {(activeTab === 'tv' && !tvShows?.length) && (
          <div className="empty-state">
            <div className="empty-icon">📺</div>
            <h4>Nenhuma série encontrada</h4>
            <p>Não há séries LGBT disponíveis para {genre.name} no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente Principal
export default function LgbtSection() {
  const [moviesData, setMoviesData] = useState({});
  const [tvData, setTvData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          LGBT_GENRES.map(async (genre) => {
            try {
              const [movies, tvShows] = await Promise.all([
                tmdbApi.getLgbtMoviesByGenre(genre.id, { page: 1 }, 12),
                tmdbApi.getLgbtTvByGenre(genre.id, { page: 1 }, 12)
              ]);

              return {
                genre,
                movies: movies || [],
                tvShows: tvShows || []
              };
            } catch (err) {
              console.error(`Erro no gênero ${genre.name}:`, err);
              return { genre, movies: [], tvShows: [] };
            }
          })
        );

        const newMoviesData = {};
        const newTvData = {};
        
        results.forEach(({ genre, movies, tvShows }) => {
          newMoviesData[genre.id] = movies;
          newTvData[genre.id] = tvShows;
        });

        setMoviesData(newMoviesData);
        setTvData(newTvData);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao carregar dados LGBT:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Carregando conteúdos LGBT...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h3>Erro ao carregar</h3>
        <p>{error}</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="lgbt-section">
      <div className="section-intro">
        <h1>Conteúdo LGBT+</h1>
        <p>Descubra filmes e séries com representatividade LGBT+ organizados por gênero</p>
      </div>

      {LGBT_GENRES.map((genre) => (
        <GenreTabs
          key={genre.id}
          genre={genre}
          movies={moviesData[genre.id]}
          tvShows={tvData[genre.id]}
        />
      ))}
    </div>
  );
}