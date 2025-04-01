type ShortMovieDescription = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

class FindingMovie {
    API_KEY: string = 'c3efcca6';
    BASE_URL: string = 'https://www.omdbapi.com/';

    private readonly resultsContainerElement: HTMLElement | null;
    private readonly errorContainerElement: HTMLElement | null;
    private readonly searchButtonElement: HTMLButtonElement | null;
    private readonly searchTextElement: HTMLInputElement | null;
    private readonly debounceInit: (event: Event) => void;



    constructor() {

        this.resultsContainerElement = document.getElementById('results-container');
        this.errorContainerElement = document.getElementById('error-container');
        this.searchButtonElement = document.getElementById('searchButton') as HTMLButtonElement;
        this.searchTextElement = document.getElementById('searchText') as HTMLInputElement;

        if (this.searchButtonElement) {
            this.searchButtonElement.addEventListener('click', this.searchMovie.bind(this))
        }
        this.debounceInit = this.debounce(this.searchMovie.bind(this), 500);
        this.searchTextElement.addEventListener('input', this.debounceInit);

    }

    async getMovie(link: string): Promise<ShortMovieDescription[]> {
        const movieData = await fetch(link)
            .then(res => res.json())
            .then(res => {
                if (res.Response === 'False') {
                    throw new Error(res.Error);
                }
                return res;
            });
        console.log(movieData.Search);
        return movieData?.Search;
    }

    async searchMovie(): Promise<void> {
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
            const movieResults = await this.getMovie(searchLink);
            this.generateMovies(movieResults);
        } catch (caughtError: unknown) {
            const error = caughtError as Error;
            this.errorContainerElement.style.display = 'block';
            this.resultsContainerElement.style.display = 'none';
            console.log(error);
            this.errorContainerElement.innerHTML = error.message;

        }
    }

     generateMovies(movieData: ShortMovieDescription[]): void {
         if (!this.resultsContainerElement) return;

         movieData.forEach((item) => {
                if (!this.resultsContainerElement) return;
                const imgUrl: string = item.Poster?.startsWith('http') ? item.Poster : 'images/logo/no_image.svg';
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

    private debounce<T extends (...args: any[]) => void>(callback: T, wait: number): (...args: Parameters<T>) => void {
        let timer: number | undefined;
        return (...args: Parameters<T>) => {
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