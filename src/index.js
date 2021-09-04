import './sass/main.scss';
import NewsApiService from './js/apiFetch';
import markup from './templates/markup.hbs'
import { alert, notice, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    searchForm: document.querySelector('.search-form'),
    articlesContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
}

const newsApiService = new NewsApiService(); 

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
   e.preventDefault();

     newsApiService.query = e.currentTarget.elements.query.value ;

     if(e.currentTarget.elements.query.value === '' 
     || e.currentTarget.elements.query.value.length < 2 ) {
         return error('test')
     }

     newsApiService.resetPage();
     newsApiService.fetchArticles().then(hits =>{
        clearForm() 
        appendHitsMarkup(hits)
    })
}

function onLoadMore() {

    newsApiService.fetchArticles().then(appendHitsMarkup)
    
}

function appendHitsMarkup(hits) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', markup(hits))
}

function clearForm() {
    refs.articlesContainer.innerHTML = '';
}