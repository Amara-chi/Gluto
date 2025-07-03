import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import type { Product } from '@shared/schema'; // Adjust this path as needed

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: () => void;
  darkMode?: boolean;
}

export function ProductDetailModal({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart,
  darkMode
}: ProductDetailModalProps) {
  if (!product) return null;

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 80) return 'bg-emerald-500';
    if (availability >= 50) return 'bg-amber-500';
    return 'bg-orange-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{product.name}</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden h-80">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                No Image Available
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>
            
            {/* Availability */}
            <div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300 mb-1">
                <span>Availability</span>
                <span>{product.availability}%</span>
              </div>
              <Progress 
                value={product.availability} 
                className={`h-2 ${getAvailabilityColor(product.availability)}`}
              />
            </div>
            
            {/* Price */}
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              ${product.price.toFixed(2)}
            </div>
            
            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900 dark:text-white">Product Details</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li><strong>EAN/UPC:</strong> {product.eanUpc}</li>
                  <li><strong>Weight:</strong> {product.weight}</li>
                  <li><strong>Origin:</strong> {product.origin}</li>
                  <li><strong>Lead Time:</strong> {product.leadTime}</li>
                  <li><strong>Shelf Life:</strong> {product.shelfLife}</li>
                </ul>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900 dark:text-white">Packaging</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {product.packaging}
                </p>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="pt-4">
              <Button 
                onClick={() => {
                  onAddToCart();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}