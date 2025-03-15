$(document).ready(function() {

    // Добавление товара в корзину
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to cart button click handler
    $('.btn-shopping-cart').on('click', function(e) {
        e.preventDefault();
        
        const productCard = $(this).closest('.fruite-item');
        const product = {
            id: Date.now(), // Unique ID for each item
            name: productCard.find('h4').text(),
            price: parseFloat(productCard.find('.text-dark').text().replace(/[^0-9]/g, '')),
            image: productCard.find('.card-img').attr('src'),
            quantity: 1
        };

        // Check if product already exists in cart
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        // Show success message
        showNotification('Товар добавлен в корзину!');
    });

    // Update cart count in the header
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        $('.bg-count').text(totalItems);
    }

   // Show notification
   function showNotification(message) {
    // Create notification element if it doesn't exist
    if (!$('#notification').length) {
        $('body').append(`
            <div id="notification" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #28a745;
                color: white;
                padding: 15px 25px;
                border-radius: 5px;
                display: none;
                z-index: 9999;
            "></div>
        `);
    }

    // Show notification
    $('#notification')
        .text(message)
        .fadeIn()
        .delay(2000)
        .fadeOut();
}

});