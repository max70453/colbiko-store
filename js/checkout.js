$(document).ready(function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateOrderSummary();
    updateCartCount();

    // Обновить количество в корзине
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        $('.position-absolute.bg-count').text(totalItems);
    }

    // Обновить сводку заказов
    function updateOrderSummary() {
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        const tbody = $('.table tbody');
        tbody.empty();
        let subtotal = 0;

        cart.forEach(item => {
            const total = item.price * item.quantity;
            subtotal += total;

            const row = `
                <tr>
                    <th scope="row">
                        <div class="d-flex align-items-center mt-2">
                            <img src="${item.image}" class="img-fluid rounded-circle" style="width: 90px; height: 90px;" alt="">
                        </div>
                    </th>
                    <td class="py-5">${item.name}</td>
                    <td class="py-5">${item.price}р</td>
                    <td class="py-5">${item.quantity}</td>
                    <td class="py-5">${total}р</td>
                </tr>
            `;
            tbody.append(row);
        });

        // Добавление строк промежуточного итога и отгрузки
        const shippingRow = `
            <tr>
                <th scope="row"></th>
                <td class="py-5">
                    <p class="mb-0 text-dark py-4">Доставка</p>
                </td>
                <td colspan="3" class="py-5">
                    <div class="form-check text-start">
                        <input type="radio" class="form-check-input bg-primary border-0" id="Shipping-1" name="shipping" value="0" checked>
                        <label class="form-check-label" for="Shipping-1">Самовывоз (бесплатно)</label>
                    </div>
                    <div class="form-check text-start">
                        <input type="radio" class="form-check-input bg-primary border-0" id="Shipping-2" name="shipping" value="300">
                        <label class="form-check-label" for="Shipping-2">Доставка курьером: 300р</label>
                    </div>
                </td>
            </tr>
            <tr>
                <th scope="row"></th>
                <td class="py-5"></td>
                <td class="py-5"></td>
                <td class="py-5">
                    <p class="mb-0 text-dark py-3">Итого</p>
                </td>
                <td class="py-5">
                    <div class="py-3 border-bottom border-top">
                        <p class="mb-0 text-dark total-amount">${subtotal}р</p>
                    </div>
                </td>
            </tr>
        `;
        tbody.append(shippingRow);
    }

    // Обработать изменение способа доставки
    $(document).on('change', 'input[name="shipping"]', function() {
        updateTotal();
    });

    // Обновите общую сумму с учетом доставки
    function updateTotal() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = parseInt($('input[name="shipping"]:checked').val()) || 0;
        const total = subtotal + shippingCost;
        $('.total-amount').text(total + 'р');
    }

    // Проверка формы
    function validateForm() {
        let isValid = true;
        const requiredFields = [
            'input[name="firstName"]',
            'input[name="lastName"]',
            'input[name="address"]',
            'input[name="city"]',
            'input[name="phone"]',
            'input[name="email"]'
        ];

        requiredFields.forEach(field => {
            const input = $(field);
            if (!input.val().trim()) {
                input.addClass('is-invalid');
                isValid = false;
            } else {
                input.removeClass('is-invalid');
            }
        });

        if (!$('input[name="payment"]:checked').length) {
            alert('Пожалуйста, выберите способ оплаты');
            isValid = false;
        }

        return isValid;
    }

    // Обработать отправку заказов
    $('.btn.border-secondary').click(function(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const orderData = {
            customer: {
                firstName: $('input[name="firstName"]').val(),
                lastName: $('input[name="lastName"]').val(),
                address: $('input[name="address"]').val(),
                city: $('input[name="city"]').val(),
                phone: $('input[name="phone"]').val(),
                email: $('input[name="email"]').val(),
                notes: $('textarea[name="notes"]').val()
            },
            order: {
                items: cart,
                shipping: {
                    method: $('input[name="shipping"]:checked').next('label').text(),
                    cost: parseInt($('input[name="shipping"]:checked').val()) || 0
                },
                payment: $('input[name="payment"]:checked').next('label').text(),
                total: parseFloat($('.total-amount').text())
            },
            orderDate: new Date().toISOString()
        };

        // Здесь обычно отправляют данные о заказе на свой сервер
        console.log('Order submitted:', orderData);

        // Очистить корзину и перенаправить
        localStorage.removeItem('cart');
        alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
        window.location.href = 'index.html';
    });

    // Проверка в режиме реального времени
    $('input[required]').on('input', function() {
        if ($(this).val().trim()) {
            $(this).removeClass('is-invalid');
        }
    });
});