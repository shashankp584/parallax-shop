import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, MapPin, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { orderService } from "@/services/order.service";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  if (!user) {
    toast.error("Please sign in to checkout");
    navigate("/auth");
    return null;
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await orderService.createOrder({
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingLine1: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        country: formData.country,
      });

      toast.success("Order placed successfully");
      clearCart();
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Street</Label>
                    <Input
                      required
                      value={formData.street}
                      onChange={(e) =>
                        setFormData({ ...formData, street: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Input
                        required
                        value={formData.state}
                        onChange={(e) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>ZIP</Label>
                      <Input
                        required
                        value={formData.zip}
                        onChange={(e) =>
                          setFormData({ ...formData, zip: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input
                        required
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
