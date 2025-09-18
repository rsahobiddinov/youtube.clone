import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Icon from "../components/ui/Icons";
import { authStore } from "../store/authStore";
import { changeShowcaseStore } from "../store/showStore";

export default function Header() {
  const { toggle } = changeShowcaseStore();
  const [data, setData] = useState<string | null>(null);
  const authToggle = authStore((state) => state.authToggle);

  const handleClick = () => {
    window.location.href = "http://localhost:4000/api/auth/google";
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          credentials: "include",
        });
        const userData = await res.json();
        if (userData) {
          authToggle();
        }
        setData(userData.data.name);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="con h-[56px] w-full flex items-center justify-between bg-[#0f0f0f] text-white px-4">
      <div className="header-left flex items-center gap-2">
        <button onClick={toggle} className="text-white hover:text-gray-300">
          <HiMiniBars3 />
        </button>
        <Link to="/" className="flex items-center gap-1 text-white">
          <Icon.youTubeIcon />
          <span className="font-bold font-poppins">YouTube</span>
        </Link>
      </div>
      <div className="header-center flex items-center gap-4">
        <div className="flex items-center overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-[540px] placeholder:text-gray-400 text-white bg-[#121212] border border-[#303030] h-[35px] px-4 rounded-l-full focus:outline-none"
          />
          <div className="border border-[#303030] bg-[#222] w-[64px] h-[35px] rounded-r-full flex items-center justify-center cursor-pointer hover:bg-[#333]">
            <IoSearchOutline className="text-white" />
          </div>
        </div>
        <div className="p-2 bg-[#222] rounded-full cursor-pointer hover:bg-[#333]">
          <Icon.microPhoneIcon />
        </div>
      </div>
      <div className="header-right">
        <div className="flex items-center gap-3">
          <div className={data ? `hidden` : `block`}>
            <Icon.headerSettings />
          </div>
          <button onClick={handleClick} className={data ? `hidden` : `block`}>
            <div className="w-[102px] h-[36px] rounded-[20px] border border-[#303030] flex items-center justify-center gap-1.5 hover:bg-[#222]">
              <Icon.defaultUserLogin />
              <span className="text-[14px] text-[#3ea6ff] font-bold">
                Sign In
              </span>
            </div>
          </button>
          <button
            className={
              data
                ? `flex items-center gap-1 text-[15px] border border-[#303030] rounded-md px-2 py-1 hover:bg-[#222]`
                : `hidden`
            }
          >
            <GoPlus className="size-4" />
            <span>Создать</span>
          </button>
          <div className={data ? `block` : `hidden`}>
            <FaRegBell className="text-xl hover:text-gray-300 cursor-pointer" />
          </div>
          <div
            className={
              data
                ? `info border w-[40px] h-[36px] bg-purple-600 text-white rounded-full text-[20px] flex items-center justify-center`
                : "hidden"
            }
          >
            <span>{data?.slice(0, 1) || "?"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
