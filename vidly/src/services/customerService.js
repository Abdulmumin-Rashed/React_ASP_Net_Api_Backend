// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import config from "../config.json";
import http from "./httpService";

const customersEndPoint = config.apiUrl + "/Customer";

export function getCustomers() {
  return http.get(customersEndPoint);
}

function customerUrl(id) {
  return `${customersEndPoint}/${id}`;
}
export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}
export function getCustomer(id) {
  return http.get(customerUrl(id));
}
export async function saveCustomer(customer) {
  if (customer.id) {
    return http.put(customerUrl(customer.id), customer);
  }

  return http.post(customersEndPoint, customer);
}

// export const useFetchCustomers = () => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await http.get(customersEndPoint);
//         setData(res.data);
//         setIsPending(false);
//         setIsError(false);
//       } catch (ex) {
//         setIsError(true);
//         setError(ex);
//         setIsPending(false);
//       }
//     };
//     fetchCustomers();
//   }, []);
//   return { data, isPending, error, isError };
// };
// export const useFetchCustomer = (id) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const res = await http.get(customerUrl(id));
//         setData(res.data);
//         setIsPending(false);
//         setIsError(false);
//       } catch (ex) {
//         setIsError(true);
//         setError(ex);
//         setIsPending(false);
//       }
//     };
//     fetchCustomer();
//   }, []);
//   return { data, isPending, error, isError };
// };

// export const useDeleteCustomer = (customerId) => {
//   const [isDeleting, setIsDeleting] = useState(true);
//   const [isDeleteError, setIsDeleteError] = useState(false);
//   const [deleteError, setDeleteError] = useState(null);
//   const [deleteSuccess, setDeleteSuccess] = useState(null);
//   console.log(customerId);
//   useEffect(() => {
//     const deleteCustomer = async () => {
//       try {
//         await http.delete(customerUrl(customerId));
//         setDeleteSuccess("Successfully deleted.");
//         setIsDeleting(false);
//         setIsDeleteError(false);
//       } catch (ex) {
//         if (ex.response && ex.response.status === 404) {
//           toast.error("This toast has already been deleted");
//         }
//         setIsDeleteError(true);
//         setDeleteError("This customer has already been deleted");
//         setIsDeleting(false);
//       }
//     };
//     deleteCustomer();
//   }, [customerId]);

//   return { deleteSuccess, isDeleting, isDeleteError, deleteError };
// };

// export const useGetCustomer = (id) => {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const abortCont = new AbortController();
//     http
//       .get(customerUrl(id), { signal: abortCont.signal })
//       .then((res) => {
//         return res.data;
//       })
//       .then((data) => {
//         setData(data);
//         setIsPending(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setIsPending(false);
//         if (err.name === "AbortError") {
//           console.log("Clean up");
//         } else {
//         }
//       });
//     return () => abortCont.abort();
//   }, []);
//   return { data, isPending, error };
// };
