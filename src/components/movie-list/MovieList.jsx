import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import MovieCard from "../movie-card/MovieCard";

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      // Verifica se as props necessárias estão presentes
      if (props.items) {
        setItems(props.items);
        return;
      }
      if (!props.category || !props.type) {
        console.error("MovieList: category or type is undefined");
        setItems([]);
        return;
      }

      let response = null;
      const params = {};

      try {
        if (props.type !== "similar") {
          switch (props.category) {
            case category.movie:
              response = await tmdbApi.getMoviesList(props.type, { params });
              break;
            case category.tv:
              response = await tmdbApi.getTvList(props.type, { params });
              break;
            default:
              console.error("MovieList: invalid category");
              return;
          }
        } else {
          if (!props.id) {
            console.error("MovieList: id is required for similar type");
            return;
          }
          response = await tmdbApi.similar(props.category, props.id);
        }

        if (response && response.results) {
          setItems(response.results);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("MovieList API error:", error);
        setItems([]);
      }
    };
    getList();
  }, [props.category, props.type, props.id, props.items]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mostra mensagem se não houver items */}
      {items.length === 0 && (
        <div className="no-results">
          <p>Nenhum conteúdo encontrado.</p>
        </div>
      )}
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number,
};

export default MovieList;
