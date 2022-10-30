import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './movie-card.scss';

const MovieCard = props => {

    const item = props.item;

    const link = '/' + category[props.category] + '/' + item.id;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className='movie-card' style={{backgroundImage: `url(${bg})`}}>
                <Button>
                    <FaPlay />
                </Button>
            </div>
            <p>{item.title || item.name}</p>
        </Link>
    )
}



export default MovieCard;