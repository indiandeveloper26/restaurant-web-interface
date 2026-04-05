"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, LogOut, ClipboardList, User, Home, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/contextthem";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    let { logout, loging, cart } = useTheme();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    const baseNavItems = [
        { name: "Home", href: "/pizza", icon: <Home size={20} /> },
        { name: "Menulist", href: "/menulist", icon: <UtensilsCrossed size={20} /> },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animation Variants for staggered menu items
    const sidebarVariants = {
        closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
        open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <header className={`sticky top-0 z-[100] transition-all duration-300 ${scrolled ? "py-3 bg-yellow-500 shadow-xl" : "py-5 bg-yellow-500"}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2">
                    <motion.div whileHover={{ rotate: 15 }} className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg bg-white text-yellow-500">
                        🍕
                    </motion.div>
                    <div className="flex flex-col leading-none text-white">
                        <span className="text-2xl font-black italic tracking-tighter uppercase">PIZZA<span className="">GO.</span></span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Premium Taste</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-10">
                    {baseNavItems.map((item) => (
                        <Link key={item.name} href={item.href} className={`text-[12px] font-black uppercase tracking-widest text-white relative group`}>
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full ${pathname === item.href ? "w-full" : ""}`}></span>
                        </Link>
                    ))}

                    {loging ? (
                        <button onClick={handleLogout} className="text-[12px] font-black uppercase tracking-widest text-yellow-500 flex items-center gap-2 bg-white px-4 py-2 rounded-xl transition-transform active:scale-95">
                            <LogOut size={14} /> Logout
                        </button>
                    ) : (
                        <Link href="/login" className="text-[12px] font-black uppercase tracking-widest text-yellow-500 bg-white px-4 py-2 rounded-xl transition-transform active:scale-95">
                            Login
                        </Link>
                    )}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {loging && (
                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/order" title="My Orders">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${pathname === '/order' ? 'bg-white text-yellow-500' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                                    <ClipboardList size={20} />
                                </div>
                            </Link>
                            <Link href="/user" title="My Profile">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${pathname === '/user' ? 'bg-white text-yellow-500' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                                    <User size={20} />
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Cart Icon */}
                    <Link href="/cart" className="relative">
                        <motion.div whileTap={{ scale: 0.9 }} className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white text-yellow-500 shadow-md">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-yellow-500">
                                {Array.isArray(cart) ? cart.length : (cart || 0)}
                            </span>
                        </motion.div>
                    </Link>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden ml-1 p-2.5 rounded-2xl bg-white/20 text-white backdrop-blur-md"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
                        />

                        {/* Sidebar */}
                        <motion.div
                            variants={sidebarVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-yellow-500 z-[120] p-8 flex flex-col text-white shadow-2xl border-l border-white/10"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-black italic uppercase">MENU.</span>
                                    <div className="h-1 w-12 bg-white rounded-full mt-1" />
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-3 bg-white/20 rounded-2xl text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {baseNavItems.map((item) => (
                                    <motion.div key={item.name} variants={itemVariants}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-2xl font-black italic tracking-tighter uppercase flex items-center gap-4 p-3 rounded-2xl transition-colors ${pathname === item.href ? 'bg-white text-yellow-500 shadow-lg' : 'hover:bg-white/10'}`}
                                        >
                                            {item.icon} {item.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                {loging && (
                                    <>
                                        <motion.div variants={itemVariants}>
                                            <Link href="/order" onClick={() => setIsOpen(false)} className={`text-2xl font-black italic tracking-tighter uppercase flex items-center gap-4 p-3 rounded-2xl ${pathname === '/order' ? 'bg-white text-yellow-500 shadow-lg' : ''}`}>
                                                <ClipboardList size={22} /> My Orders
                                            </Link>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <Link href="/user" onClick={() => setIsOpen(false)} className={`text-2xl font-black italic tracking-tighter uppercase flex items-center gap-4 p-3 rounded-2xl ${pathname === '/user' ? 'bg-white text-yellow-500 shadow-lg' : ''}`}>
                                                <User size={22} /> Profile
                                            </Link>
                                        </motion.div>
                                    </>
                                )}

                                <motion.div variants={itemVariants} className="h-px bg-white/20 my-4" />

                                <motion.div variants={itemVariants}>
                                    {loging ? (
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-2xl font-black italic uppercase text-left p-3 rounded-2xl bg-red-500/20 text-red-100 flex items-center gap-4"
                                        >
                                            <LogOut size={22} /> Logout
                                        </button>
                                    ) : (
                                        <Link
                                            href="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="text-2xl font-black italic uppercase p-3 rounded-2xl bg-white text-yellow-500 flex items-center justify-center shadow-lg"
                                        >
                                            Login
                                        </Link>
                                    )}
                                </motion.div>
                            </div>

                            {/* Footer inside sidebar */}
                            <div className="mt-auto pt-10 text-center opacity-50">
                                <p className="text-xs font-bold uppercase tracking-widest">© 2024 PizzaGo</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}