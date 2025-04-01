var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class FindingMovie {
    constructor() {
        this.API_KEY = 'c3efcca6';
        this.BASE_URL = 'https://www.omdbapi.com/';
        this.resultsContainerElement = document.getElementById('results-container');
        this.errorContainerElement = document.getElementById('error-container');
        this.searchButtonElement = document.getElementById('searchButton');
        this.searchTextElement = document.getElementById('searchText');
        if (this.searchButtonElement) {
            this.searchButtonElement.addEventListener('click', this.searchMovie.bind(this));
        }
        this.debounceInit = this.debounce(this.searchMovie.bind(this), 500);
        this.searchTextElement.addEventListener('input', this.debounceInit);
    }
    getMovie(link) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieData = yield fetch(link)
                .then(res => res.json())
                .then(res => {
                if (res.Response === 'False') {
                    throw new Error(res.Error);
                }
                return res;
            });
            console.log(movieData.Search);
            return movieData === null || movieData === void 0 ? void 0 : movieData.Search;
        });
    }
    searchMovie() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.resultsContainerElement || !this.errorContainerElement || !this.searchTextElement) {
                return;
            }
            const searchString = this.searchTextElement.value.trim();
            const searchLink = `${this.BASE_URL}?s=${encodeURIComponent(searchString)}&apikey=${this.API_KEY}`;
            this.resultsContainerElement.innerHTML = '';
            this.resultsContainerElement.style.display = 'none';
            this.errorContainerElement.style.display = 'none';
            this.errorContainerElement.innerHTML = '';
            if (!searchString) {
                this.errorContainerElement.style.display = 'block';
                this.errorContainerElement.innerHTML = 'Search string is empty';
                return;
            }
            try {
                const movieResults = yield this.getMovie(searchLink);
                this.generateMovies(movieResults);
            }
            catch (caughtError) {
                const error = caughtError;
                this.errorContainerElement.style.display = 'block';
                this.resultsContainerElement.style.display = 'none';
                console.log(error);
                this.errorContainerElement.innerHTML = error.message;
            }
        });
    }
    generateMovies(movieData) {
        if (!this.resultsContainerElement)
            return;
        movieData.forEach((item) => {
            var _a;
            if (!this.resultsContainerElement)
                return;
            const imgUrl = ((_a = item.Poster) === null || _a === void 0 ? void 0 : _a.startsWith('http')) ? item.Poster : 'images/logo/no_image.svg';
            this.resultsContainerElement.innerHTML +=
                `<div class="result-item">
                        <h2>${item.Title}</h2>
                        <img src="${imgUrl}" alt="Film Poster">
                        <p>Type: ${item.Type.charAt(0).toUpperCase() + item.Type.slice(1)}</p>
                        <p>Year: ${item.Year}</p>
                    </div>`;
        });
        this.resultsContainerElement.style.display = 'grid';
    }
    debounce(callback, wait) {
        let timer;
        return (...args) => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = window.setTimeout(() => {
                callback(...args);
            }, wait);
        };
    }
}
export { FindingMovie };
