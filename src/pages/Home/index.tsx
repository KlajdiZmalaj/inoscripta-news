import { useNewsContext } from "../../context/News/index";
import NewsComponent from "../../components/NewsComponent";
import "./styles.scss";

const Home = () => {
  const { newsData = [], loading } = useNewsContext();

  return (
    <div className="home">
      <div className="news-wraper">
        {loading ? (
          new Array(4).fill(" ").map((_, i) => <NewsComponent key={i} loader />)
        ) : newsData?.length ? (
          newsData.map((news) => <NewsComponent key={news.id} news={news} />)
        ) : (
          <NothingFound />
        )}
      </div>
    </div>
  );
};

export default Home;

const NothingFound = () => <div className="nothingFound">No items found.</div>;
