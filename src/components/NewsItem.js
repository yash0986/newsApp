import React from "react";

const NewsItem =(props)=>  {
    let { title, description, imageUrl, newsUrl, author, date, source } =props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className=" badge rounded-pill bg-danger">{source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://www.hindustantimes.com/ht-img/img/2023/03/14/1600x900/silicon_valley_1678775834608_1678775834952_1678775834952.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                {" "}
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem;
