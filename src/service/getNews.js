import axios from "axios";

export function getNews(category='general') {
    const API_KEY = 'abc676fb02ce4649a24ba576768ddd8e';
    const API_ENDPOINT = 'https://newsapi.org/v2/top-headlines?country=us';
    
    return axios.get(`${API_ENDPOINT}&apikey=${API_KEY}&category=${category}`)
        // .then((response) => {
        //     // console.log(response.data.articles);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
}
