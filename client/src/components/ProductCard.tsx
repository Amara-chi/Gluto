import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl || undefined,
      availability: product.availability || 0,
    });
    onAddToCart?.(product);
  };

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 80) return 'bg-emerald-500';
    if (availability >= 50) return 'bg-amber-500';
    return 'bg-orange-500';
  };

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            No Image Available
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {product.name}
        </h3>
        
        {/* Availability Meter */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Availability</span>
            <span>{product.availability || 0}%</span>
          </div>
          <Progress 
            value={product.availability || 0} 
            className="h-2"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <span className="text-gray-500 dark:text-gray-400">/kg</span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {product.description}
            {product.eanUpc && (
              <>
                <br /><strong>EAN:</strong> {product.eanUpc}
              </>
            )}
            {product.origin && (
              <>
                <br /><strong>Origin:</strong> {product.origin}
              </>
            )}
            {product.weight && (
              <>
                <br /><strong>Weight:</strong> {product.weight}
              </>
            )}
          </p>
        )}

        {/* Packaging & Details */}
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
          {product.packaging && (
            <div>
              <span className="font-medium">Packaging:</span>
              <br />{product.packaging}
            </div>
          )}
          {product.leadTime && (
            <div>
              <span className="font-medium">Lead Time:</span>
              <br />{product.leadTime}
            </div>
          )}
          {product.shelfLife && (
            <div>
              <span className="font-medium">Shelf Life:</span>
              <br />{product.shelfLife}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
