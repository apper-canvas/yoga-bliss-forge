import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Home from "@/components/pages/Home";
import Book from "@/components/pages/Book";
import MySessions from "@/components/pages/MySessions";
import Profile from "@/components/pages/Profile";
import Payment from "@/components/pages/Payment";
import Confirmation from "@/components/pages/Confirmation";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="book" element={<Book />} />
          <Route path="my-sessions" element={<MySessions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="payment" element={<Payment />} />
          <Route path="confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default App;