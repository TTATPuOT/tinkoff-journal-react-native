import ArticleResponse from './types/ArticleResponse';
import ArticleRequest from '@lib/Api/types/ArticleRequest';
import ArticleContentResponse from '@lib/Api/types/ArticleContentResponse';

const endpoint = 'https://core.tinkoffjournal.ru/api/public/v1/';

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
    console.log(`Requesting ${url}`);

    const data = await fetch(endpoint + url, init);

    const json = await data.json();
    //@ts-ignore
    if (json.status === 'ok') return json.data;

    return json;
}

export default {
    getArticles(data: ArticleRequest): Promise<ArticleResponse[]> {
        const query = getQuery(data);
        query.append('fields', 'cover,id,flows');

        return request('articles?' + query);
    },
    getArticle(id: string, data: ArticleRequest = {}): Promise<ArticleContentResponse> {
        const query = getQuery(data);
        query.append('fields', 'cover,id,flows,content');

        return request(`articles/${id}?` + query);
    }
}

function getQuery(data: { [key: string]: any }): URLSearchParams {
    const query = new URLSearchParams();

    if (Object.keys(data).length > 0) {
        for (const key in data) {
            //@ts-ignore
            if (data[key]) query.append(key, data[key].toString());
        }
    }

    return query;
}
