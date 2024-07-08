import React, { useState } from 'react';

const initialProducts = [
  { id: 1, name: "T-shirt", price: 20.00 },
  { id: 2, name: "Jeans", price: 30.00 },
  { id: 3, name: "Sneakers", price: 50.00 },
  { id: 4, name: "Hat", price: 10.00 }
];

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const productToAdd = initialProducts.find(product => product.id === parseInt(productId));
    if (productToAdd) {
      const existingItemIndex = cart.findIndex(item => item.product.id === productToAdd.id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += quantity;
        setCart(updatedCart);
      } else {
        setCart([...cart, { product: productToAdd, quantity }]);
      }
    }
    // Reset form fields
    setProductId('');
    setQuantity(1);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.product.id === id) {
        return { ...item, quantity: parseInt(newQuantity) };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.product.id !== id);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        <h3>Available Products</h3>
        <ul>
          {initialProducts.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Cart</h3>
        <ul>
          {cart.map(item => (
            <li key={item.product.id}>
              {item.product.name} - ${item.product.price.toFixed(2)} x
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.product.id, e.target.value)}
              />
              <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${calculateTotal()}</p>
      </div>
      <div>
        <h3>Add to Cart</h3>
        <select value={productId} onChange={(e) => setProductId(e.target.value)}>
          <option value="">Select Product</option>
          {initialProducts.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
