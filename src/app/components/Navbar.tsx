import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Cart from "./Cart";
import Image from "next/image";
import sobrinhaLogoNav from "../../photos/sobrinha-logo-nav.png"
import { BiLogInCircle } from "react-icons/bi";


function Navbar() {

  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-black text-gray-300">
      <div>
        <Link href='/' className="uppercase font-bold text-md h-[50px] flex items-center">
        <Image alt="Sobrinha's Logo" src={sobrinhaLogoNav} height={50} />
      </Link>
      </div>
      <div className="flex items-center gap-8">
        <Cart />
        <div>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="hidden sm:block"> {/* Exibe o botão de login apenas em telas maiores */}
              <SignInButton mode="modal">
                <button className="border rounded-md border-gray-400 px-3 py-2">
                  Fazer Login
                </button>
              </SignInButton>
            </div>

            <div className="block sm:hidden"> {/* Exibe o ícone apenas em telas pequenas */}
              <SignInButton mode="modal">
                <button className="text-2xl">
                  <BiLogInCircle />
                </button>
              </SignInButton>
            </div>
          </SignedOut>

        </div>

      </div>
    </nav>
  )
}

export default Navbar