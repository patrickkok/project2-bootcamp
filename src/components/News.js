import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [polygonNews, setNews] = useState([]);

  async function getnews() {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=tsla&apikey=HYYWPKPI7YSU0TXJ`
      );
      setNews(response?.data?.feed);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getnews();
  }, []);

  const slicedNews = polygonNews?.slice(4, 7);

  return (
    <div className="flex flex-row justify-content-center align-items-center py-5  flex-wrap">
      {polygonNews &&
        slicedNews?.map((news, i) => (
          <div key={i} className="p-2">
            <div className="card " style={{ width: "18rem", height: "30rem" }}>
              <img
                className="card-img-top"
                src={news?.banner_image}
                alt="News Card image"
                style={{ width: "100%", height: "12rem" }}
              />
              <div className="card-body">
                <p className="text-secondary text-start">
                  {/* {new Date(news?.time_published)} */}
                  {/* {new Date(news?.time_published).toDateString()} */}
                </p>
                <h5 className="card-title text-start">
                  {news?.title?.substr(0, 70)}
                </h5>
                <p className="card-text  text-start">
                  {news?.summary?.substr(0, 90)}....
                </p>
                <a href={news?.url} target="_blank" className="btn btn-primary">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default News;
