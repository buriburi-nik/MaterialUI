import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './button';
import {
  removeItem,
  updateQuantity,
  clearCart,
  closeCart,
} from '../../../store/slices/cartSlice';
import { useToast } from '../../contexts/ToastContext';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, isOpen, totalQuantity, totalAmount } = useSelector(state => state.cart);
  const { showToast } = useToast();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item.id));
    showToast(`${item.name} removed from cart`, 'success');
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      const item = items.find(item => item.id === id);
      handleRemoveItem(item);
      return;
    }
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    showToast('Cart cleared', 'success');
  };

  const handleCheckout = () => {
    showToast('Checkout functionality coming soon!', 'info');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={() => dispatch(closeCart())}
      />
      
      {/* Cart Drawer */}
      <div className="fixed top-0 right-0 z-50 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              {totalQuantity > 0 && (
                <span className="px-2 py-1 text-xs text-white bg-blue-600 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>
            <button
              onClick={() => dispatch(closeCart())}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Start adding some products to get started!</p>
                <Button 
                  onClick={() => dispatch(closeCart())}
                  variant="outline"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0">
                      <img
                        src={item.image || '/public/placeholder.svg'}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {item.brand}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="p-1 text-red-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="w-full text-sm text-red-600 hover:text-red-800 py-2"
                  >
                    Clear all items
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              
              {/* Checkout Buttons */}
              <div className="space-y-2">
                <Button 
                  onClick={handleCheckout}
                  className="w-full"
                >
                  Checkout
                </Button>
                <Button 
                  onClick={() => dispatch(closeCart())}
                  variant="outline"
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
