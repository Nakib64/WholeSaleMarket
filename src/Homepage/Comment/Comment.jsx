"use client";

import React, { useState, useEffect } from "react";
import { Star, Loader2, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const PRIMARY_COLOR = "#217b7e";
const SECONDARY_COLOR = "#38b2ac";
const API_BASE_URL = "https://b2-b-server-drab.vercel.app/api/comments";

// --- Star Rating ---
const StarRating = ({ rating = 0, setRating, size = 20, readOnly = false }) => (
  <div className="flex items-center space-x-0.5">
    {[...Array(5)].map((_, i) => {
      const val = i + 1;
      return (
        <Star
          key={i}
          size={size}
          fill={val <= rating ? SECONDARY_COLOR : "none"}
          stroke={SECONDARY_COLOR}
          className={`transition-transform ${!readOnly ? "cursor-pointer hover:scale-110" : ""}`}
          onClick={() => !readOnly && setRating(val)}
        />
      );
    })}
  </div>
);

// --- API Helpers ---
const fetchTopComments = async () => {
  const res = await fetch(`${API_BASE_URL}/top`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  const data = await res.json();
  return data.slice(0, 5);
};

const postComment = async (comment) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
};

// --- Custom Hook ---
const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchReviews = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await fetchTopComments();
      setReviews(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const postReview = async (review) => {
    if (!review.author || !review.text)
      return toast("Please fill in all fields.");

    setIsPosting(true);
    try {
      await postComment(review);
      toast("Thanks for your support ☺️")
      await fetchReviews();
    } catch {
      toast("Failed to post review 😪");
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return { reviews, isLoading, postReview, isPosting };
};

// --- Skeleton ---
const ReviewSkeleton = () => (
  <Card className="animate-pulse border-gray-200">
    <CardContent className="p-6 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
      <div className="h-20 bg-gray-200 rounded" />
    </CardContent>
  </Card>
);

// --- Main Component ---
export default function MarketplaceReviews() {
  const { reviews, isLoading, postReview, isPosting } = useReviews();

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [productQuality, setProductQuality] = useState(5);
  const [deliveryBehavior, setDeliveryBehavior] = useState(5);
  const [sellerBehavior, setSellerBehavior] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      author,
      text,
      rating,
      productQuality,
      deliveryBehavior,
      sellerBehavior,
      createdAt: new Date().toISOString(),
    };

    postReview(formData);

    setAuthor("");
    setText("");
    setRating(5);
    setProductQuality(5);
    setDeliveryBehavior(5);
    setSellerBehavior(5);
  };

  const totalReviews = reviews.length;
  const avg = totalReviews
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews).toFixed(1)
    : 0;

  return (
    <section className="w-full py-20 bg-gray-50" id="reviews">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
            }}
          >
            Client Success Stories & Reviews
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Verified feedback from our global partners.
          </p>
          <div
            className="h-1 w-24 mx-auto mt-4 rounded-full"
            style={{ backgroundColor: PRIMARY_COLOR }}
          ></div>

          <div className="mt-8 inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-xl shadow border">
            <StarRating rating={Math.round(avg)} readOnly size={24} />
            <span className="text-3xl font-bold text-gray-800">{avg}</span>
            <span className="text-gray-500">/5.0 ({totalReviews} reviews)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? [...Array(3)].map((_, i) => <ReviewSkeleton key={i} />)
            : reviews.map((r) => (
                <Card
                  key={r._id || crypto.randomUUID()}
                  className="hover:shadow-xl transition border border-gray-200"
                >
                  <CardContent className="p-2 space-y-3">
                    {/* Top Section */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <User size={28} color={SECONDARY_COLOR} />
                        <div>
                          <p className="font-semibold text-gray-800">{r.author}</p>
                          <StarRating rating={r.rating || 0} readOnly size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p
                      className="text-gray-700 italic border-l-4 pl-3 mt-3"
                      style={{ borderColor: SECONDARY_COLOR }}
                    >
                      “{r.text}”
                    </p>

                    {/* Category Ratings */}
                    <div className="mt-4 border-t pt-3 space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Product Quality:</span>
                        <StarRating rating={r.productQuality || 0} readOnly size={14} />
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery:</span>
                        <StarRating rating={r.deliveryBehavior || 0} readOnly size={14} />
                      </div>
                      <div className="flex justify-between">
                        <span>Seller:</span>
                        <StarRating rating={r.sellerBehavior || 0} readOnly size={14} />
                      </div>
                    </div>

                    <small className="text-gray-400 text-xs block mt-3 text-right">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </small>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Add Review Form */}
        <Card className="mt-16 shadow-2xl border-none">
          <CardContent className="p-4 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Share Your Experience ✨
            </h3>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Overall Rating
              </label>
              <StarRating rating={rating} setRating={setRating} size={30} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label>Product Quality</label>
                <StarRating rating={productQuality} setRating={setProductQuality} />
              </div>
              <div>
                <label>Delivery</label>
                <StarRating rating={deliveryBehavior} setRating={setDeliveryBehavior} />
              </div>
              <div>
                <label>Seller</label>
                <StarRating rating={sellerBehavior} setRating={setSellerBehavior} />
              </div>
            </div>

            <Input
              placeholder="Your Name / Company"
              className={"border-none"}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <Textarea
              placeholder="Write your detailed review..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <Button
              type="submit"
              onClick={handleSubmit}
              variant={"outline"}
              disabled={isPosting}
              className="w-full md:w-auto"
            >
              {isPosting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
