new Vue({
  el: "#app",
  data: {
    query: "",
    movies: [],
    loading: false,
    error: "",
    selectedMovie: null
  },

  methods: {
    searchMovies() {
      if (!this.query) {
        this.error = "Please type a movie name.";
        return;
      }
      this.loading = true;
      this.error = "";
      this.movies = [];
      const API_KEY = "9e0d9d19";
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${this.query}`)
        .then(res => res.json())
        .then(data => {
          this.loading = false;
          if (data.Response === "False") {
            this.error = "No movies found.";
            return;
          }
          this.movies = data.Search;
        })
        .catch(() => {
          this.loading = false;
          this.error = "Error fetching data.";
        });
      },
    openMovie(id) {
      const API_KEY = "9e0d9d19";
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
        .then(res => res.json())
        .then(data => {
          this.selectedMovie = data;
        });
    },
    closeModal() {
      this.selectedMovie = null;
    }
  }
});
