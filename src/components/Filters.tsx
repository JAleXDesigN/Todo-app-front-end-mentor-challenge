import type { FC } from "react";

import { mergeClassNames } from "../helpers";

import Button from "./Button";
import styles from "./Filters.module.scss";

const filters: FilterType[] = ["All", "Active", "Completed"];

const Filters: FC<FiltersProps> = ({ design, filter, handleFilterChange }) => {
  return (
    <div
      className={mergeClassNames({
        [styles.root]: true,
        [styles[design]]: design,
      })}
    >
      {filters.map((filterName) => (
        <Button
          key={filterName}
          label={filterName}
          variant="filter"
          active={filterName === filter}
          onClick={() => handleFilterChange(filterName)}
        />
      ))}
    </div>
  );
};

export default Filters;
