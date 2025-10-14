import { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import MovieCard from "../movie-card/MovieCard";

const LgbtList = ({ type }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        let res = [];
        if (type === "movie") {
          res = await tmdbApi.getLgbtMovies({ language: "en-US", page: 1 });
        } else if (type === "tv") {
          res = await tmdbApi.getLgbtTv({ language: "en-US", page: 1 });
        }

        // 🔹 remove duplicados por ID
        const unique = Array.from(new Map(res.map((m) => [m.id, m])).values());

        // 🔹 ordena por popularidade
        unique.sort((a, b) => b.popularity - a.popularity);

        setItems(unique.slice(0, 10)); // só pega os 10 primeiros
      } catch (err) {
        console.error(err);
      }
    };
    loadItems();
  }, [type]);

  return (
    <div className="movie-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {items.map((item) => (
        <MovieCard key={item.id} item={item} category={type} />
      ))}
    </div>
  );
};

export default LgbtList;
