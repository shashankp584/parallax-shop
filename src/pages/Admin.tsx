import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import productsData from '@/data/products.json';
import { Product, Order } from '@/lib/types';
import { toast } from 'sonner';

const products = productsData as Product[];

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [{ product: products[0], quantity: 1 }],
    total: 299.99,
    status: 'delivered',
    createdAt: '2024-03-15',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
  },
  {
    id: 'ORD-002',
    userId: '2',
    items: [{ product: products[1], quantity: 2 }],
    total: 799.98,
    status: 'processing',
    createdAt: '2024-03-18',
    shippingAddress: {
      name: 'Jane Smith',
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA',
    },
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  useEffect(() => {
    if (!user || !isAdmin) {
      toast.error('Admin access required');
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) return null;

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    revenue: orders.reduce((sum, order) => sum + order.total, 0),
    customers: new Set(orders.map(o => o.userId)).size,
  };

  const handleDeleteProduct = (id: string) => {
    toast.success('Product deleted (demo mode)');
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast.success('Order status updated');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your store</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Package, label: 'Products', value: stats.totalProducts, color: 'text-blue-500' },
            { icon: ShoppingCart, label: 'Orders', value: stats.totalOrders, color: 'text-green-500' },
            { icon: DollarSign, label: 'Revenue', value: `$${stats.revenue.toFixed(2)}`, color: 'text-primary' },
            { icon: Users, label: 'Customers', value: stats.customers, color: 'text-purple-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Products</h2>
                <Button onClick={() => toast.info('Add product feature (demo)')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.info('Edit product (demo)')}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Orders</h2>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.shippingAddress.name}</TableCell>
                        <TableCell>{order.createdAt}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'delivered'
                                ? 'default'
                                : order.status === 'cancelled'
                                ? 'destructive'
                                : 'secondary'
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <select
                            className="text-sm border rounded px-2 py-1"
                            value={order.status}
                            onChange={e =>
                              handleUpdateOrderStatus(order.id, e.target.value as Order['status'])
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
