import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Order } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Loader2, 
  User, 
  Mail, 
  Building, 
  Calendar, 
  FileText, 
  Download,
  MessageSquare,
  Clock,
  ExternalLink
} from "lucide-react";
import { formatDistance, format } from "date-fns";

interface OrderDetailProps {
  orderId: string;
}

export default function OrderDetail({ orderId }: OrderDetailProps) {
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ['/api/orders', orderId],
    enabled: !!orderId,
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (data: { status?: string; adminNotes?: string }) => {
      return apiRequest("PATCH", `/api/orders/${orderId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      queryClient.invalidateQueries({ queryKey: ['/api/orders', orderId] });
      toast({
        title: "Success",
        description: "Order updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order",
        variant: "destructive",
      });
    },
  });

  const handleStatusUpdate = (newStatus: string) => {
    updateOrderMutation.mutate({ status: newStatus });
  };

  const handleNotesUpdate = () => {
    updateOrderMutation.mutate({ adminNotes });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Order not found
      </div>
    );
  }

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
      case "whatsapp_chatbot": return "WhatsApp Chatbot";
      case "crm_integration": return "CRM Integration";
      case "email_automation": return "Email Automation";
      case "file_sync": return "File Sync / ETL";
      case "custom_workflow": return "Custom Workflow";
      default: return type;
    }
  };

  const formatExactDate = (d?: string | Date | null) => {
    if (!d) return "";
    try {
      return format(new Date(d), 'dd.MM.yyyy, HH:mm:ss');
    } catch (e) {
      return String(d);
    }
  };

  const getDeliveryRange = (created?: string | Date | null, speed?: string | null) => {
    if (!created || !speed) return null;
    const createdDate = new Date(created);
    let minDays = 0;
    let maxDays = 0;
    if (speed === 'standard') {
      minDays = 7;
      maxDays = 14;
    } else if (speed === 'fast') {
      minDays = 3;
      maxDays = 5;
    } else {
      return null;
    }
    const minDate = new Date(createdDate);
    minDate.setDate(minDate.getDate() + minDays);
    const maxDate = new Date(createdDate);
    maxDate.setDate(maxDate.getDate() + maxDays);
    return `${format(minDate, 'dd.MM.yyyy')} — ${format(maxDate, 'dd.MM.yyyy')}`;
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{order.orderId}</h3>
          <Badge className={getStatusColor(order.status ?? "new")}>
            {getStatusLabel(order.status ?? "new")}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Created {order.createdAt ? formatDistance(new Date(order.createdAt), new Date(), { addSuffix: true }) : ""}
          <span className="ml-2 text-xs text-muted-foreground">({formatExactDate(order.createdAt)})</span>
          {order.updatedAt && order.createdAt && order.updatedAt !== order.createdAt && (
            <span>
              • Updated {formatDistance(new Date(order.updatedAt), new Date(), { addSuffix: true })}
            </span>
          )}
        </p>
      </div>

      <Separator />

      {/* Customer Info */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <User className="w-4 h-4" />
          Customer Information
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">Name:</span>
            {order.fullName}
          </div>
            {order.phone && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{order.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-medium">System ID:</span>
              <span className="text-sm">{order.id}</span>
            </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <a href={`mailto:${order.email}`} className="text-primary hover:underline">
              {order.email}
            </a>
          </div>
          {order.company && (
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-muted-foreground" />
              {order.company}
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Project Details */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Project Details
        </h4>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Project Name:</span><br />
            {order.projectName}
          </div>
          <div>
            <span className="font-medium">Automation Type:</span><br />
            {getAutomationTypeLabel(order.automationType)}
          </div>
          {order.customDescription && (
            <div>
              <span className="font-medium">Custom Description:</span><br />
              <div className="bg-muted p-2 rounded text-muted-foreground mt-1">
                {order.customDescription}
              </div>
            </div>
          )}
          {order.integrations && order.integrations.length > 0 && (
            <div>
              <span className="font-medium">Integrations:</span><br />
              <div className="flex flex-wrap gap-1 mt-1">
                {order.integrations.map((integration: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {integration}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {(!order.integrations || order.integrations.length === 0) && (
            <div>
              <span className="font-medium">Integrations:</span><br />
              <div className="text-sm text-muted-foreground mt-1">No integrations selected</div>
            </div>
          )}

          {/* Integration credentials/details */}
          <div>
            <span className="font-medium">Integration Data:</span><br />
            {order.hasCredentials && Object.keys(order.hasCredentials || {}).length > 0 ? (
              <div className="bg-muted p-2 rounded text-sm mt-1">
                {Object.entries(order.hasCredentials).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="font-medium">{key}:</span>
                    <span className="break-all">{String(val)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground mt-1">No integration data provided</div>
            )}
          </div>
          {order.deliverySpeed && (
            <div>
              <span className="font-medium">Delivery Speed:</span><br />
              <div className="mt-1">
                {order.deliverySpeed === 'standard' ? 'Standard (7-14 days)' : 'Fast (3-5 days)'}
                {getDeliveryRange(order.createdAt, order.deliverySpeed) && (
                  <div className="text-sm text-muted-foreground">Estimated delivery: {getDeliveryRange(order.createdAt, order.deliverySpeed)}</div>
                )}
              </div>
            </div>
          )}
          {order.priorityNotes && (
            <div>
              <span className="font-medium">Priority Notes:</span><br />
              <div className="bg-muted p-2 rounded text-muted-foreground mt-1">
                {order.priorityNotes}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Files */}
      {Array.isArray(order.attachedFiles) && order.attachedFiles.length > 0 ? (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Attached Files
            </h4>
            <div className="space-y-2">
              {order.attachedFiles.map((file: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{file.originalName}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(file.size / 1024)}KB
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" data-testid={`download-file-${index}`}>
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Attached Files
            </h4>
            <div className="text-sm text-muted-foreground">No files uploaded</div>
          </div>
        </>
      )}

      {/* External Links */}
      {order.exampleLink && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              External Links
            </h4>
            <div>
              <a 
                href={order.exampleLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm flex items-center gap-1"
                data-testid="external-link"
              >
                {order.exampleLink}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </>
      )}

      <Separator />

      {/* Status Update */}
      <div className="space-y-3">
        <h4 className="font-medium">Update Status</h4>
        <Select value={order.status ?? "new"} onValueChange={handleStatusUpdate}>
          <SelectTrigger data-testid="select-order-status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Admin Notes */}
      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Admin Notes
        </h4>
        <Textarea
          placeholder="Add internal notes about this order..."
          value={adminNotes || (order.adminNotes ?? "")}
          onChange={(e) => setAdminNotes(e.target.value)}
          className="min-h-[100px]"
          data-testid="textarea-admin-notes"
        />
        <Button
          onClick={handleNotesUpdate}
          disabled={updateOrderMutation.isPending}
          size="sm"
          data-testid="button-save-notes"
        >
          {updateOrderMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Notes"
          )}
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open(`mailto:${order.email ?? ""}?subject=Your Order ${order.orderId ?? ""}`, '_blank')}
          data-testid="button-email-customer"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Customer
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            const orderDetails = `Order ID: ${order.orderId ?? ""}\nCustomer: ${order.fullName ?? ""}\nProject: ${order.projectName ?? ""}\nStatus: ${getStatusLabel(order.status ?? "new")}`;
            navigator.clipboard.writeText(orderDetails);
            toast({
              title: "Copied",
              description: "Order details copied to clipboard",
            });
          }}
          data-testid="button-copy-details"
        >
          Copy Details
        </Button>
      </div>
    </div>
  );
}
