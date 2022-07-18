
const BASE_URL = import.meta.env.VITE_ENDPOINT_BASE
const KEY = import.meta.env.VITE_ENDPOINT_ACCESS;

const Marvel = {

    getComics: async (params = {}) => {
        let url = BASE_URL + 'public/comics?' + KEY + queryString(params);
        return await fetch(url)
            .then(response => response.json())
            .then(json => {
                return json.data;
            });
    },

    getComic: async (id, params = {}) => {
        let url = BASE_URL + 'public/comics/' + id + '?' + KEY + queryString(params);
        return await fetch(url)
            .then(response => response.json())
            .then(json => {
                return json.data;
            });
    },

    getCharacters: async (params = {}) => {
        console.log(params);
        let url = BASE_URL + 'public/characters?' + KEY + queryString(params);
        console.log(url);
        return await fetch(url)
            .then(response => response.json())
            .then(json => {
                return json.data;
            });
    },

    getCharacter: async (id, params = {}) => {
        let url = BASE_URL + 'public/characters/' + id + '?' + KEY + queryString(params);
        return await fetch(url)
            .then(response => response.json())
            .then(json => {
                return json.data;
            });
    },

}

function queryString(obj){
    if(obj && obj != ''){
        return '&' + Object.entries(obj)
            .map(([index, val]) => {
                if (val !== null){
                    return `${index}=${val}`;
                }
            })
            .join('&');
    }
    return '';
}

export default Marvel;