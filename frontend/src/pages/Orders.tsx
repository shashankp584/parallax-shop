import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Calendar } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { orderService, Order } from "@/services/order.service";
import { toast } from "sonner";

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error("Please sign in to view orders");
      navigate("/auth");
      return;
    }

    orderService
      .getMyOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your orders
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        Order #{order.id}
                      </h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary">{order.status}</Badge>
                  </div>

                  <div className="text-lg font-bold">
                    Total: ₹{order.totalAmount.toFixed(2)}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
