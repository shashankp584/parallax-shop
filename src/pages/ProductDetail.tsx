import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Minus, Plus, Package, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import productsData from '@/data/products.json';
import { Product } from '@/lib/types';

import headphonesImg from '@/assets/product-headphones.jpg';
import watchImg from '@/assets/product-watch.jpg';
import backpackImg from '@/assets/product-backpack.jpg';
import sunglassesImg from '@/assets/product-sunglasses.jpg';
import laptopBagImg from '@/assets/product-laptop-bag.jpg';
import earbudsImg from '@/assets/product-earbuds.jpg';

const imageMap: Record<string, string> = {
  'product-headphones': headphonesImg,
  'product-watch': watchImg,
  'product-backpack': backpackImg,
  'product-sunglasses': sunglassesImg,
  'product-laptop-bag': laptopBagImg,
  'product-earbuds': earbudsImg,
};

const products = productsData as Product[];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={imageMap[product.image]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.featured && (
                <Badge className="absolute top-4 left-4">Featured</Badge>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <Badge variant="outline" className="mb-3">
                  {product.category}
                </Badge>
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} (124 reviews)
                  </span>
                </div>
                <p className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-success" />
                <span className="text-sm">
                  {product.stock > 10 ? (
                    <span className="text-success">In Stock</span>
                  ) : (
                    <span className="text-destructive">
                      Only {product.stock} left!
                    </span>
                  )}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Features */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-sm">Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm">Secure payment guaranteed</span>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="text-sm">30-day return policy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
