import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../AuthContext/AuthContext";
import Loading from "../../Loading/Loading";
import { toast, Bounce } from "react-toastify";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_KEY;

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0); // rating
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const categories = [
    "shoes",
    "bags",
    "jewelry",
    "beauty",
    "mens-clothing",
    "womens-clothing",
    "baby-items",
    "eyewear",
    "seasonal",
  ];

  // Fetch product
  useEffect(() => {
    axios.get(`https://b2-b-server-drab.vercel.app/products/${id}`).then((res) => {
      setProduct(res.data);
      setImageUrl(res.data.image || "");
      setValue(res.data.rating || 0);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loading />;

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        formData
      );
      setImageUrl(res.data.data.url);
      toast("Image uploaded successfully!", { position: "top-right", autoClose: 1500, transition: Bounce });
    } catch (err) {
      toast("Image upload failed!", { position: "top-right", autoClose: 2000, transition: Bounce });
    } finally {
      setUploading(false);
    }
  };

  // Handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = Object.fromEntries(formData.entries());
    updated.image = imageUrl;
    updated.rating = value;

    try {
      await axios.put(`https://b2-b-server-drab.vercel.app/products/${id}`, updated);
      toast("Updated Successfully!", { position: "top-right", autoClose: 2000, transition: Bounce });
      navigate("/");
    } catch (err) {
      toast("Update failed!", { position: "top-right", autoClose: 2000, transition: Bounce });
    }
  };

  return (
    <Card className=" p-6">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Update Product</CardTitle>
        <CardDescription className="text-center">Edit product details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 mt-10">
          {/* Left column: Image */}
          <div className="flex flex-col items-center gap-4">
            {imageUrl ? (
              <img src={imageUrl} alt={product.name} className="w-48 lg:w-92 h-92 object-cover rounded-lg shadow" />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">IMG</div>
            )}
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
            {uploading && <p className="text-indigo-600 font-semibold">Uploading...</p>}
          </div>

          {/* Right column: Fields */}
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input name="name" defaultValue={product.name} required />
            </div>

            <div className="space-y-2">
              <Label>Main Quantity</Label>
              <Input name="mainQuantity" type="number" defaultValue={product.mainQuantity} required />
            </div>

            <div className="space-y-2">
              <Label>Minimum Selling Quantity</Label>
              <Input name="minSellingQuantity" type="number" defaultValue={product.minSellingQuantity} required />
            </div>

            <div className="space-y-2">
              <Label>Brand</Label>
              <Input name="brand" defaultValue={product.brand} required />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <select name="category" defaultValue={product.category} className="border rounded-xl p-2 w-full" required>
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Short Description</Label>
              <Textarea name="description" defaultValue={product.description} required />
            </div>

            <div className="space-y-2">
              <Label>Price</Label>
              <Input name="price" type="number" defaultValue={product.price} required />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <Rating style={{ maxWidth: 180 }} value={value} onChange={v => setValue(v < 1 ? 1 : v)} />
              <input type="hidden" name="rating" value={value} />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="email" defaultValue={user.email} readOnly />
            </div>

            <Button type="submit" className="w-full mt-2">Update</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Update;
