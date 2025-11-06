import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

// Lazily initialize the transporter so dotenv has a chance to run before we read process.env
async function ensureTransporter(): Promise<nodemailer.Transporter | null> {
  if (transporter) return transporter;

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        // Allow self-signed certificates in development
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      }
    });

    try {
      // verify will attempt to connect and authenticate
      await transporter.verify();
      console.log('Gmail email service initialized successfully');
    } catch (err) {
      console.error('Failed to verify Gmail transporter:', err);
      transporter = null;
    }
  } else {
    console.warn('Gmail credentials not provided - email functionality will be disabled');
    console.warn('Required: GMAIL_USER (your gmail address) and GMAIL_APP_PASSWORD (app-specific password)');
  }

  return transporter;
}

interface EmailParams {
  to: string | string[];
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: Buffer | string;
    contentType?: string;
  }>;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  await ensureTransporter();

  if (!transporter) {
    console.warn('Email service not available - skipping email send');
    return false;
  }
  
  try {
    const mailOptions: nodemailer.SendMailOptions = {
      from: params.from || process.env.GMAIL_USER,
      to: params.to,
      subject: params.subject,
    };
    
    if (params.text) {
      mailOptions.text = params.text;
    }
    
    if (params.html) {
      mailOptions.html = params.html;
    }

    if (params.attachments) {
      mailOptions.attachments = params.attachments;
    }
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Gmail email error:', error);
    return false;
  }
}

export async function sendOrderConfirmationEmail(
  customerEmail: string,
  customerName: string,
  orderId: string
): Promise<boolean> {
  const georgianSubject = `შეკვეთის დადასტურება - ${orderId}`;
  const georgianHtml = `
    <h2>მადლობა შეკვეთისთვის!</h2>
    <p>ძვირფასო ${customerName},</p>
    <p>თქვენი შეკვეთა წარმატებით მიიღეს.</p>
    <p><strong>შეკვეთის ID:</strong> ${orderId}</p>
    <p>ჩვენ მალე დაგიკავშირდებით პროექტის დეტალების განსახილველად.</p>
    <br>
    <p>პატივისცემით,<br>NexFlow გუნდი</p>
  `;

  return sendEmail({
    to: customerEmail,
    from: process.env.GMAIL_USER,
    subject: georgianSubject,
    html: georgianHtml,
  });
}

