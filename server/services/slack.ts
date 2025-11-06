import { WebClient, type ChatPostMessageArguments } from "@slack/web-api";

let slack: WebClient | null = null;

if (process.env.SLACK_BOT_TOKEN && process.env.SLACK_CHANNEL_ID) {
  slack = new WebClient(process.env.SLACK_BOT_TOKEN);
} else {
  console.warn("Slack credentials not provided - Slack notifications will be disabled");
}

export async function sendSlackMessage(
  message: ChatPostMessageArguments
): Promise<string | undefined> {
  if (!slack) {
    console.warn('Slack service not available - skipping Slack message');
    return undefined;
  }
  
  try {
    const response = await slack.chat.postMessage(message);
    return response.ts;
  } catch (error) {
    console.error('Error sending Slack message:', error);
    throw error;
  }
}

export async function sendOrderNotificationToSlack(order: any): Promise<void> {
  if (!slack || !process.env.SLACK_CHANNEL_ID) {
    console.warn('Slack service not available - skipping Slack notification');
    return;
  }
  
  const channel = process.env.SLACK_CHANNEL_ID;
  
  await sendSlackMessage({
    channel,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*🆕 New Order Received*'
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Order ID:*\n${order.orderId}`
          },
          {
            type: 'mrkdwn',
            text: `*Customer:*\n${order.fullName}`
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${order.email}`
          },
          {
            type: 'mrkdwn',
            text: `*Project:*\n${order.projectName}`
          },
          {
            type: 'mrkdwn',
            text: `*Type:*\n${order.automationType}`
          },
          {
            type: 'mrkdwn',
            text: `*Created:*\n${new Date(order.createdAt).toLocaleString()}`
          }
        ]
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View in Admin'
            },
            url: `${process.env.REPLIT_DOMAINS?.split(',')[0] || 'http://localhost:5000'}/admin`
          }
        ]
      }
    ]
  });
}
