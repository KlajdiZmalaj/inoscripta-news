import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { generateApiParams } from "../../config/api";
import { newsMapper } from "../../config/utils";

const DEFAULT_FILTER = {
  source: "nyt",
  category: "",
  author: "",
  search: "",
  startDate: "",
  endDate: "",
};
//create context
const NewsContext = createContext({
  newsData: [],
});
//export as hook
export const useNewsContext = () => useContext(NewsContext);

const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTER);
  const getData = useCallback(async () => {
    //query params filters we send to backend
    const params = generateApiParams(filters, filters["source"]);

    setLoading(true);
    setNewsData([]);
    const response = await fetch(params[0][1] + new URLSearchParams(params).toString());
    const newsDataApi = await response.json();
    setLoading(false);

    if (newsDataApi) {
      //some apis use response.docs, some articles and some response.results
      setNewsData(
        newsMapper(
          newsDataApi?.response?.docs || newsDataApi?.response?.results || newsDataApi?.articles,
          filters.source
        )
      );
    } else {
      //handle error
    }
  }, [filters]);

  const handleFilterChange = (type, newValue) => {
    setFilters({
      ...filters,
      [type]: newValue,
    });
  };

  const handleSubmit = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NewsContext.Provider value={{ newsData, loading, filters, handleFilterChange, handleSubmit }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
