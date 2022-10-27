const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '5c0f12389eb757b9cbf2318762035360',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;