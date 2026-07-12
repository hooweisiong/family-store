const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/ws/orders';

type MessageHandler = (data: unknown) => void;

export class WebSocketService {
  private ws: WebSocket | null = null;
  private handlers = new Map<string, MessageHandler[]>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  connect(token: string): void {
    this.ws = new WebSocket(`${WS_URL}?token=${token}`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.emit('status', 'connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.emit(message.type, message.payload);
      } catch {
        console.error('Failed to parse WebSocket message');
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.emit('status', 'disconnected');
      this.scheduleReconnect(token);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.ws?.close();
    this.ws = null;
  }

  on(type: string, handler: MessageHandler): void {
    const existing = this.handlers.get(type) || [];
    existing.push(handler);
    this.handlers.set(type, existing);
  }

  off(type: string, handler: MessageHandler): void {
    const existing = this.handlers.get(type) || [];
    this.handlers.set(
      type,
      existing.filter((h) => h !== handler)
    );
  }

  private emit(type: string, data: unknown): void {
    (this.handlers.get(type) || []).forEach((handler) => handler(data));
  }

  private scheduleReconnect(token: string): void {
    this.reconnectTimer = setTimeout(() => {
      console.log('Reconnecting WebSocket...');
      this.connect(token);
    }, 5000);
  }
}

export const wsService = new WebSocketService();
