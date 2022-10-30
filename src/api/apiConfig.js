const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '241b542b668244dd2ea182030824f211',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;