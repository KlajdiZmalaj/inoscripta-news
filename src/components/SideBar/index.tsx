import DatePicker from "react-datepicker";
import { useNewsContext } from "../../context/News/index";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import { FiltersType } from "../../config/types";

export default ({ handleChangeSideBar }: { handleChangeSideBar: () => void }) => {
  const { filters, handleFilterChange, handleSubmit } = useNewsContext();
  return (
    <>
      <aside className="sidebar animate__animated animate__slideInLeft">
        <div className="col">
          <FilterBlock
            handleFilterChange={handleFilterChange}
            filters={filters}
            type="search"
            title="Search by keyword"
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

          <Accordion>
            <AccordionSummary>Date from-to</AccordionSummary>
            <AccordionDetails>
              <div className="filterBlock">
                <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                  <DatePicker
                    selected={filters["startDate"] ? new Date(filters["startDate"]) : null}
                    onChange={(date) =>
                      handleFilterChange("startDate", date ? date.toISOString() : "")
                    }
                    placeholderText="From"
                  />
                  {" - "}
                  <DatePicker
                    selected={filters["endDate"] ? new Date(filters["endDate"]) : null}
                    onChange={(date) =>
                      handleFilterChange("endDate", date ? date.toISOString() : "")
                    }
                    placeholderText="To"
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

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

type FilterBlockProps = {
  handleFilterChange: (type: any, newValue: string) => void;
  filters: FiltersType;
  title: string;
  type: "search" | "source" | "category";
  isInput?: boolean;
};
const FilterBlock = ({
  handleFilterChange,
  filters,
  title = "",
  type,
  isInput,
}: FilterBlockProps) => {
  const items = static_filters[type as keyof typeof static_filters];

  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="filterBlock">
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
      </AccordionDetails>
    </Accordion>
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
    { value: "entertainment", label: "Entertainment" },
    { value: "general", label: "General" },
    { value: "health", label: "Health" },
    { value: "science", label: "Science" },
    { value: "sports", label: "Sports" },
    { value: "technology", label: "Technology" },
  ],
  author: [
    { value: "", label: "Random" },
    { value: "Jamelle", label: "Jamelle" },
    { value: "Guest", label: "Guest" },
    { value: "Michelle", label: "Michelle" },
    { value: "Paul", label: "Paul" },
  ],
};
