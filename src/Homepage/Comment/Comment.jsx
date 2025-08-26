import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaUserCircle } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

// Fetch top 5 comments
const fetchTopComments = async () => {
  const res = await fetch("https://b2-b-server-drab.vercel.app/api/comments/top");
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

// Post a comment
const postComment = async (comment) => {
  const res = await fetch("https://b2-b-server-drab.vercel.app/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return res.json();
};

export default function TopComments() {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  // Fetch comments
  const {
    data: comments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["top-comments"],
    queryFn: fetchTopComments,
  });

  // Post new comment
  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["top-comments"]);
      setAuthor("");
      setText("");
      Swal.fire({
        title: "Thanks for your feedback! 🎉",
        text: "Your comment has been posted successfully.",
        icon: "success",
        confirmButtonColor: "#217b7e",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ author, text });
  };

  if (isLoading)
    return <p className="text-center text-gray-500">Loading comments...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load comments.</p>;

  return (
    <div className="w-full px-4 py-14 bg-gray-50 flex flex-col gap-10" id="review">
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl text-center font-extrabold bg-gradient-to-r from-[#217b7e] to-[#38b2ac] bg-clip-text text-transparent">
          What Our Clients Say
        </h2>
        <div className="w-24 h-1 bg-[#217b7e] mx-auto mt-2 rounded-full"></div>

        {/* Comments List */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <FaUserCircle className="text-[#217b7e] text-5xl flex-shrink-0" />
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between gap-4">
                  <strong className="text-lg text-gray-800">{comment.author}</strong>
                  <small className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <p className="mt-3 text-gray-700 leading-relaxed italic border-l-4 border-[#217b7e] pl-3">
                  “{comment.text}”
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-14 p-8 bg-white shadow-md rounded-2xl space-y-5 border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800">
            Share Your Experience ✨
          </h3>
          <Input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full"
          />
          <Textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="w-full min-h-[120px]"
          />
          <Button
            type="submit"
            className="bg-[#217b7e] hover:bg-[#1a5f61] text-white w-full md:w-auto"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
              </>
            ) : (
              "Post Comment"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
