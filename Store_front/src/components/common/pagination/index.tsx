import classNames from "classnames";
import { FC } from "react";

interface PaginationProps {
  count_page: number;
  current_page: number;
  onClick: (page: number) => void;
}

// interface PageItemProps {
//     key: 
// }

const PageItem = ({}) => {
    return 
}

const Pagination: FC<PaginationProps> = ({
  count_page,
  current_page,
  onClick,
}) => {
  const buttons: Array<number> = [];
  for (let i = 1; i <= count_page; i++) {
    buttons.push(i);
  }
  const pagination = buttons.map((page) => {
    if (current_page <= 5) {
      if (page === 8 && count_page != page) {
        return (
          <li key={page} className="page-item">
            <a
              className={classNames("page-link", {
                active: page === current_page,
              })}
              onClick={(e) => {
                e.preventDefault();
                onClick(page);
              }}
            >
              ...
            </a>
          </li>
        );
      }
      if (page <= 7 || page == count_page) {
        return (
          <li key={page} className="page-item">
            <a
              className={classNames("page-link", {
                active: page === current_page,
              })}
              onClick={(e) => {
                e.preventDefault();
                onClick(page);
              }}
            >
              {page}
            </a>
          </li>
        );
      }
    } else if (current_page > 5) {
      if (page == 1) {
        return (
          <li key={page} className="page-item">
            <a
              className={classNames("page-link", {
                active: page === current_page,
              })}
              onClick={(e) => {
                e.preventDefault();
                onClick(page);
              }}
            >
              {page}
            </a>
          </li>
        );
      }
      const range = count_page - current_page; //10 - 6 = 4, 10-7=3
      if (range <= 4) {
        const dot = current_page - (7 - range);
        if (page === dot) {
          return (
            <li key={page} className="page-item">
              <a
                className={classNames("page-link", {
                  active: page === current_page,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(page);
                }}
              >
                ...
              </a>
            </li>
          );
        } else if (current_page >= count_page - 5 && page > dot) {
          return (
            <li key={page} className="page-item">
              <a
                className={classNames("page-link", {
                  active: page === current_page,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        }
      } else if (range >= 5) {
        const dotleft = current_page - 3;
        const dotright = current_page + 3;
        if (page === dotleft || page === dotright) {
          return (
            <li key={page} className="page-item">
              <a
                className={classNames("page-link", {
                  active: page === current_page,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(page);
                }}
              >
                ...
              </a>
            </li>
          );
        }
        if (page > dotleft && page < dotright) {
          return (
            <li key={page} className="page-item">
              <a
                className={classNames("page-link", {
                  active: page === current_page,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        }

        if (page === count_page) {
          return (
            <li key={page} className="page-item">
              <a
                className={classNames("page-link", {
                  active: page === current_page,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        }
      }
    }
  });
  return (
    <>
      <nav>
        <ul className="pagination">{pagination}</ul>
      </nav>
    </>
  );
};

export default Pagination;