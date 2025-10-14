import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const lgbtKeywords = [
  158718, 163037, 224000, 275749, 280179, 195624, 243575, 243577, 156331,
  165614, 173669, 270245, 295736, 271115, 313433, 316516, 316515, 346871,
  348565, 348563,
];

export const genres = {
    drama: 18,
    comedy: 35,
    romance: 10749,
    horror: 27,
    action: 28,
    thriller: 53,
    documentary: 99
};

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },

    // ✅ CORRIGIDO: Filmes LGBT por gênero
    getLgbtMoviesByGenre: async (genreId, params = {}, limit = 12) => {
        try {
            let allResults = [];
            
            // Busca para cada keyword LGBT
            for (const keywordId of lgbtKeywords) {
                try {
                    const response = await axiosClient.get('discover/movie', {
                        params: {
                            ...params,
                            with_genres: genreId,
                            with_keywords: keywordId,
                            page: 1
                        }
                    });
                    
                    if (response.results && response.results.length > 0) {
                        allResults = [...allResults, ...response.results];
                    }
                    
                    // Se já atingiu o limite, para de buscar
                    if (allResults.length >= limit * 2) break;
                    
                } catch (error) {
                    console.warn(`Erro na keyword ${keywordId}:`, error.message);
                    continue; // Continua para a próxima keyword
                }
            }
            
            // Remove duplicatas baseado no ID
            const uniqueResults = allResults.reduce((acc, current) => {
                if (!acc.find(item => item.id === current.id)) {
                    acc.push(current);
                }
                return acc;
            }, []);
            
            // Retorna apenas o limite solicitado
            return uniqueResults.slice(0, limit);
            
        } catch (error) {
            console.error('Erro em getLgbtMoviesByGenre:', error);
            return [];
        }
    },

  
    getLgbtTvByGenre: async (genreId, params = {}, limit = 12) => {
        try {
            let allResults = [];
            
            for (const keywordId of lgbtKeywords) {
                try {
                    const response = await axiosClient.get('discover/tv', {
                        params: {
                            ...params,
                            with_genres: genreId,
                            with_keywords: keywordId,
                            page: 1
                        }
                    });
                    
                    if (response.results && response.results.length > 0) {
                        allResults = [...allResults, ...response.results];
                    }
                    
                    if (allResults.length >= limit * 2) break;
                    
                } catch (error) {
                    console.warn(`Erro na keyword ${keywordId}:`, error.message);
                    continue;
                }
            }
            
            // Remove duplicatas
            const uniqueResults = allResults.reduce((acc, current) => {
                if (!acc.find(item => item.id === current.id)) {
                    acc.push(current);
                }
                return acc;
            }, []);
            
            return uniqueResults.slice(0, limit);
            
        } catch (error) {
            console.error('Erro em getLgbtTvByGenre:', error);
            return [];
        }
    }
};

export default tmdbApi;