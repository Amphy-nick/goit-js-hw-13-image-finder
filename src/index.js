import './sass/main.scss';
import NewsApiService from './js/apiFetch';
import refs from './js/refs'
import onOpenModal from './js/modal'

import markup from './templates/markup.hbs'

import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const newsApiService = new NewsApiService(); 

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.articlesContainer.addEventListener('click', onOpenModal);

function onSearch(e) {
   e.preventDefault();

     newsApiService.query = e.currentTarget.elements.query.value ;

     if(e.currentTarget.elements.query.value === '' 
     || e.currentTarget.elements.query.value.length < 2 ) {
         return error({ text: "Please specify your request", delay: 1500})
     }
     
     newsApiService.resetPage();
     newsApiService.fetchArticles().then(hits => {
        clearForm() 
        appendHitsMarkup(hits)
    })
    refs.loadMoreBtn.classList.add('visible');
}

function onLoadMore() {
    newsApiService.fetchArticles().then(appendHitsMarkup).then(() => {
    
    refs.loadMoreBtn.scrollIntoView({
    block: "start",
    behavior: "smooth"
});
    }).catch(err => console.log(err))
};

function appendHitsMarkup(hits) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', markup(hits))
}

function clearForm() {
    refs.articlesContainer.innerHTML = '';
}
