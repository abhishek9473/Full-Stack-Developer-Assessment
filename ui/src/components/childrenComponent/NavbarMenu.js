import Cookies from "js-cookie";
import { useRouter } from "next/router";

function NavbarMenu() {
  const router = useRouter();
  const logoutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("auth");
    Cookies.remove("validUser");
    router.push("/login");
  };
  return (
    <div>
      <div className="border font-normal">
        <div className=" py-3 pl-5 hover:bg-slate-300" onClick={logoutHandler}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default NavbarMenu;
