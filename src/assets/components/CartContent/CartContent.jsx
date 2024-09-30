import React, { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import CartElements from './CartElements';

const CartContent = () => {
    const { cart } = useContext(DataContext);
  
    const generateWhatsAppLink = (cart) => {
        const baseUrl = 'https://api.whatsapp.com/send?phone=543585181780';
        let message = 'Aquí están los productos en mi carrito:\n';

        // Sumar el total de los productos en el carrito
        const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
        
        cart.forEach((product) => {
            message += `- ${product.brand} ${product.model}, Precio: $${product.price},Color: ${product.color.name }, Talle: ${product.size.name} Cantidad: ${product.quantity}\n`;
        });

        // Agregar el total al mensaje
        message += `\nTotal de la compra: $${total}`;

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
            <button onClick={handleWhatsAppClick}>Enviar carrito por WhatsApp</button>
        </div>
    ) : (
        <h2 className='text-bold'>Tu carrito está vacío!</h2>
    );
};

export default CartContent;
