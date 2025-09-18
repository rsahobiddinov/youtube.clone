import { Link } from "react-router-dom";

interface ButtonProps {
  id: number;
  children: string;
  to: string;
  isActive: boolean;
  onclick: (id: number) => void;
}

const CategoryButton = ({
  children,
  to,
  id,
  onclick,
  isActive,
}: ButtonProps) => {
  return (
    <Link to={to} onClick={() => onclick(id)} className="hover:text-black">
      <button
        className={
          !isActive
            ? `text-[16px] border border-[#d8d7d7] bg-[##f2f2f2] rounded-[8px] px-3  `
            : `rounded-[8px] px-3 text-[16px] border border-[#d8d7d7]  text-white bg-black`
        }
      >
        {children}
      </button>
    </Link>
  );
};

export default CategoryButton;
