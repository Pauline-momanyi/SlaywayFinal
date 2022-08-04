import React, { useEffect, useState } from "react";
import Reviews from "../Reviewspop";
import BookItem from "./BookItem";

function Active() {
  const [actives, setActives] = useState([]);
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setActives(data);
        setLoading(false);
      });
  }, []);

  function handleRemove(id) {
    console.log(id);
    console.log("hey");
    const updatedActives = actives.filter((active) => active.id !== id);
    setActives(updatedActives);
  }

  function handleSoDone(id) {
    console.log(id);
    console.log("hey");
    const doneActives = actives.filter((active) => active.id !== id);
    setActives(doneActives);
  }

  return (
    <div>
      {loading ? (
        <>
          <h2 className="text-black p-20 text-center">Loading ...</h2>
        </>
      ) : (
        <>
          {actives.length > 0 ? (
            <>
              <table className="table-auto w-full">
                <tbody className="text-md divide-y divide-gray-100">
                  {actives.map(
                    (active) =>
                      active.status === true && (
                        <BookItem
                          active={active}
                          setErrors={setErrors}
                          setShow={setShow}
                          handleRemove={handleRemove}
                          handleSoDone={handleSoDone}
                        />
                      )
                  )}
                </tbody>
              </table>
              {show && <Reviews />}
            </>
          ) : (
            <>
              <h2 className="text-black p-20 text-center">No Bookings Found</h2>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Active;
