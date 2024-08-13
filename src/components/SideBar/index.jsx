import DatePicker from "react-datepicker";
import { useNewsContext } from "../../context/News";

export default ({ handleChangeSideBar }) => {
  const { filters, handleFilterChange, handleSubmit } = useNewsContext();
  return (
    <>
      <aside className="sidebar animate__animated animate__fadeInLeftBig">
        <div className="col">
          <FilterBlock
            handleFilterChange={handleFilterChange}
            filters={filters}
            type="search"
            title="Search by title"
            isInput
          />
          <FilterBlock
            handleFilterChange={handleFilterChange}
            filters={filters}
            type="source"
            title="Source"
          />
          <FilterBlock
            handleFilterChange={handleFilterChange}
            filters={filters}
            type="category"
            title="Category"
          />
          <FilterBlock
            handleFilterChange={handleFilterChange}
            filters={filters}
            type="author"
            title="Author"
            isInput
          />
          <div className="filterBlock">
            <span>Date from-to</span>
            <div style={{ display: "flex" }}>
              <DatePicker
                selected={filters["startDate"]}
                onChange={(date) => handleFilterChange("startDate", date)}
              />
              {" - "}
              <DatePicker
                selected={filters["endDate"]}
                onChange={(date) => handleFilterChange("endDate", date)}
              />
            </div>
          </div>

          <button
            onClick={() => {
              handleSubmit();
              handleChangeSideBar();
            }}
          >
            Submit
          </button>
        </div>
        <button onClick={handleChangeSideBar}>
          <i className="fa fa-times"></i>
        </button>
      </aside>
      <div className="backDrop" onClick={handleChangeSideBar}></div>
    </>
  );
};

const FilterBlock = ({ handleFilterChange, filters, title = "", type, isInput }) => {
  const items = static_filters[type];

  return (
    <div className="filterBlock">
      <span>{title}</span>
      {isInput ? (
        <input
          type="text"
          onChange={(e) => {
            handleFilterChange(type, e.target.value);
          }}
          value={filters[type]}
        />
      ) : (
        items.map((item) => {
          const isActive = filters[type] == item.value;
          return (
            <button
              onClick={() => {
                handleFilterChange(type, item.value);
              }}
              className={isActive ? "active" : ""}
              key={item.value}
            >
              {item.label}
            </button>
          );
        })
      )}
    </div>
  );
};
const static_filters = {
  source: [
    { value: "guardian", label: "Guardian" },
    { value: "nyt", label: "N-Y Times" },
    {
      value: "news",
      label: "Newsapi.org",
    },
  ],
  category: [
    { value: "", label: "Random" },
    { value: "business", label: "Business" },
    { value: "entertainment", label: "entertainment" },
    { value: "general", label: "general" },
    { value: "health", label: "health" },
    { value: "science", label: "science" },
    { value: "sports", label: "sports" },
    { value: "technology", label: "technology" },
  ],
  author: [
    { value: "", label: "Random" },
    { value: "Jamelle", label: "Jamelle" },
    { value: "Guest", label: "Guest" },
    { value: "Michelle", label: "Michelle" },
    { value: "Paul", label: "Paul" },
  ],
};
