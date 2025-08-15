import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaUserCircle } from "react-icons/fa";

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
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ author, text });
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading comments...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load comments.</p>;

  return (
    <div className="w-full px-4 py-10 bg-white flex flex-col gap-10" id="review">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl text-center font-extrabold text-gray-800">
          What Our Clients Say!
        </h2>

        {/* Comments List */}
        <div className="mt-8 grid gap-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-200"
            >
              <FaUserCircle className="text-gray-400 text-4xl flex-shrink-0" />
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <strong className="text-lg text-gray-800">{comment.author}</strong>
                  <small className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </div>
                <p className="mt-2 text-gray-700 leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 p-6 bg-white shadow-sm rounded-2xl space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-800">Leave a Comment</h3>
          <Input
            type="text"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full"
          />
          <Textarea
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="w-full"
          />
          <Button
            type="submit"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>
    </div>
  );
}
