import React, { useState, useEffect } from "react";

const UserList = ({ users, deleteUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];

  for (let i = 1; i <= Math.ceil(users.length / itemPerPage); i++) {
    pages.push(i);
  }
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={
            currentPage === number
              ? "page-item page-link bg-primary text-white"
              : "page-item page-link "
          }
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const indexofLastItem = currentPage * itemPerPage;
  const indexofFirstItem = indexofLastItem - itemPerPage;
  var currentItems = users.slice(indexofFirstItem, indexofLastItem);

  useEffect(() => {
    currentItems = users.slice(indexofFirstItem, indexofLastItem);
    setCurrentPage(1);
  }, [users]);

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  return (
    <div>
      {currentItems.length > 0 ? (
        <table className="table table-hover table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th scope="row">
                    {(currentPage - 1) * itemPerPage + index + 1}
                  </th>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1 className="text-center text-danger my-5">Users Not Found</h1>
      )}
      {pages.length > 1 && (
        <ul className="pagination" style={{ cursor: "pointer" }}>
          {currentPage === 1 ? (
            <li className="page-item page-link text-muted"> Prev</li>
          ) : (
            <li className="page-item page-link" onClick={handlePrevBtn}>
              {" "}
              Prev
            </li>
          )}

          {renderPageNumbers}
          {currentPage === pages.length ? (
            <li className="page-item page-link text-muted"> Next</li>
          ) : (
            <li className="page-item page-link" onClick={handleNextBtn}>
              {" "}
              Next
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserList;
