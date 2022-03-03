import React,{useEffect, useState, useContext, useRef, useCallback} from 'react';
import { Category, Article } from '../../../types';
import Card from '../../molecules/card';
import Loader from '../../atoms/loader';
import { DataContext } from '../../../context/data';
import { Select } from 'antd';
import './index.css';

const { Option } = Select;



interface CategoryName {
  categoryName : string
}

const ArticleList = (categoryName : CategoryName) : JSX.Element => {
  const {data, loading, setQuantity} = useContext(DataContext);

  const observer: any = useRef()
  const lastBookElementRef = useCallback(node => {
    if (observer && observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setQuantity((prevQuantity: number) => prevQuantity + 50);
      }
    });
    if (node) observer.current.observe(node)
  }, [])

  const [articles,setArticles] = useState<Article[]>([]);


  useEffect(() => {
    if(data){
      setArticles(data.data.categories[0].categoryArticles.articles);
    }
  },[data, loading]);

  var ListOfArticles = articles && articles.map((article : Article, index:number) => {
     if(articles.length == index+1) return <Card ref={lastBookElementRef} article={article} />;
    return <Card article={article} />;
  });

  const handleChange = (value : string) => {
    if(value == "asc" && articles) {
      setArticles(prevArtic => {
        return [...prevArtic.sort((a,b) => a.prices.regular.value - b.prices.regular.value)]
      })
    } else {
      setArticles(prevArtic => {
        return [...prevArtic.sort((a,b) => b.prices.regular.value - a.prices.regular.value)]
      })
    }
  }

    return (
        <div className={'content'}>
          {
          data &&
          <div className="separator">
            <div className="categorie">
              <span>
                {data.data.categories[0].name} ({data.data.categories[0].articleCount} articles)
              </span>
            </div>
            <div className="sort">
              <span>
                <h3>Sort :</h3>
                <Select defaultValue="Please select" style={{ width: 150, marginLeft: 10 }} onChange={handleChange}>
                  <Option value="asc">Price ascending</Option>
                  <Option value="desc">Price descending</Option>
                </Select>
              </span>
            </div>
          </div>
          }
          <hr/>
          {loading ? (
            <div className={'articles'}>{ListOfArticles}</div>
          ) : (
            <Loader/>
          )}
        </div>



    );
}
export default ArticleList