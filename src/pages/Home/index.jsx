import { useNewsContext } from "../../context/News";
import NewsComponent from "../../components/NewsComponent";
import "./styles.scss";

const Home = () => {
  const { newsData = [], loading, filters } = useNewsContext();

  return (
    <div className="home">
      <div className="news-wraper">
        {loading ? (
          new Array(4).fill(" ").map((_, i) => {
            return <NewsComponent key={i} loader />;
          })
        ) : newsData?.length ? (
          newsData.map((news) => {
            return <NewsComponent key={news.id} news={news} />;
          })
        ) : (
          <div className="nothingFound">
            No items found for author:"{filters["author"]}" on {filters["source"]} source.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
