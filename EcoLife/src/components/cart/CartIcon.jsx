import React from "react";

const CartIcon = () => {
  return (
    <div>
      {/* Placeholder for Cart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l.375-1.5C18.057 10.375 17.5 9.5 16.5 9.5H6.5a2 2 0 00-1.847 1.313l-.852 3.769A2 2 0 006.5 18h10.5a2 2 0 001.998-1.752L21 12H7m0 0a2 2 0 00-1.847 1.313L5.5 21m7.5-12h10.5a2 2 0 001.998-1.752l.852-3.769A2 2 0 0021 7H7M7 7h10"
        />
      </svg>
    </div>
  );
};

export default CartIcon;
