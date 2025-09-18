import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../index.css";

function RootLayout() {
  return (
    <>
      <Header />
      <div className="mt-5 ">
        <Sidebar>
          <main className="flex-1 flex flex-col ml-3">
            <Outlet />
          </main>
        </Sidebar>
      </div>
    </>
  );
}

export default RootLayout;
