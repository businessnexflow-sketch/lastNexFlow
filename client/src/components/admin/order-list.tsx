import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, User, Building } from "lucide-react";
import { formatDistance } from "date-fns";

interface Order {
  id: string;
  orderId: string;
  fullName: string;
  email: string;
  company?: string;
  projectName: string;
  automationType: string;
  status: string;
  createdAt: string;
}

interface OrderListProps {
  orders: Order[];
  onSelectOrder: (orderId: string) => void;
  selectedOrderId: string | null;
}

export default function OrderList({ orders, onSelectOrder, selectedOrderId }: OrderListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.projectName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name":
          return a.fullName.localeCompare(b.fullName);
        default:
          return 0;
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "in_review": return "bg-yellow-100 text-yellow-800";
      case "in_progress": return "bg-orange-100 text-orange-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new": return "New";
      case "in_review": return "In Review";
      case "in_progress": return "In Progress";
      case "delivered": return "Delivered";
      case "closed": return "Closed";
      default: return status;
    }
  };

  const getAutomationTypeLabel = (type: string) => {
    switch (type) {
      case "whatsapp_chatbot": return "WhatsApp Bot";
      case "crm_integration": return "CRM Integration";
      case "email_automation": return "Email Automation";
      case "file_sync": return "File Sync";
      case "custom_workflow": return "Custom Workflow";
      default: return type;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name, email, order ID, or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-orders"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-status-filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-sort-by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No orders found matching your criteria
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card
              key={order.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedOrderId === order.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onSelectOrder(order.id)}
              data-testid={`order-card-${order.orderId}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {order.orderId}
                    </span>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true })}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{order.fullName}</span>
                    <span className="text-muted-foreground">({order.email})</span>
                  </div>
                  
                  {order.company && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="w-4 h-4" />
                      <span>{order.company}</span>
                    </div>
                  )}

                  <div className="text-sm">
                    <span className="font-medium text-foreground">Project:</span>{' '}
                    {order.projectName}
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-foreground">Type:</span>{' '}
                    {getAutomationTypeLabel(order.automationType)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
