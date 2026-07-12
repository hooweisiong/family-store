import { Product, Order } from '@/types';

export const testProducts: Product[] = [
  { id: 'p1', barcode_string: '9556001001001', name: 'Fresh Chicken', brand: 'Local Farm', price: 9.50, stock_quantity: 30, image_url: '', unit_type: 'weight' },
  { id: 'p2', barcode_string: '9556001002002', name: 'Prawns', brand: 'SeaFresh', price: 22.00, stock_quantity: 15, image_url: '', unit_type: 'weight' },
  { id: 'p3', barcode_string: '9556001003003', name: 'Eggs Grade A (10pcs)', brand: 'FarmBest', price: 6.50, stock_quantity: 40, image_url: '' },
  { id: 'p4', barcode_string: '9556001004004', name: 'Local Rice 5kg', brand: 'Jati', price: 14.00, stock_quantity: 25, image_url: '' },
  { id: 'p5', barcode_string: '9556001005005', name: 'Cooking Oil 2kg', brand: 'Saji', price: 12.50, stock_quantity: 20, image_url: '' },
  { id: 'p6', barcode_string: '9556001006006', name: 'Red Onions', brand: 'Pasar Segar', price: 4.00, stock_quantity: 35, image_url: '', unit_type: 'weight' },
  { id: 'p7', barcode_string: '9556001007007', name: 'Potatoes', brand: 'Pasar Segar', price: 3.50, stock_quantity: 40, image_url: '', unit_type: 'weight' },
  { id: 'p8', barcode_string: '9556001008008', name: 'Fresh Milk 1L', brand: 'Dutch Lady', price: 7.20, stock_quantity: 30, image_url: '' },
  { id: 'p9', barcode_string: '9556001009009', name: 'White Bread', brand: 'Gardenia', price: 3.80, stock_quantity: 25, image_url: '' },
  { id: 'p10', barcode_string: '9556001010010', name: 'Tuna Chilli (cans)', brand: 'Ayam Brand', price: 5.50, stock_quantity: 50, image_url: '' },
  { id: 'p11', barcode_string: '9556001011011', name: 'Instant Noodles (10pk)', brand: 'Maggie', price: 6.90, stock_quantity: 60, image_url: '' },
  { id: 'p12', barcode_string: '9556001012012', name: 'Bananas (per bunch)', brand: 'Local', price: 3.00, stock_quantity: 45, image_url: '' },
  { id: 'p13', barcode_string: '9556001013013', name: 'Fish Bawal', brand: 'SeaFresh', price: 18.00, stock_quantity: 12, image_url: '', unit_type: 'weight' },
  { id: 'p14', barcode_string: '9556001014014', name: 'Tofu Soft (2pk)', brand: 'Unicurd', price: 3.20, stock_quantity: 20, image_url: '' },
  { id: 'p15', barcode_string: '9556001015015', name: 'Kangkung', brand: 'Pasar Segar', price: 1.50, stock_quantity: 30, image_url: '', unit_type: 'weight' },
];

const today = new Date().toISOString();

export const testOrders: Order[] = [
  {
    id: 'ord-001',
    customer_id: 'cust-1',
    customer_name: 'Alice Johnson',
    total_price: 0,
    status: 'pending',
    delivery_fee: 0,
    payment_method: 'pay_when_pick',
    created_at: today,
    items: [
      { id: 'oi-1', order_id: 'ord-001', product_id: 'p1', quantity: 2, picked: false, product: testProducts[0] },
      { id: 'oi-2', order_id: 'ord-001', product_id: 'p3', quantity: 1, picked: false, product: testProducts[2] },
      { id: 'oi-4', order_id: 'ord-001', product_id: 'p11', quantity: 2, picked: false, product: testProducts[10] },
    ],
  },
  {
    id: 'ord-002',
    customer_id: 'cust-2',
    customer_name: 'Bob Smith',
    total_price: 0,
    status: 'picking',
    delivery_fee: 0,
    payment_method: 'pay_online',
    picker_id: 'picker-1',
    created_at: today,
    items: [
      { id: 'oi-5', order_id: 'ord-002', product_id: 'p8', quantity: 2, picked: false, product: testProducts[7] },
      { id: 'oi-6', order_id: 'ord-002', product_id: 'p9', quantity: 1, picked: false, product: testProducts[8] },
      { id: 'oi-7', order_id: 'ord-002', product_id: 'p10', quantity: 3, picked: false, product: testProducts[9] },
    ],
  },
  {
    id: 'ord-003',
    customer_id: 'cust-3',
    customer_name: 'Carol Davis',
    total_price: 0,
    status: 'picking',
    delivery_fee: 0,
    payment_method: 'pay_when_pick',
    picker_id: 'picker-1',
    created_at: today,
    items: [
      { id: 'oi-8', order_id: 'ord-003', product_id: 'p4', quantity: 1, picked: false, product: testProducts[3] },
      { id: 'oi-9', order_id: 'ord-003', product_id: 'p6', quantity: 2, picked: false, product: testProducts[5] },
      { id: 'oi-10', order_id: 'ord-003', product_id: 'p13', quantity: 1, picked: false, product: testProducts[12] },
      { id: 'oi-11', order_id: 'ord-003', product_id: 'p15', quantity: 3, picked: false, product: testProducts[14] },
    ],
  },
];
