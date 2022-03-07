import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full max-w-container mx-auto border-t py-10 text-center text-sm text-gray-500 sm:flex sm:items-center sm:justify-center">
      <p>© 2022 Tailwind Labs Inc. All rights reserved.</p>
      <p className="mt-2 sm:mt-0 sm:ml-3 sm:border-l sm:border-gray-200 sm:pl-3">
        <Link href={"/about"}>
          <a className="hover:text-teal-600">Privacy Policy</a>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
