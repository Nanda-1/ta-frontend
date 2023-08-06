import { UserContext } from "Context/UserContext";
import AddCollection from "components/Modals/AddCollection";
import DeleteConfirmationModal from "components/Modals/DeleteConfirmationModal";
import React, { useState, useEffect, useContext } from "react";
import { Pagination } from "react-headless-pagination";
import { FaTrash } from "react-icons/fa";

export default function CollectionList() {
  const { setAddCollectionModal, addCollectionModal } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const { CollectionList, listCollection, DeleteCollectionByID } =
    useContext(UserContext);
  const [limitExceeded, setLimitExceeded] = useState(false);
  // Add this line at the beginning of the CollectionList component
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (!limitExceeded) CollectionList();
    setLimitExceeded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteButtonClick = (id) => {
    // Show the delete confirmation modal
    setShowDeleteConfirmation(true);
    // Set the item ID to be deleted
    setItemToDelete(id);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const indexOfLastTodo = (page + 1) * 15;
  const indexOfFirstTodo = indexOfLastTodo - 15;

  return (
    <>
      {addCollectionModal ? <AddCollection /> : null}
      <div className="w-full text-black-2 shadow-sm">
        <div className="relative font-bold box-content px-3 py-2 card-shadow rounded-lg bg-blue-3">
          <div className="block overflow-x-auto">
            <h4 className="text-black font-manrope py-1 mb-1">
              TABLE OF COLLECTIONS
            </h4>
            <table className="items-center w-full border-black bg-white overflow-x-auto bg-transparent border-collapse">
              <thead>
                <tr className="text-black text-xs text-grey-2 font-bold py-2 text-center">
                  <th
                    className="align-middle border-1 border-solid py-3 border-black"
                    width="10"
                  >
                    No
                  </th>
                  <th className="align-middle border-1 border-solid py-3 border-black">
                    Name
                  </th>
                  <th className="align-middle border-1 border-solid py-3 border-black">
                    Division
                  </th>
                  <th className="align-middle border-1 border-solid py-3 border-black">
                    Total
                  </th>
                  <th className="align-middle border-1 border-solid py-3 border-black">
                    Information
                  </th>
                  <th className="align-middle border-1 border-solid py-3 border-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {!listCollection || listCollection.length === 0 ? (
                  <tr>
                    <td
                      className="px-3 text-center text-grey text-xxs p-6"
                      colSpan={7}
                    >
                      Tidak Ada Data
                    </td>
                  </tr>
                ) : (
                  <>
                    {listCollection
                      .slice(indexOfFirstTodo, indexOfLastTodo)
                      .map((item, index) => {
                        return (
                          <tr
                            key={index}
                            // className=" border-2 border-solid border-l-0 border-r-0 border-t-0 text-inter"
                            style={{ fontSize: "12px" }}
                          >
                            <td className="px-3 py-1 text-center border-1 border-solid border-black border-b-0 border-t-0">
                              {index + 1}
                            </td>
                            <td className="border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                              {item.nama}
                            </td>
                            <td className="border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                              {item.divisi.name}
                            </td>
                            <td className="border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                              {item.jumlah}
                            </td>
                            <td className="border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                              {item.keterangan}
                            </td>
                            <td>
                              <div className="flex justify-center">
                                <button
                                  className="text-white bg-red px-4 py-1 rounded-lg focus:outline-none"
                                  onClick={() =>
                                    handleDeleteButtonClick(item.id)
                                  }
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </tbody>
            </table>
            <button
              className="text-white bg-blue my-3 px-4 py-1 rounded-lg float-right focus:outline-none"
              onClick={() => setAddCollectionModal(true)}
            >
              ADD NEW
            </button>
          </div>
        </div>
        {listCollection.length !== 0 && (
          <Pagination
            currentPage={page}
            setCurrentPage={handlePageChange}
            totalPages={Math.ceil(listCollection.length / 15)}
            edgePageCount={2}
            middlePagesSiblingCount={1}
            className="pagination mt-2"
            truncableText="..."
            truncableClassName=""
          >
            {/* <Pagination.PrevButton className="paginationBtn focus:outline-none">
              <img width={5} src={PrevIcon} alt="prev" />
            </Pagination.PrevButton> */}

            {/* <div className='items-center justify-center'> */}
            <Pagination.PageButton
              activeClassName="paginationActive"
              inactiveClassName="paginationInactive"
              className="paginationItems"
            />
            {/* </div> */}

            {/* <Pagination.NextButton className="paginationBtn focus:outline-none">
              <img width={5} src={NextIcon} alt="next" />
            </Pagination.NextButton> */}
          </Pagination>
        )}
      </div>
      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={() => {
          // Call the delete function and pass the item ID to delete
          DeleteCollectionByID(itemToDelete);
          // Close the delete confirmation modal
          setShowDeleteConfirmation(false);
        }}
      />
    </>
  );
}
