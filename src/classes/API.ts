import Config from 'react-native-config';
import axios from 'axios';
import useSWRInfinite from 'swr/infinite';
import {ArticleItem} from '#app/models/article';

type TypeCallMethodParam<T = {}> = {
  method: 'GET' | 'POST';
  url: string;
  data?: T;
  config: {
    headers: {[key: string]: string};
  };
};

const SERVER = 'https://newsapi.org/v2/';

interface dataArticles {
  articles: ArticleItem[];
  status: string;
  totalResults: number;
}

export const useArticles = (
  dataFilter: {[key: string]: string | number} = {},
) => {
  const PAGE_LIMIT = 20;
  const {
    data,
    error,
    size,
    setSize,
    isLoading,
  }: {
    data: dataArticles[];
  } = useSWRInfinite(
    index =>
      _prepareURL('everything', {
        page: index + 1,
        pageSize: PAGE_LIMIT,
        ...dataFilter,
      }),
    url => _callMethod(url),
    {
      revalidateFirstPage: false,
    },
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    data: data ? data : [],
    error,
    isLoadingMore,
    isLoading,
    size,
    setSize,
  };
};

const _prepareURL = <T>(
  url: string,
  data?: {
    [key: string]: T;
  },
) => {
  let serverUrl = SERVER + url;

  const dataResultGet: string[] = [];

  if (data) {
    for (let prop in data) {
      if (typeof data[prop] === 'object') {
        for (let subProp in data[prop]) {
          dataResultGet.push(prop + '[' + subProp + ']=' + data[prop][subProp]);
        }
      } else {
        dataResultGet.push(prop + '=' + data[prop]);
      }
    }
  }

  serverUrl += '?' + dataResultGet.join('&') + `&apiKey=${Config.API_KEY}`;

  return serverUrl;
};

const _callMethod = <T>(
  url: string,
  method: 'GET' | 'POST' = 'GET',
  data?: T,
) => {
  let params: TypeCallMethodParam<typeof data> = {
    method: method,
    url: url,
    data: data,
    config: {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: Config.API_KEY,
      },
    },
  };

  if (method === 'GET') {
    delete params.data;
  }

  return axios(params)
    .then(response => {
      if (response.status !== 200 && response.data?.status !== 'ok') {
        return Promise.reject(response);
      }

      return response.data;
    })
    .then(backData => {
      console.log('%c Данные с бэка!', 'background: #9B2335; color: #fff');
      console.log(url, backData);
      console.log('%c Данные с бэка!', 'background: #9B2335; color: #fff');

      return Promise.resolve(backData);
    })
    .catch(error => {
      console.log('%c Ошибка сервера!', 'background: #000; color: #fff');
      console.log(url, error);
      console.log('%c Ошибка сервера!', 'background: #000; color: #fff');

      return Promise.reject(error?.message || '');
    });
};
