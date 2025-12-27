import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { Product } from "@/services/product.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product & { image?: string };
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const imageUrl =
    product.images?.[0]?.url ||
    "https://placehold.co/600x600?text=No+Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-border hover:shadow-card-hover transition-all duration-300 card-3d">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden bg-muted">
            <motion.img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </Link>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              {product.category && (
                <p className="text-sm text-muted-foreground">
                  {product.category}
                </p>
              )}
            </div>

            {product.stock === 0 && (
              <Badge variant="destructive" className="text-xs">
                Out of stock
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              ₹{product.price.toFixed(2)}
            </span>

            <Button
              size="icon"
              onClick={() => addToCart(product)}
              className="rounded-full"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>

          {product.stock > 0 && product.stock < 10 && (
            <p className="text-xs text-destructive">
              Only {product.stock} left in stock!
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
