
import axios from "axios";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api"
import { getRefs } from "./get-refs";

axios.defaults.headers.common["x-api-key"] = "live_AJ0R9QlJtoX5Lv0qD2S92BVWuBI49PnMfdCl1ma4wEVDWknzFYPuHxUrSoDTmlpj";

Notiflix.Notify.init({
    position: 'left-top',
    timeout: 30000,
});

const refs = getRefs();

refs.select.classList.add("js_select_hidden")
refs.loader.classList.add("js_loader_hidden")
refs.error.classList.add("js_error_hidden")

fetchBreeds()
    .then(renderBreeds)
    .catch(onFetchError) 
    
function renderBreeds(breeds) {
    refs.select.classList.remove("js_select_hidden")

    new SlimSelect({
        select: '.breed-select',
        data: [{text:'', value: '0'}, ...breeds.map(({ id, name }) => ({ text: name, value: id }))],
    })
  
    refs.loader.style.display = "none";  
};

refs.select.addEventListener('change', (e) => {
    refs.loader.style.display = "block";

    const breedId = e.target.value
    fetchCatByBreed(breedId)
        .then(renderCatByBreed)
        .catch(onFetchError)
}); 

function renderCatByBreed(breedId) { 

    const markup = breedId
            .map(({url, breeds}) => {
        return `<div><img src="${url}" width=600 style="margin-top:20px" alt=""></img></div>
           <div class="description" style="margin:20px; width:400px">    
            <h2>${breeds[0].name}</h2>
            <p>${breeds[0].description}</p>
            <p><b>Temperamet:</b>${breeds[0].temperament}</p>
            </div>  `
        })
        .join("")
    
    refs.catInfo.innerHTML = markup;
    refs.loader.style.display = "none"; 
};

function onFetchError(error) {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    refs.loader.style.display = "none";
};


   





