import { useEffect, useState } from 'react'
import axios from 'axios';
import _ from 'lodash';


export default function useFournitureSearch(query, quantity) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [fournitures, setFournitures] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const controller = new AbortController();
  const { signal } = controller;

  const CATEGORIES_QUERY = `
  {
    categories(ids: "156126", locale: de_DE) {
      name
      articleCount
      childrenCategories {
        name
        urlPath
      }
      categoryArticles(first: ${quantity}) {
        articles {
          name
          variantName
          prices {
            currency
            regular {
              value
            }
          }
          images(
            format: WEBP
            maxWidth: 200
            maxHeight: 200
            limit: 1
          ) {
            path
          }
        }
      }
    }
  }
  `;

// const fetchCategories = () => {
//     fetch('/graphql', {
//         method : "POST",
//         headers : {'Content-Type': 'application/json'},
//         body : JSON.stringify({ query : CATEGORIES_QUERY})
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('data', data)
//         setFournitures(data);
//     })
//     .catch(error => setError(true))
// }

  useEffect(() => {
    setFournitures(null);
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false);
    fetch('/graphql', {
        signal,
        method : "POST",
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify({ query : CATEGORIES_QUERY})
    })
    .then(response => response.json())
    .then(data => {
        setFournitures(prevData => {return prevData = {...data}});
        const {articles} = data.data.categories[0].categoryArticles;
        if (articles.length && query) {
            const filtredArticles = articles.filter((article) => article.name.toLowerCase().split(query.toLowerCase()).length -1 > 0);
            data.data.categories[0].categoryArticles.articles = [...filtredArticles];
        };
        setHasMore(false);
        setLoading(false);
    })
    .catch(error => setError(true))

    // let cancel
    // axios({
    //   url: '/graphql',
    //   method: "POST",
    //   headers : {"Content-Type": "application/json"},
    //   body : JSON.stringify({ query : CATEGORIES_QUERY}),
    //   cancelToken: new axios.CancelToken(c => cancel = c)
    // }).then(response => response.json())
    // .then(res => {
    // //   setFournitures(prevFournitures => {
    // //     return [...new Set([...prevFournitures, ...])]
    // //   })
    //   setFournitures(res);
    //   setHasMore(res.data.docs.length > 0)
    //   setLoading(false)
    // }).catch(e => {
    //   console.error(e);
    //   if (axios.isCancel(e)) return
    //   setError(true)
    // })
    return () => controller.abort();
  }, [query, quantity])

  return { loading, error, fournitures, hasMore }
}