import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import decodeToken from "../../utils/decodeToken";
import useChange from "../../hooks/useChange";
import ShowEmailModal from "../modal/ShowEmailModal";

const Layout = props => {
  const [isOpen, setIsOpen] = useState(false);
  const { children, title, highlight } = props;
  const [greaterCategory, category] = highlight.split("/");

  const navigate = useNavigate();
  const [isSignupModal, signupModalHandler] = useChange();

  // 로컬스토리지 토큰 확인
  const token = localStorage.getItem("authorization");
  const loginHandler = () => {
    if (token) {
      localStorage.removeItem("authorization");
      localStorage.removeItem("refresh-token");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const nickName = decodeToken(token);

  return (
    <div>
      <div className="fixed w-full py-5 bg-green1 z-20 flex justify-between md:grid md:grid-cols-4 md:justify-items-center">
        <button className="mx-2 text-white1 hidden md:block" onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon />
        </button>
        <p className="font-semibold text-sm md:text-base text-white1 md:hidden mx-4">
          {nickName ? `반가워요, ${nickName}뚜벅러님!` : `반가워요, 익명의 뚜벅러님!`}
        </p>
        <h1 className="text-white1 font-semibold text-base hidden md:block col-span-2">{title}</h1>
        <div className="flex">
          <button className="font-semibold text-sm md:text-base text-white1 mx-4" onClick={loginHandler}>
            {token ? "로그아웃" : "로그인"}
          </button>
          <button
            className="font-semibold text-sm md:text-base text-white1 mx-4"
            onClick={() => {
              signupModalHandler();
            }}
          >
            {!token && "회원가입"}
          </button>
          <ShowEmailModal show={isSignupModal} modalHandler={signupModalHandler} category={"email"} />
        </div>
      </div>
      {isOpen && (
        <div className="fixed w-72 pt-16 h-full bg-white shadow-md hidden md:block z-10">
          <div>
            <Link to="/">
              <img src="/assets/LogoV2.png" alt="뚜벅하우까 로고" className="w-40 my-6 mx-auto" />
            </Link>
          </div>
          <div className="ml-16">
            <div className="mb-4">
              <div
                className={`flex items-center ${greaterCategory === "mainpage" && "text-green1"} hover:text-green1 transition ease-in-out`}
              >
                <HomeIcon fontSize="large" sx={{ width: "32px" }} />
                <Link to="/" className="font-bold text-xl">
                  메인 페이지
                </Link>
              </div>
              <div className="flex flex-col ml-8">
                <Link to="/spots" className={`${category === "spots" && "text-green1 font-bold"} hover:font-bold`}>
                  관광지
                </Link>
                <Link to="/restaurants" className={`${category === "restaurants" && "text-green1 font-bold"} hover:font-bold`}>
                  맛집
                </Link>
                <Link to="/accommodations" className={`${category === "accommodations" && "text-green1 font-bold"} hover:font-bold`}>
                  숙소
                </Link>
                <Link to="/info" className={`${category === "info" && "text-green1 font-bold"} hover:font-bold`}>
                  정보
                </Link>
              </div>
            </div>
            <div className="mb-4">
              <div
                className={`flex items-center ${greaterCategory === "schedule" && "text-green1"}  hover:text-green1 transition ease-in-out`}
              >
                <CalendarMonthIcon fontSize="large" sx={{ width: "32px" }} />
                <Link to="/scheduleinfo" className="font-bold text-xl">
                  일정
                </Link>
              </div>
              <div className="flex flex-col ml-8">
                <Link to="/schedule" className={`${category === "create" && "text-green1 font-bold"} hover:font-bold`}>
                  일정 등록
                </Link>
                <Link to="/schedule/share" className={`${category === "share" && "text-green1 font-bold"} hover:font-bold`}>
                  일정 공유
                </Link>
              </div>
            </div>
            <div>
              <div
                className={`flex items-center ${greaterCategory === "mypage" && "text-green1"}  hover:text-green1 transition ease-in-out`}
              >
                <PersonIcon fontSize="large" sx={{ width: "32px" }} />
                <Link to="/mypage" className="font-bold text-xl">
                  마이 페이지
                </Link>
              </div>
              <div className="flex flex-col ml-8">
                <Link to="/mypage/favorites/list" className={`${category === "favorites" && "text-green1 font-bold"} hover:font-bold`}>
                  즐겨찾기한 목록
                </Link>
                <Link to="/mypage/user/edit" className={`${category === "edit" && "text-green1 font-bold"} hover:font-bold`}>
                  회원 정보 변경
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 md:invisible h-fit pt-3 pb-6 bg-white text-gray-700 w-full flex justify-around items-center rounded-lg z-10">
        <Link to="/">
          <HomeIcon />
        </Link>
        <Link to="/scheduleinfo">
          <CalendarMonthIcon />
        </Link>
        <Link to="/mypage">
          <PersonIcon />
        </Link>
      </div>
      <div className="w-full md:w-[600px] max-w-[600px] mx-auto pt-16 px-4 md:px-0 md:mb-10">{children}</div>
    </div>
  );
};

export default Layout;
