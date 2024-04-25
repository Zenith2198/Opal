import Link from "next/link";
import Image from "next/image";
import { getBaseUrl } from "@/helpers/utils";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import TabButton from "@/components/TabButton";
import DropdownTabButton from "@/components/DropdownTabButton";

export default function Header() {
	
	const tourmalineOptions = [
		{tabName: 'Tourmaline 1.0', route: '/tourmaline1' },
		{tabName: 'Tourmaline 2.0', route: '/tourmaline' }
	];

	return (
		<header className="sticky top-0 z-50 bg-secondary">
			<div className="justify-between navbar p-0">
				<button id="skipNav" className="w-0 h-0"></button>
				<div className="navbar-start">
					{/* <SmallNav/> */}
					<Link className="normal-case text-xl h-20 w-64 bg-neutral rounded-3xl lg:rounded-l-none pr-4" href={`${getBaseUrl()}`}>
						<div className="avatar w-full h-full">
							<Image src="/images/noaaLogo.svg" alt="" fill={true} style={{objectFit: "contain"}}/>
						</div>
					</Link>
					<div className="hidden lg:block">
						{/* <Search/> */}
					</div>
					<div className="navbar-center hidden lg:flex relative">
          
          {/* Dropdown wrapper using details */}
		  <div className="navbar-center hidden lg:flex">
          <TabButton tabName='Home' route='/' />
          <DropdownTabButton name='Tourmaline' options={tourmalineOptions} />
          <TabButton tabName='About' route='/about' />
        </div>
        </div>
				</div>
				<div className="navbar-center hidden lg:flex">
					{/* <Nav/> */}
				</div>
				<div className="navbar-end mr-5">
					<SignedIn>
						<UserButton afterSignOutUrl="/" />
					</SignedIn>
					<SignedOut>
						<SignInButton>
							<button className="btn">Sign In</button>
						</SignInButton>
					</SignedOut>
				</div>
			</div>
		</header>
	);
}