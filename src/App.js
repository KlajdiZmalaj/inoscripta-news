import "styles/global.scss";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NewsProvider from "./context/News";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <NewsProvider>
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </NewsProvider>
  );
}

export default App;
