import { X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Product } from '@shared/schema'; // Adjust this path as needed

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onPlaceOrder: () => void;
}

export function CartModal({ 
  isOpen, 
  onClose, 
  cart, 
  onRemoveItem, 
  onClearCart,
  onPlaceOrder
}: CartModalProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Shopping Cart
          </DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Your cart is empty</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="max-h-96 overflow-y-auto space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                      <p className="text-amber-600 dark:text-amber-400 font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600 dark:text-gray-300">Total</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">${total.toFixed(2)}</p>
                </div>
                <Button 
                  variant="ghost"
                  onClick={onClearCart}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Clear Cart
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
                <Button 
                  onClick={() => {
                    onPlaceOrder();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}