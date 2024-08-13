import moment from "moment";
const NewsComponent = ({ news = {}, loader }) => {
  return (
    <a target="_blank" href={news.link} className={`news-card${loader ? " isLoading" : ""}`}>
      <img loading="lazy" src={news.image} alt="" />
      <div className="title">{news.title}</div>
      {news.source && (
        <span className="category">
          Source: <span>{news.source}</span>
        </span>
      )}
      {news.category && (
        <span className="category">
          Category: <span>{news.category}</span>
        </span>
      )}
      {news.author && <div className="author">By: {news.author}</div>}
      <div className="date">{moment(news.date).format("MMMM Do YYYY, hh:mm:ss")}</div>
    </a>
  );
};
export default NewsComponent;
