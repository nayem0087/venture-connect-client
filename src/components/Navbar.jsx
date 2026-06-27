"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Spinner, Dropdown, Label, Separator } from "@heroui/react";
import { Star, ChevronDown, ArrowRightFromSquare } from '@gravity-ui/icons';
import { LayoutDashboard, User as UserIcon } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

function getInitials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/signin');
    } catch (error) {
      console.error("Sign out failed", error);
    }
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Startups", href: "/startups" },
    { label: "Browse Opportunities", href: "/opportunities" },
  ];

  const dashboardLinks = {
    collaborator: '/dashboard/collaborator',
    founder: '/dashboard/founder',
    admin: '/dashboard/admin',
  }

  const dashboardHref = dashboardLinks[user?.role || 'collaborator'];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-600/20">
            <span className="text-xl font-bold text-white"><Star /></span>
          </div>
          <div className="hidden leading-none sm:block">
            <h1 className="text-3xl font-bold text-white">
              Venture<span className="text-purple-500">Connect</span>
            </h1>
          </div>
        </Link>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">

            {/* Nav Links Container (DESKTOP ACTIVE BG FIX) */}
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => {

                const isActive = link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200
                        ${isActive
                          ? 'bg-purple-600 text-white font-semibold'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Vertical Separation Token Line */}
            <div className="h-6 w-px bg-white/20" />

            {/* Desktop Authentication Mapping Pipeline */}
            <div className="flex items-center gap-4">
              {isPending ? (
                <div className="flex items-center justify-center">
                  <Spinner />
                </div>
              ) : user ? (
                // Avatar + name is the ENTIRE clickable trigger. Click opens
                // the dropdown — matches the reference design.
                <Dropdown placement="bottom-end">
                  <Dropdown.Trigger className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 pl-1.5 pr-3 py-1 transition-colors cursor-pointer outline-none">
                    <Avatar size="sm">
                      <Avatar.Image referrerPolicy="no-referrer" src={user?.image} alt={user?.name} />
                      <Avatar.Fallback className="font-bold text-sm uppercase bg-violet-600 text-white flex items-center justify-center w-full h-full">
                        {getInitials(user?.name)}
                      </Avatar.Fallback>
                    </Avatar>
                    <span className="text-sm font-semibold text-white">
                      {user.name ? user.name.split(" ")[0] : "User"}
                    </span>
                    <ChevronDown className="size-3.5 text-gray-400" />
                  </Dropdown.Trigger>

                  <Dropdown.Popover>
                    <div className="px-3 pt-3 pb-2">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-white capitalize">{user?.role || 'User'}</p>
                    </div>
                    <Separator />
                    <Dropdown.Menu onAction={(key) => key === 'logout' && handleSignOut()}>
                      <Dropdown.Item id="dashboard" textValue="Dashboard" href={dashboardHref}>
                        <LayoutDashboard className="size-4 text-gray-400" />
                        <Label>Dashboard</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="profile" textValue="Profile" href="/dashboard/collaborator/profile">
                        <UserIcon className="size-4 text-gray-400" />
                        <Label>Profile</Label>
                      </Dropdown.Item>
                      <Separator />
                      <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                        <ArrowRightFromSquare className="size-4" />
                        <Label>Logout</Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/signup"
                    className="py-2 px-4 flex items-center justify-center rounded-xl bg-purple-700 text-white border border-white/20 text-sm font-semibold hover:bg-purple-800 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* MOBILE NAVIGATION HAMBURGER CONTROLLER */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* RESPONSIVE MOBILE NAVIGATION EXPANSION DRAWER */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-3 px-4 py-6">

            {/* Nav Menu Lists (MOBILE ACTIVE BG FIX) */}
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-3 text-base font-medium transition duration-200
                        ${isActive
                          ? 'bg-purple-600 text-white font-semibold'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Conditional Mobile Footer Area */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                {isPending ? (
                  <div className="text-center py-2 text-gray-500 text-sm">Loading session layer...</div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4">
                      <Avatar size="md">
                        <Avatar.Image referrerPolicy="no-referrer" src={user?.image} alt={user?.name} />
                        <Avatar.Fallback className="font-bold uppercase bg-violet-600 text-white flex items-center justify-center w-full h-full">
                          {getInitials(user?.name)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                      </div>
                    </div>

                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/collaborator/profile"
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="size-4" />
                      Profile
                    </Link>

                    <Button
                      fullWidth
                      onClick={handleSignOut}
                      variant="flat"
                      className="h-12 border border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl font-medium"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5 text-center border border-violet-500/10 bg-violet-500/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>

                    <Button
                      as={Link}
                      href="/signup"
                      className="h-12 bg-white font-semibold text-black hover:bg-gray-200 transition-colors"
                      radius="lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}








// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Avatar, Button, Spinner } from "@heroui/react";
// import { Star } from '@gravity-ui/icons';
// import { signOut, useSession } from "@/lib/auth-client";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { data: session, isPending } = useSession();

//   const user = session?.user;
//   const router = useRouter();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       router.push('/auth/signin');
//     } catch (error) {
//       console.error("Sign out failed", error);
//     }
//   }

//   const navLinks = [
//     { label: "Home", href: "/" },
//     { label: "Browse Startups", href: "/startups" },
//     { label: "Browse Opportunities", href: "/opportunities" },
//   ];

//   const dashboardLinks = {
//     collaborator: '/dashboard/collaborator',
//     founder: '/dashboard/founder',
//     admin: '/dashboard/admin',
//   }

//   if (user?.email) {
//     navLinks.push(
//       {
//         label: 'Dashboard',
//         href: dashboardLinks[user?.role || 'collaborator']
//       }
//     )
//   }

//   return (
//     <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
//       <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-600/20">
//             <span className="text-xl font-bold text-white"><Star /></span>
//           </div>
//           <div className="hidden leading-none sm:block">
//             <h1 className="text-3xl font-bold text-white">
//               Venture<span className="text-purple-500">Connect</span>
//             </h1>
//           </div>
//         </Link>

//         {/* RIGHT SIDE (DESKTOP) */}
//         <div className="flex items-center gap-4">
//           <div className="hidden items-center gap-6 md:flex">

//             {/* Nav Links Container (DESKTOP ACTIVE BG FIX) */}
//             <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
//               {navLinks.map((link) => {

//                 const isActive = link.href === '/'
//                   ? pathname === '/'
//                   : pathname.startsWith(link.href);

//                 return (
//                   <li key={link.href}>
//                     <Link
//                       href={link.href}
//                       className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200
//                         ${isActive
//                           ? 'bg-purple-600 text-white font-semibold'
//                           : 'text-gray-300 hover:bg-white/10 hover:text-white'
//                         }`}
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>

//             {/* Vertical Separation Token Line */}
//             <div className="h-6 w-px bg-white/20" />

//             {/* Desktop Authentication Mapping Pipeline */}
//             <div className="flex items-center gap-4">
//               {isPending ? (
//                 <div className="flex items-center justify-center min-h-screen">
//                   <Spinner />
//                 </div>
//               ) : user ? (
//                 <>
//                   <span className="text-sm font-medium text-gray-300">
//                     Hi, <span className="text-violet-400">{user.name ? user.name.split(" ")[0] : "User"}</span>!
//                   </span>
//                   <Avatar
//                     src={user?.image}
//                     name={user?.name}
//                     size="md"
//                   />
//                   <Button
//                     onClick={handleSignOut}
//                     variant="flat"
//                     size="sm"
//                     className="border border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl text-xs font-semibold"
//                   >
//                     Sign Out
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     href="/auth/signin"
//                     className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
//                   >
//                     Sign In
//                   </Link>

//                   <Link
//                     href="/auth/signup"
//                     className="h-11 px-6 flex items-center justify-center rounded-xl bg-purple-700 text-white border border-white/20 text-sm font-semibold hover:bg-purple-800 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
//                   >
//                     Get Started
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* MOBILE NAVIGATION HAMBURGER CONTROLLER */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
//             aria-label="Toggle Menu"
//           >
//             {isMenuOpen ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* RESPONSIVE MOBILE NAVIGATION EXPANSION DRAWER */}
//       {isMenuOpen && (
//         <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
//           <div className="space-y-3 px-4 py-6">

//             {/* Nav Menu Lists (MOBILE ACTIVE BG FIX) */}
//             <ul className="space-y-2">
//               {navLinks.map((link) => {
//                 const isActive = link.href === '/'
//                   ? pathname === '/'
//                   : pathname.startsWith(link.href);

//                 return (
//                   <li key={link.href}>
//                     <Link
//                       href={link.href}
//                       className={`block rounded-xl px-4 py-3 text-base font-medium transition duration-200
//                         ${isActive
//                           ? 'bg-purple-600 text-white font-semibold'
//                           : 'text-gray-300 hover:bg-white/5 hover:text-white'
//                         }`}
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>

//             {/* Conditional Mobile Footer Area */}
//             <div className="border-t border-white/10 pt-4">
//               <div className="flex flex-col gap-3">
//                 {isPending ? (
//                   <div className="text-center py-2 text-gray-500 text-sm">Loading session layer...</div>
//                 ) : user ? (
//                   <div className="space-y-3">
//                     <div className="px-4 text-sm font-medium text-gray-400">
//                       Signed in as: <span className="text-white font-semibold">{user.name}</span>
//                     </div>
//                     <Avatar
//                     src={user?.image}
//                     name={user?.name}
//                     size="md"
//                   />
//                     <Button
//                       fullWidth
//                       onClick={handleSignOut}
//                       variant="flat"
//                       className="h-12 border border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl font-medium"
//                     >
//                       Sign Out
//                     </Button>
//                   </div>
//                 ) : (
//                   <>
//                     <Link
//                       href="/auth/signin"
//                       className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5 text-center border border-violet-500/10 bg-violet-500/5"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Sign In
//                     </Link>

//                     <Button
//                       as={Link}
//                       href="/signup"
//                       className="h-12 bg-white font-semibold text-black hover:bg-gray-200 transition-colors"
//                       radius="lg"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Get Started
//                     </Button>
//                   </>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }