const KEY = 'key=23206361-11fddcc9c6397c9794392b9fa'
const BASE_URL = 'https://pixabay.com/api/?'

export default class NewsApiService {
constructor(){
    this.searchQuery = '';
    this.page = 1;
}

fetchArticles(){

const url = `${BASE_URL}${KEY}&q=${this.searchQuery}&
image_type=photo&per_page=12&page=${this.page}`

return fetch(url)
.then(response => response.json())
.then(({hits}) => {

    this.incrementPage();

    return hits;
})
}

incrementPage() {
    this.page +=1
}

resetPage() {
    this.page = 1
}

get query() {
    return this.searchQuery;
}

set query(newQuery) {
    this.searchQuery = newQuery;
}
}

