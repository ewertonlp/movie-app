const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const keywordUrl = import.meta.env.VITE_TMDB_KEYWORD_URL;

const apiConfig = {
  baseUrl,
  apiKey,
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  keyword: `${keywordUrl}&api_key=${apiKey}`,
};

export default apiConfig;
