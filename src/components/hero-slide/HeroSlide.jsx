import React, { useState, useEffect, useRef } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button, { OutlineButton, LinkButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import { useNavigate } from 'react-router-dom';
import './hero-slide.scss';

const HeroSlide = () => {
    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                // Gêneros LGBT para buscar
                const lgbtGenres = [18, 35, 10749]; // Drama, Comédia, Romance
                let allLgbtMovies = [];

                // Busca filmes LGBT de vários gêneros
                for (const genreId of lgbtGenres) {
                    try {
                        const movies = await tmdbApi.getLgbtMoviesByGenre(genreId, { page: 1 }, 3);
                        if (movies && movies.length > 0) {
                            allLgbtMovies = [...allLgbtMovies, ...movies];
                        }
                    } catch (error) {
                        console.error(`Erro no gênero ${genreId}:`, error);
                    }
                }

                // Remove duplicatas e seleciona os melhores (com backdrop)
                const uniqueMovies = allLgbtMovies.filter((movie, index, self) =>
                    index === self.findIndex(m => m.id === movie.id)
                );

                // Filtra filmes com backdrop e ordena por popularidade
                const filteredMovies = uniqueMovies
                    .filter(movie => movie.backdrop_path || movie.poster_path)
                    .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
                    .slice(0, 4);

                if (filteredMovies.length >= 3) {
                    setMovieItems(filteredMovies);
                } else {
                    // Fallback para filmes populares
                    const params = { page: 1 };
                    const response = await tmdbApi.getMoviesList('popular', { params });
                    const popularMovies = response.results
                        .filter(movie => movie.backdrop_path)
                        .slice(0, 4);
                    setMovieItems(popularMovies);
                }

            } catch (error) {
                console.error('Erro ao buscar filmes para HeroSlide:', error);
                // Fallback final
                const params = { page: 1 };
                const response = await tmdbApi.getMoviesList('popular', { params });
                setMovieItems(response.results.slice(0, 4));
            }
        };
        getMovies();
    }, []);

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 10000 }}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {movieItems.map((item, i) => <TrailerModal key={i} item={item} />)}
        </div>
    );
}

// ... (HeroSlideItem e TrailerModal permanecem iguais ao código acima)


const HeroSlideItem = props => {
    const navigate = useNavigate()
    const item = props.item;
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal_content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal_content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('/movie/' + item.id)}>
                            Watch Now
                        </Button>
                        <LinkButton onClick={setModalActive}>
                            Watch Trailer
                        </LinkButton>
                    </div>
                </div>

            </div>
        </div>
    );
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="800px" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
