import React, { useState, useEffect } from "react";

const RoutesList = ({ routes, editRoute, deleteRoute }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];

  for (let i = 1; i <= Math.ceil(routes.length / itemPerPage); i++) {
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
  var currentItems = routes.slice(indexofFirstItem, indexofLastItem);

  useEffect(() => {
    currentItems = routes.slice(indexofFirstItem, indexofLastItem);
    setCurrentPage(1);
  }, [routes]);

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
              <th scope="col">Train Name</th>
              <th scope="col">Station Name</th>
              <th scope="col">Stop No</th>
              <th scope="col">Arr Time</th>
              <th scope="col">Depart Time</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="text-capitalize">
            {currentItems.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th scope="row">
                    {(currentPage - 1) * itemPerPage + index + 1}
                  </th>
                  <td>{item.train.train_name}</td>
                  <td>{item.station.station_name}</td>
                  <td>{item.stop_no}</td>
                  <td>{item.arr_time}</td>
                  <td>{item.depart_time}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => editRoute(item._id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteRoute(item._id)}
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
        <div className="my-5 alert alert-danger w-75 mx-auto">
          <h2 className="text-center text-danger">No Records Available</h2>
        </div>
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

export default RoutesList;
