import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import CartElements from './CartElements';
import CartTotal from './CartTotal';

const CartContent = () => {
    const { cart } = useContext(DataContext);

    const generateWhatsAppLink = (cart) => {
        const baseUrl = 'https://api.whatsapp.com/send?phone=543585181780';
        let message = 'Aquí están los productos en mi carrito:\n';
        
        cart.forEach((product) => {
            message += `- ${product.brand} ${product.model}, Precio: $${product.price}\n`;
        });
    
        const encodedMessage = encodeURIComponent(message);
        return `${baseUrl}&text=${encodedMessage}`;
      
        
    };
    const handleWhatsAppClick = () => {
        const whatsappLink = generateWhatsAppLink(cart);
        window.open(whatsappLink, '_blank');
    };
    return cart.length > 0 ? (
        
        <div>
            <CartElements />
            <CartTotal />
            <button onClick={handleWhatsAppClick}>Enviar carrito por WhatsApp</button>

        </div>
    ) : (
        <h2>Tu carrito está vacío!</h2>
    );
};

export default CartContent;
