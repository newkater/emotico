import Link from "next/link";
import { headerLogo } from "@/assets/images";
import Image from "next/image";
import { navLinks } from "@/constants";
import LoginButton from "./login-button";
import { NavUser } from "./nav-user";
import { MobileMenu } from "./mobile-menu";
import { getSession } from "@/actions/session";

const NavBar: React.FC = async () => {
  const session = await getSession()
  const links = session.isAuthenticated ? navLinks : navLinks.filter(l => l.public)
  return (
    <nav className="w-full border-b-gray-200 border-b-2 bg-fill-content">
      <div className="px-3 py-3 flex justify-between items-center container mx-auto">
        <a href="/">
          <Image width={50} src={headerLogo} alt="Logo" />
        </a>
        <ul className="hidden justify-left ml-10 items-center gap-10 md:flex md:flex-1 ">
          {links.map((l) => (
            <Link className="hover:text-gray-600" key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </ul>
        {session.isAuthenticated ?  <NavUser/> : <LoginButton />}
        <MobileMenu />
      </div>
    </nav>
  );
};

export default NavBar;
