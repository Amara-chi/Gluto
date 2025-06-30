import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useCart } from '@/hooks/useCart';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderFormData {
  fullName: string;
  positionTitle: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  inquiryPriority: 'high' | 'low' | '';
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { toast } = useToast();
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    positionTitle: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    address: '',
    inquiryPriority: '',
  });

  const orderMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('POST', '/api/orders', data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Order sent successfully",
      });
      clearCart();
      onClose();
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
      console.error('Order submission error:', error);
    },
  });

  const resetForm = () => {
    setFormData({
      fullName: '',
      positionTitle: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      address: '',
      inquiryPriority: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.inquiryPriority) {
      toast({
        title: "Error",
        description: "Please select inquiry priority",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      ...formData,
      items: items.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    orderMutation.mutate(orderData);
  };

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (items.length === 0 && isOpen) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Place Order</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Your cart is empty. Add some products to place an order.</p>
            <Button onClick={handleClose} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Place Order</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="positionTitle">Position Title *</Label>
            <Input
              id="positionTitle"
              type="text"
              required
              value={formData.positionTitle}
              onChange={(e) => handleInputChange('positionTitle', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              required
              rows={3}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="inquiryPriority">Inquiry Priority *</Label>
            <Select 
              value={formData.inquiryPriority} 
              onValueChange={(value) => handleInputChange('inquiryPriority', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary-600 hover:bg-primary-700"
              disabled={orderMutation.isPending}
            >
              {orderMutation.isPending ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
