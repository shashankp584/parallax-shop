import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { productService, Product } from "@/services/product.service";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");

  // Fetch products from backend
  useEffect(() => {
    productService
      .getProducts()
      .then((res) => setProducts(res.items))
      .finally(() => setLoading(false));
  }, []);

  // Extract categories dynamically
  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    ) as string[];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "latest":
      default:
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-xl text-muted-foreground">
            Discover our complete collection
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  image: product.images[0]?.url,
                }}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground">
              No products found matching your criteria
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
