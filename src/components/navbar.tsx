import Link from 'next/link'
import { headerLogo } from '@/assets/images'
import Image from 'next/image'
import { navLinks } from '@/constants'
import { RxHamburgerMenu } from "react-icons/rx";
import { LoginButton } from './login-button';

const NavBar = () => {
  return (
    <header className='py-4 z-10 w-full relative xl:pl-20 xl:pr-20 pl-10 pr-10'>
      <nav className='flex justify-between items-center max-container'>
        <a href="/">
          <Image width={50} src={headerLogo} alt="Logo" />
        </a>
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((l) =>
            <Link key={l.label} href={l.href}>{l.label}</Link>
          )}
        </ul>
        <LoginButton></LoginButton>
        <RxHamburgerMenu className="hidden max-lg:block" />
      </nav>
    </header>
  )
}

export default NavBar