import { OrderStatus } from '@/types';

interface OrderTimelineProps {
  status: OrderStatus;
}

const steps: { key: OrderStatus; label: string }[] = [
  { key: 'pending', label: 'Order Placed' },
  { key: 'picking', label: 'Picking Items' },
  { key: 'picked', label: 'Items Picked' },
  { key: 'ready_for_pickup', label: 'Ready for Pickup' },
];

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const isComplete = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step.key} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full border-2 ${
                  isComplete
                    ? 'bg-purple-600 border-purple-600'
                    : 'bg-white border-gray-300'
                } ${isCurrent ? 'ring-2 ring-purple-200' : ''}`}
              />
              {i < steps.length - 1 && (
                <div className={`w-0.5 h-8 ${isComplete && !isCurrent ? 'bg-purple-600' : 'bg-gray-200'}`} />
              )}
            </div>
            <div>
              <p className={`text-sm font-medium ${isComplete ? 'text-purple-700' : 'text-gray-400'}`}>
                {step.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
