import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=>{
  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0);

  const updateNews = async ()=>{
    props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
    setLoading(true);
    props.setProgress(40);

    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);

  }

  useEffect(()=> {
    document.title= `${props.category} - NewsMonkey`;

    updateNews();
  },[])
  

 const  fetchMoreData =async () =>{
   let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page+1)

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
  }
    return (
      <>
        <h2 className="text-center" style={{margin :'75px 0px'}}>NewsMonkey - Top {props.category} Headlines</h2>
        {/* {loading && <Spinner/>} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults} 
        loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {articles.map((element,index) => {
            return (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author} 
                  date={element.publishedAt}
                  source = {element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll> 
       
      </>
    );
  }

News. defaultProps ={
  country : 'in',
  pageSize: 8,
  category: 'general'
}
News. propTypes ={
  country : PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string

}

export default News;
