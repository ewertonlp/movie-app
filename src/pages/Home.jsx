import React from 'react';
import { Button } from '../components/button/Button';
import { Link } from 'react-router-dom';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';
import LgbtSection from "../components/movie-list/LgbtSection";
import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
  return (
    <>
      {/* Hero principal */}
      <HeroSlide />

      <div className="container home-page">
        {/* LGBT Section */}
        <section className="section lgbt-section mb-5">
          <div className="section__header">
            <h2 className="section__title rainbow-text">🌈 LGBT+ Highlights</h2>
            <Link to="/lgbt">
              <Button className="small">Ver mais</Button>
            </Link>
          </div>
          <LgbtSection />
        </section>

      
      

        
      </div>
    </>
  );
};

export default Home;
