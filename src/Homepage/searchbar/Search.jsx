import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchedKey, setSearchedKey] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [inputRect, setInputRect] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch search suggestions
  const { data: products } = useQuery({
    queryKey: ["search", searchedKey],
    queryFn: async () => {
      const res = await axios.get(
        "https://b2-b-server-drab.vercel.app/search",
        { params: { searchedKey } }
      );
      return res.data;
    },
    enabled: !!searchedKey,
  });

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      setInputRect(inputRef.current.getBoundingClientRect());
    }
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
        setHighlightIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!products || products.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % products.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= 0 ? products.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < products.length) {
        handleSelect(products[highlightIndex]);
      } else if (searchedKey.trim() !== "") {
        navigate(`/searchedProducts/${searchedKey}`);
        setIsFocused(false);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setHighlightIndex(-1);
    }
  };

  // Navigate to product page
  const handleSelect = (product) => {
    setIsFocused(false);
    setHighlightIndex(-1);
    navigate(`/details/${product._id}`);
  };

  return (
    <div
      className="relative bg-white w-full flex justify-center items-center py-2"
      ref={wrapperRef}
    >
      <div className="w-full max-w-7xl flex gap-2 justify-center px-4">
        <Input
          ref={inputRef}
          type="text"
          className="input input-bordered max-w-4xl mx-auto m-0"
          placeholder="Search products by name, category, brand etc."
          value={searchedKey}
          onChange={(e) => setSearchedKey(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <Button onClick={() => navigate(`/searchedProducts/${searchedKey}`)}>
          <BsSearch />
        </Button>
      </div>

      {isFocused && products?.length > 0 &&
        inputRect &&
        createPortal(
          <div
            className="absolute bg-white shadow-lg rounded-md overflow-y-auto max-h-[60vh] text-black animate-fade z-[1000]"
            style={{
              top: inputRect.bottom + window.scrollY,
              left: inputRect.left + window.scrollX,
              width: inputRect.width,
            }}
          >
            {products.map((product, index) => (
              <div
                key={product._id}
                className={`p-2 cursor-pointer ${
                  index === highlightIndex ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
                onMouseDown={() => handleSelect(product)}
                onMouseEnter={() => setHighlightIndex(index)}
              >
                {product.name}
              </div>
            ))}
          </div>,
          document.body
        )}

      <style jsx>{`
        @keyframes fade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade {
          animation: fade 0.15s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
