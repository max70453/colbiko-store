$(document).ready(function() {

    let productDetail = JSON.parse(localStorage.getItem('productDetail'));
    let products = JSON.parse(localStorage.getItem('products'));

    products.forEach(element => {
        if (element.name == productDetail) {
            $('.detail-img').append(`<img src="${element.image}" class="img-fluid rounded" alt="Image"></img>`);
            $('.title').text(element.name);
            $('.category').text('Категория: ' + element.category);
            $('.price').text(element.price + 'p');
            for (let index = 0; index < element.stars; index++) {
                $('.star').append('<i class="fa fa-star text-secondary"></i>');
            }
            for (let index = 0; index < (5 - element.stars); index++) {
                $('.star').append('<i class="fa fa-star"></i>');
            }
            $('.description').text(element.description);
        }
    });

        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        // Handle quantity changes
        $('.btn-minus').click(function() {
            let quantity = parseInt($('.quantity input').val());
            
            if (quantity > 1) {
                $('.quantity input').val(quantity - 1);
            }
            if (quantity === 0) {
                $('.quantity input').val(1);
            }
        });
    
        $('.btn-plus').click(function() {
            let quantity = parseInt($('.quantity input').val());
            $('.quantity input').val(quantity++);
        });
    
        // Handle manual quantity input
        $('.quantity input').on('change', function() {
            let value = parseInt($(this).val()) || 1;
            value = Math.max(1, value);
            $(this).val(value);
        });
    
        // Add to cart button handler
        $('.btn.border.border-secondary').click(function(e) {
            e.preventDefault();
            
            const product = {
                id: productId,
                name: $('.title').text(),
                price: parseFloat($('.price').text().replace(/[^0-9.-]+/g, '')),
                image: $('.detail-img img').attr('src'),
                quantity: parseInt($('.quantity input').val()),
                category: $('.category').text().replace('Категория: ', '')
            };
    
            addToCart(product);
        });
    
        // Add to cart function
        function addToCart(product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
            if (existingProductIndex !== -1) {
                // Update quantity if product exists
                cart[existingProductIndex].quantity += product.quantity;
            } else {
                // Add new product if it doesn't exist
                cart.push(product);
            }
    
            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count in header
            updateCartCount();
    
            // Show success message
            showNotification('Товар добавлен в корзину!');
        }
    
        // Update cart count in header
        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    
        // Initialize cart count on page load
        updateCartCount();

});



