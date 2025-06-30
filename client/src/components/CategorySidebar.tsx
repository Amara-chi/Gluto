import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Category } from '@shared/schema';

interface CategorySidebarProps {
  selectedCategoryId?: number;
  onCategorySelect: (categoryId?: number) => void;
}

// Predefined category structure based on requirements
const CATEGORY_STRUCTURE = [
  {
    name: 'AGRI FRESH PRODUCTS',
    subcategories: ['Rice', 'Beans', 'Fruits', 'Seeds', 'Nuts']
  },
  {
    name: 'FOOD AND BEVERAGE (FMCG)',
    subcategories: ['Snacks', 'Drinks', 'Toiletries']
  },
  {
    name: 'MEAT AND POULTRY PRODUCTS',
    subcategories: ['Eggs', 'Fish', 'Beef']
  },
  {
    name: 'PROCESSED AFRICAN FOOD AND ITEMS',
    subcategories: ['Stock fish', 'Egusi', 'Poundo yam']
  },
  {
    name: 'NON FOOD PRODUCTS',
    subcategories: ['Nivea cream', 'Organic soaps', 'Organic syrup']
  },
  {
    name: 'AGRONUTRITION / FERTILIZERS / SPECIAL PRODUCTS',
    subcategories: ['Fertilizers', 'Bio-stimulants']
  }
];

export function CategorySidebar({ selectedCategoryId, onCategorySelect }: CategorySidebarProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const getCategoryByName = (name: string) => {
    return categories.find(cat => cat.name === name);
  };

  const isExpanded = (categoryName: string) => expandedCategories.includes(categoryName);

  return (
    <aside className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-fit sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Categories</h2>
      
      <div className="space-y-2">
        {/* All Products Option */}
        <Button
          variant="ghost"
          className={`w-full justify-start p-3 rounded-lg ${
            !selectedCategoryId
              ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600 text-primary-700 dark:text-primary-300 font-medium'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => onCategorySelect(undefined)}
        >
          All Products
        </Button>

        {CATEGORY_STRUCTURE.map((categoryStructure) => {
          const category = getCategoryByName(categoryStructure.name);
          const isSelected = category && selectedCategoryId === category.id;
          const expanded = isExpanded(categoryStructure.name);

          return (
            <div key={categoryStructure.name} className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-b-0">
              <Button
                variant="ghost"
                className={`w-full justify-between p-3 rounded-lg ${
                  isSelected
                    ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-600 text-primary-700 dark:text-primary-300 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => {
                  if (category) {
                    onCategorySelect(category.id);
                  }
                  toggleCategory(categoryStructure.name);
                }}
              >
                <span className="text-left font-medium text-sm">
                  {categoryStructure.name}
                </span>
                {expanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
              
              {expanded && (
                <div className="mt-2 ml-4 space-y-1">
                  {categoryStructure.subcategories.map((subcategory) => {
                    const subcat = categories.find(cat => 
                      cat.name.toLowerCase().includes(subcategory.toLowerCase()) ||
                      subcategory.toLowerCase().includes(cat.name.toLowerCase())
                    );
                    
                    return (
                      <Button
                        key={subcategory}
                        variant="ghost"
                        className={`w-full justify-start text-sm py-1 px-2 ${
                          subcat && selectedCategoryId === subcat.id
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                        onClick={() => subcat && onCategorySelect(subcat.id)}
                      >
                        {subcategory}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
