import React from "react";

export default function Footer() {
  return (
    <footer className=" border-t py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left  text-sm">
          © {new Date().getFullYear()} IGDTUW TNP Platform. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-gray-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-500 transition-colors">
            Terms of Service
          </a>
          <a href="mailto:tnp@igdtuw.ac.in" className="text-gray-600 hover:text-gray-500 transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
