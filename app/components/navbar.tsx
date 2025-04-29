"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-sky-900 fixed top-0 w-full z-50 p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <Link href="/">
          <img
            src="/logo.png"
            alt="MoveWise Logo"
            className="h-12 w-auto cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <a
          href="/login"
          className="text-white px-4 py-2 rounded-lg text-lg hover:opacity-70 transition"
        >
          Login
        </a>
        <a
          href="/"
          className="bg-rose-600 text-white px-4 py-2 rounded-lg text-1xl hover:opacity-90 transition"
        >
          Descargar
        </a>
      </div>
    </nav>
  );
}
