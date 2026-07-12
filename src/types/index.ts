export type UserRole = 'customer' | 'staff' | 'driver' | 'picker' | 'cashier';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Product {
  id: string;
  barcode_string: string;
  name: string;
  brand: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  unit_type?: 'unit' | 'weight';
}

export type OrderStatus =
  | 'pending'
  | 'picking'
  | 'picked'
  | 'ready_for_pickup'
  | 'paid'
  | 'completed';

export interface Order {
  id: string;
  customer_id: string;
  customer_name?: string;
  total_price: number;
  status: OrderStatus;
  delivery_fee: number;
  payment_method: 'pay_when_pick' | 'pay_online';
  picker_id?: string;
  pickup_slot?: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  picked: boolean;
  product?: Product;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  message: string;
  read: boolean;
  created_at: string;
}
