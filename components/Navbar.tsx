import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
	return (
		<header className="bg-white border-b border-gray-200 opacity-50">
			<nav className="flex items-center justify-between px-4 py-2">
				<Link href="/" className="logo flex items-center gap-2">
					<Image src="/icons/logo.jpg" alt="logo" width={64} height={64} />
					<p>BandsInTown</p>
				</Link>
				<ul className="flex items-center gap-4">
					<Link href="/">Home</Link>
					<Link href="/">Events</Link>
					<Link href="/">Create event</Link>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
