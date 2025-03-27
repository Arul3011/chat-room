import { useState } from "react";

const AddProduct = () => {
  const [category, setCategory] = useState("Balls");
  const [product, setProduct] = useState({
    brand: "",
    description: "",
    mrp: "",
    dealPrice: "",
    sizes: [],
    images: [],
  });

  const categoriesWithSizes = ["Shoes", "Apparels"];

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSizeSelection = (size) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    
    setProduct((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));

    console.log("Image URLs:", imageUrls); // Logging the image URLs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.brand || !product.description || !product.mrp || !product.dealPrice || (categoriesWithSizes.includes(category) && product.sizes.length === 0)) {
      alert("Please fill in all required fields.");
      return;
    }

    const jsonData = {
      brand: product.brand,
      description: product.description,
      mrp: product.mrp,
      dealPrice: product.dealPrice,
      category,
      sizes: product.sizes,
    };

    console.log("Data to send:", jsonData); // Debugging before sending

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      console.log("Response from server:", result);

      if (response.ok) {
        alert("Product added successfully!");
        setProduct({
          brand: "",
          description: "",
          mrp: "",
          dealPrice: "",
          sizes: [],
          images: [],
        });
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category:</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {["Balls", "Clubs", "Shoes", "Apparels", "Daily Needs", "Grips", "Trolleys", "Training", "Bags"].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Brand Name:</label>
            <input type="text" name="brand" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={product.brand} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description:</label>
            <textarea name="description" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={product.description} onChange={handleChange} required></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">MRP:</label>
            <input type="number" name="mrp" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={product.mrp} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Deal Price:</label>
            <input type="number" name="dealPrice" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={product.dealPrice} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Images:</label>
            <input type="file" multiple accept="image/*" className="w-full p-3 border border-gray-300 rounded-lg" onChange={handleImageUpload} />
            {/* Displaying uploaded images */}
            <div className="mt-3 flex flex-wrap gap-2">
              {product.images.map((img, index) => (
                <img key={index} src={img} alt="Preview" className="w-16 h-16 object-cover rounded-lg border" />
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
