import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { Button } from './button';
import Badge from './Badge';
import { useToast } from '../../contexts/ToastContext';
import { addItem } from '../../../store/slices/cartSlice';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    showToast(`${product.name} added to cart`, 'success');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image || `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&seed=${product.id}`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/public/placeholder.svg';
                }}
              />
            </div>
            
            {/* Color swatches */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Available Colors</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                {product.brand}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="text-2xl font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Product Details Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
              <div>
                <div className="text-sm font-medium text-gray-900">Brand</div>
                <div className="text-sm text-gray-600">{product.brandName}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900">Category</div>
                <div className="text-sm text-gray-600">{product.category}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900">Country</div>
                <div className="text-sm text-gray-600">{product.country}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900">Pattern</div>
                <div className="text-sm text-gray-600">{product.pattern}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900">Application</div>
                <div className="text-sm text-gray-600">{product.application}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900">Type</div>
                <div className="text-sm text-gray-600">{product.type}</div>
              </div>
            </div>

            {/* Usage Type */}
            <div className="flex gap-4 py-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-900 mr-2">Usage:</div>
                <div className="flex gap-2">
                  {product.commercial && (
                    <Badge variant="outline" className="text-xs">
                      Commercial
                    </Badge>
                  )}
                  {product.residential && (
                    <Badge variant="outline" className="text-xs">
                      Residential
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.buttonText || 'Add to Cart'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-4"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-500 pt-4">
              <p>Product ID: {product.id}</p>
              <p className="mt-1">
                Need help? Contact our material specialists for technical specifications and installation guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
