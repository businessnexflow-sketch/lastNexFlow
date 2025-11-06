import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, updateOrderSchema, type AttachedFile } from "@shared/schema";
import { sendOrderConfirmationEmail, sendOrderNotificationEmail } from "./services/email";
import { sendOrderNotificationToSlack } from "./services/slack";
import multer from "multer";
import path from "path";

// Type alias to avoid Express namespace usage
type MulterFile = Express.Multer.File;

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB limit for Vercel
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.csv', '.json', '.pdf', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Order management routes
  app.post("/api/orders", upload.array('files', 5), async (req, res) => {
    try {
      console.log('Request body:', req.body);
      console.log('Request files:', req.files);

      // Parse JSON fields that come as strings from FormData
      const parsedBody = { ...req.body } as Record<string, unknown>;
      if (parsedBody.integrations && typeof parsedBody.integrations === 'string') {
        try {
          parsedBody.integrations = JSON.parse(parsedBody.integrations as string);
        } catch (e) {
          console.error('Failed to parse integrations:', e);
        }
      }
      if (parsedBody.hasCredentials && typeof parsedBody.hasCredentials === 'string') {
        try {
          parsedBody.hasCredentials = JSON.parse(parsedBody.hasCredentials as string);
        } catch (e) {
          console.error('Failed to parse hasCredentials:', e);
        }
      }

      const orderData = insertOrderSchema.parse(parsedBody);

      // Handle file uploads
      const files = req.files as MulterFile[];
      const attachedFiles: AttachedFile[] = files?.map(file => ({
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      })) || [];

      const order = await storage.createOrder({
        ...orderData,
        attachedFiles,
      });

      // Send notifications
      try {
        await Promise.all([
          sendOrderConfirmationEmail(order.email, order.fullName, order.orderId),
          sendOrderNotificationEmail(['business.nexflow@gmail.com', 'giorginatsvlishvili2010@gmail.com', 'svimonishvilitoka@gmail.com'], order),
          sendOrderNotificationToSlack(order)
        ]);
      } catch (notificationError) {
        console.error('Notification error:', notificationError);
        // Don't fail the order creation if notifications fail
      }

      res.json({ success: true, orderId: order.orderId });
    } catch (error) {
      console.error('Order creation and processing error:', error);
      console.error('Request body that caused the error:', req.body);
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred during order processing. Please check logs for details.',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  });

  app.get("/api/orders", async (_req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Failed to fetch order by ID:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  });

  app.get("/api/orders/by-order-id/:orderId", async (req, res) => {
    try {
      const order = await storage.getOrderByOrderId(req.params.orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Failed to fetch order by Order ID:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  });

  app.patch("/api/orders/:id", async (req, res) => {
    try {
      const updates = updateOrderSchema.parse(req.body);
      const order = await storage.updateOrder(req.params.id, updates);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error('Order update error:', error);
      res.status(400).json({
        error: "Invalid input data",
        message: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    }
  });

  app.delete("/api/orders/:id", async (req, res) => {
    try {
      const success = await storage.deleteOrder(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ success: true });
    } catch (error) {
      console.error('Order delete error:', error);
      res.status(500).json({ error: 'Failed to delete order' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
