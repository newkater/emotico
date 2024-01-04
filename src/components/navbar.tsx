import Link from 'next/link'
import { headerLogo } from '@/assets/images'
import Image from 'next/image'
import { navLinks } from '@/constants'
import { RxHamburgerMenu } from "react-icons/rx";

const NavBar = () => {
  return (
    <header className='  padding-x py-8 z-10 w-full'>
      <nav className='flex justify-between items-center max-container'>
        <a href="/">
          <Image width={50} src={headerLogo} alt="Logo" />
        </a>
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
          {navLinks.map((l) =>
            <Link key={l.label} href={l.href}>{l.label}</Link>
          )}
        </ul>
        <RxHamburgerMenu className="hidden max-lg:block" />
      </nav>
    </header>
  )
}

export default NavBar