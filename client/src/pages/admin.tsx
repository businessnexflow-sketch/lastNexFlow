import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OrderList from "@/components/admin/order-list";
import type { Order } from "@shared/schema";
import OrderDetail from "@/components/admin/order-detail";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Package, Clock, CheckCircle, XCircle } from "lucide-react";

export default function Admin(): JSX.Element {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // fetch orders from the API
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText} ${text}`);
      }
      return (await res.json()) as Order[];
    },
    // optional: avoid refetching too often
    staleTime: 1000 * 60, // 1 minute
  });

  // Calculate stats (rename `new` to `newOrders`)
  const stats = orders
    ? {
        total: orders.length,
        newOrders: orders.filter((order) => order.status === "new").length,
        inProgress: orders.filter((order) => order.status === "in_progress").length,
        delivered: orders.filter((order) => order.status === "delivered").length,
        closed: orders.filter((order) => order.status === "closed").length,
      }
    : { total: 0, newOrders: 0, inProgress: 0, delivered: 0, closed: 0 };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg text-center">
          <p className="text-red-600 font-medium">Failed to load orders</p>
          <p className="text-sm text-muted-foreground mt-2">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage orders and track project progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Badge variant="secondary" className="mb-2">
                New
              </Badge>
              <div className="text-2xl font-bold text-foreground">{stats.newOrders}</div>
              <div className="text-sm text-muted-foreground">New Orders</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-foreground">{stats.delivered}</div>
              <div className="text-sm text-muted-foreground">Delivered</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="w-6 h-6 mx-auto mb-2 text-gray-500" />
              <div className="text-2xl font-bold text-foreground">{stats.closed}</div>
              <div className="text-sm text-muted-foreground">Closed</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderList
                  orders={(orders || []).map(order => ({
                    ...order,
                    company: order.company ?? undefined,
                    status: order.status ?? "new",
                    createdAt: typeof order.createdAt === "string" ? order.createdAt : (order.createdAt ? order.createdAt.toString() : ""),
                    updatedAt: typeof order.updatedAt === "string" ? order.updatedAt : (order.updatedAt ? order.updatedAt.toString() : ""),
                  }))}
                  onSelectOrder={setSelectedOrderId}
                  selectedOrderId={selectedOrderId}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Detail */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedOrderId ? (
                  <OrderDetail orderId={selectedOrderId} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">Select an order to view details</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
