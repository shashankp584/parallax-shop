import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

// Import all product images
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

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

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
              src={imageMap[product.image]}
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
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            {product.featured && (
              <Badge variant="secondary" className="text-xs">
                Featured
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">(124)</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="icon"
              onClick={() => addToCart(product)}
              className="rounded-full"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>

          {product.stock < 10 && (
            <p className="text-xs text-destructive">Only {product.stock} left in stock!</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
