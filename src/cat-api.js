import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    const url = `${BASE_URL}/breeds`;
    
    return axios.get(url).then(
        (response) => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            return response.data;
        }
    );
};

export function fetchCatByBreed(breedId) {
    const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;
 
    return axios.get(url).then(
        (response => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            return response.data;
        })
    )
};

