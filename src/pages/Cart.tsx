import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

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

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Add some products to get started!
          </p>
          <Button asChild size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{items.length} items in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={imageMap[item.product.image]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.category}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <span className="text-lg font-bold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 sticky top-20">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-success">
                    {total >= 100 ? 'FREE' : '$9.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (estimated)</span>
                  <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ${(total + (total >= 100 ? 0 : 9.99) + total * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="w-full mb-3">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                asChild
              >
                <Link to="/products">Continue Shopping</Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4 text-destructive"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
