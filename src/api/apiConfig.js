const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '241b542b668244dd2ea182030824f211',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    keyword: 'https://api.themoviedb.org/3/discover/movie?api_key=5c0f12389eb757b9cbf2318762035360&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_keywords=289844&with_watch_monetization_types=free'
}

export default apiConfig;