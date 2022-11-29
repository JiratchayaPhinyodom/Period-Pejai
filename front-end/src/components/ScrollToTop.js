import React, { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import "./Login.css"

const ScrollToTop = () => {
const [showScrollTopButton, setShowScrollTopButton] = useState(false);

useEffect(() => {
    window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        setShowScrollTopButton(true);
    } else {
        setShowScrollTopButton(false);
    }
    });
}, []);

const scrollTop = () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth",
    });
};
return (
    <div>
    {showScrollTopButton && (
    <FaAngleDoubleUp
        className="top-btn-position top-btn-style"
        onClick={scrollTop}
        />
    )}
    </div>
);
};

export default ScrollToTop;