export async function sendOrderNotificationEmail(
  adminEmails: string | string[],
  order: any
): Promise<boolean> {
  const subject = `🆕 ახალი შეკვეთა მიღებულია - ${order.orderId}`;
  
  // Helper function to format automation type
  const formatAutomationType = (type: string) => {
    const types: Record<string, string> = {
      'whatsapp_chatbot': 'WhatsApp/Messenger ჩატბოტი',
      'crm_integration': 'CRM ინტეგრაცია',
      'email_automation': 'ელექტრონული ფოსტის ავტომატიზაცია',
      'file_sync': 'ფაილების სინქრონიზაცია / ETL',
      'custom_workflow': 'მორგებული Workflow'
    };
    return types[type] || type;
  };

  // Helper function to format delivery speed
  const formatDeliverySpeed = (speed: string) => {
    const speeds: Record<string, string> = {
      'standard': 'სტანდარტული (7-14 დღე)',
      'fast': 'სწრაფი (3-5 დღე)'
    };
    return speeds[speed] || speed;
  };

  // Helper function to format order status
  const formatOrderStatus = (status: string) => {
    const statuses: Record<string, {label: string, color: string}> = {
      'new': {label: 'ახალი', color: '#28a745'},
      'in_review': {label: 'განხილვაში', color: '#007bff'},
      'in_progress': {label: 'მუშაობს', color: '#ffc107'},
      'delivered': {label: 'მიწოდებული', color: '#17a2b8'},
      'closed': {label: 'დახურული', color: '#6c757d'}
    };
    return statuses[status] || {label: status, color: '#6c757d'};
  };

  // Helper function to format credentials
  const formatCredentials = (credentials: Record<string, boolean>) => {
    if (!credentials || Object.keys(credentials).length === 0) {
      return '<p style="color: #666;">მონაცემები არ არის მითითებული</p>';
    }
    
    return Object.entries(credentials).map(([integration, hasCredentials]) => `
      <div style="background: #f8f9fa; padding: 8px; margin: 4px 0; border-radius: 4px; display: flex; justify-content: space-between;">
        <span><strong>${integration}:</strong></span>
        <span style="color: ${hasCredentials ? '#28a745' : '#dc3545'};">
          ${hasCredentials ? '✅ აქვს' : '❌ არ აქვს'}
        </span>
      </div>
    `).join('');
  };

  // Format attached files
  const formatAttachedFiles = (files: any[]) => {
    if (!files || files.length === 0) return '<p style="color: #666;">ფაილები არ არის ატვირთული</p>';
    
    return files.map(file => `
      <div style="background: #f8f9fa; padding: 8px; margin: 4px 0; border-radius: 4px; border-left: 3px solid #007bff;">
        <strong>${file.originalName}</strong><br>
        <small style="color: #666;">ზომა: ${(file.size / 1024 / 1024).toFixed(2)} MB | ტიპი: ${file.mimetype}</small>
      </div>
    `).join('');
  };

  // Format integrations
  const formatIntegrations = (integrations: string[]) => {
    if (!integrations || integrations.length === 0) return '<p style="color: #666;">ინტეგრაციები არ არის არჩეული</p>';
    
    return integrations.map(integration => `
      <span style="background: #e3f2fd; color: #1976d2; padding: 4px 8px; border-radius: 12px; font-size: 12px; margin: 2px; display: inline-block;">
        ${integration}
      </span>
    `).join('');
  };

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>ახალი შეკვეთა</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🆕 ახალი შეკვეთა მიღებულია</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">შეკვეთის ID: <strong>${order.orderId}</strong></p>
      </div>

      <!-- Main Content -->
      <div style="background: white; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px; padding: 30px;">
        
        <!-- Customer Information -->
        <section style="margin-bottom: 30px;">
          <h2 style="color: #667eea; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">
            👤 კლიენტის ინფორმაცია
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">სახელი:</td>
              <td style="padding: 8px 0;">${order.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">ელფოსტა:</td>
              <td style="padding: 8px 0;"><a href="mailto:${order.email}" style="color: #667eea;">${order.email}</a></td>
            </tr>
            ${order.phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">ტელეფონი:</td>
              <td style="padding: 8px 0;"><a href="tel:${order.phone}" style="color: #667eea;">${order.phone}</a></td>
            </tr>
            ` : ''}
            ${order.company ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">კომპანია:</td>
              <td style="padding: 8px 0;">${order.company}</td>
            </tr>
            ` : ''}
          </table>
        </section>

        <!-- Project Information -->
        <section style="margin-bottom: 30px;">
          <h2 style="color: #667eea; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">
            🚀 პროექტის ინფორმაცია
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">პროექტი:</td>
              <td style="padding: 8px 0;"><strong>${order.projectName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">ტიპი:</td>
              <td style="padding: 8px 0;">${formatAutomationType(order.automationType)}</td>
            </tr>
            ${order.customDescription ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">აღწერილობა:</td>
              <td style="padding: 8px 0; background: #f8f9fa; border-radius: 4px; padding: 12px;">${order.customDescription}</td>
            </tr>
            ` : ''}
          </table>
        </section>

        <!-- Integrations -->
        <section style="margin-bottom: 30px;">
          <h2 style="color: #667eea; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">
            🔗 ინტეგრაციები
          </h2>
          <div style="margin-top: 10px;">
            ${formatIntegrations(order.integrations || [])}
          </div>
          
          <!-- Credentials Status -->
          ${order.hasCredentials ? `
          <div style="margin-top: 20px;">
            <h3 style="font-size: 16px; margin-bottom: 10px; color: #333;">🔐 ინტეგრაციის მონაცემები:</h3>
            ${formatCredentials(order.hasCredentials)}
          </div>
          ` : ''}
        </section>

        <!-- Files & Examples -->
        <section style="margin-bottom: 30px;">
          <h2 style="color: #667eea; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">
            📁 ფაილები და მაგალითები
          </h2>
          <div style="margin-bottom: 15px;">
            <strong>ატვირთული ფაილები:</strong>
            ${formatAttachedFiles(order.attachedFiles || [])}
          </div>
          ${order.exampleLink ? `
          <div>
            <strong>მაგალიტის ლინკი:</strong><br>
            <a href="${order.exampleLink}" style="color: #667eea; word-break: break-all;" target="_blank">${order.exampleLink}</a>
          </div>
          ` : ''}
        </section>

        <!-- Timeline & Priority -->
        <section style="margin-bottom: 30px;">
          <h2 style="color: #667eea; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">
            ⏰ ვადები და პრიორიტეტი
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${order.deliverySpeed ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">მიწოდების სიჩქარე:</td>
              <td style="padding: 8px 0;">${formatDeliverySpeed(order.deliverySpeed)}</td>
            </tr>
            ` : ''}
            ${order.priorityNotes ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">შენიშვნები:</td>
              <td style="padding: 8px 0; background: #fff3cd; border-radius: 4px; padding: 12px; border-left: 4px solid #ffc107;">${order.priorityNotes}</td>
            </tr>
            ` : ''}
          </table>
        </section>

        <!-- Order Metadata -->
        <section style="margin-bottom: 30px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <h2 style="color: #667eea; font-size: 18px; margin-bottom: 15px;">
            📋 შეკვეთის დეტალები
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 120px;">სისტემის ID:</td>
              <td style="padding: 4px 0; font-family: monospace; color: #667eea; font-size: 12px;">${order.id}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">შეკვეთის ID:</td>
              <td style="padding: 4px 0; font-family: monospace; color: #667eea;">${order.orderId}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">შექმნის თარიღი:</td>
              <td style="padding: 4px 0;">${new Date(order.createdAt).toLocaleString('ka-GE')}</td>
            </tr>
            ${order.updatedAt && new Date(order.updatedAt).getTime() !== new Date(order.createdAt).getTime() ? `
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">ბოლო განახლება:</td>
              <td style="padding: 4px 0;">${new Date(order.updatedAt).toLocaleString('ka-GE')}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">სტატუსი:</td>
              <td style="padding: 4px 0;">
                <span style="background: ${formatOrderStatus(order.status || 'new').color}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                  ${formatOrderStatus(order.status || 'new').label}
                </span>
              </td>
            </tr>
            ${order.adminNotes ? `
            <tr>
              <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">ადმინის შენიშვნები:</td>
              <td style="padding: 4px 0; background: #fff3cd; border-radius: 4px; padding: 8px; border-left: 4px solid #ffc107; font-size: 14px;">${order.adminNotes}</td>
            </tr>
            ` : ''}
          </table>
        </section>

        <!-- Action Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${
            (process.env.SITE_URL ? `${process.env.SITE_URL.replace(/\/$/, '')}/admin` : null) ||
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/admin` : 'http://localhost:5000/admin')
          }" 
             style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            📊 ადმინ პანელში ნახვა
          </a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px;">
          <p>ეს ელფოსტა გაიგზავნა ავტომატურად n8n ავტომატიზაციის სისტემიდან</p>
        </div>

      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: adminEmails,
    from: process.env.GMAIL_USER,
    subject,
    html,
  });
}

export async function testGmailSMTPConnection(): Promise<void> {
  await ensureTransporter();

  if (!transporter) {
    console.warn('Email service not available - skipping SMTP test');
    return;
  }

  try {
    const testEmail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_TEST_RECIPIENT || process.env.GMAIL_USER, // Sending to self or a configurable test recipient
      subject: 'SMTP Test Email',
      text: 'This is a test email to verify Gmail SMTP connection.',
    };

    const info = await transporter.sendMail(testEmail);
    console.log('Test email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error during SMTP test:', error);
  }
}
