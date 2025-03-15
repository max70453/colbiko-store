$(document).ready(function() {
    // Загружает товары в корзину из локального хранилища
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    // Обновить отображение корзины
    function updateCartDisplay() {
        const tbody = $('.table tbody');
        tbody.empty();

        let subtotal = 0;

        cart.forEach((item, index) => {
            const total = item.price * item.quantity;
            subtotal += total;

            const row = `
                <tr data-index="${index}">
                    <th scope="row">
                        <div class="d-flex align-items-center">
                            <img src="${item.image}" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="">
                        </div>
                    </th>
                    <td>
                        <p class="mb-0 mt-4">${item.name}</p>
                    </td>
                    <td>
                        <p class="mb-0 mt-4">${item.price}р</p>
                    </td>
                    <td>
                        <div class="input-group quantity mt-4" style="width: 100px;">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-minus rounded-circle bg-light border">
                                    <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input type="text" class="form-control form-control-sm text-center border-0" value="${item.quantity}">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-plus rounded-circle bg-light border">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="mb-0 mt-4">${total}р</p>
                    </td>
                    <td>
                        <button class="btn btn-md rounded-circle bg-light border mt-4 btn-remove">
                            <i class="fa fa-times text-danger"></i>
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });

        updateTotals(subtotal);
        updateCartCount();
    }

    // Итоговые данные по обновлению
    function updateTotals(subtotal, coupon) {
        const shipping = subtotal > 0 ? 300 : 0; // Стоимость доставки
        let total = subtotal + shipping;
        if (subtotal && !coupon) {
            updateCartCount();
            $('h5:contains("Промежуточная сумма:") + p').text(subtotal + 'р');
            $('.text-end:contains("Стоимость доставки:")').text(shipping + 'р');
            $('h5:contains("Всего:") + p').text(total + 'р');
            localStorage.setItem('total', JSON.stringify(total));
        }
        else if(subtotal && coupon){
            let discount = 10; // Процент скидки
            let discountTotal = subtotal * (discount / 100); // Вычисляем сумму скидки
            total = subtotal - discountTotal; // Вычисляем итоговую сумму со скидкой
            $('h5:contains("Всего:") + p').text(total + 'р');    
        }
        
    }
 
    // Обновить количество корзины в заголовке
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        $('.position-absolute.bg-count').text(totalItems);
        $('.total').text(totalItems);
    }

    // Обрабатывать изменения количества
    $(document).on('click', '.btn-plus', function() {
        const index = $(this).closest('tr').data('index');
        cart[index].quantity++;
        saveAndUpdateCart();
    });

    $(document).on('click', '.btn-minus', function() {
        const index = $(this).closest('tr').data('index');
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
            saveAndUpdateCart();
        }
    });

    // Управление ручным вводом количества
    // $(document).on('change', '.quantity input', function() {
    //     const index = $(this).closest('tr').data('index');
    //     const newQuantity = parseInt($(this).val()) || 1;
    //     cart[index].quantity = Math.max(1, newQuantity);
    //     saveAndUpdateCart();
    // });

    // Удалить товар из корзины
    $(document).on('click', '.btn-remove', function() {
        const index = $(this).closest('tr').data('index');
        cart.splice(index, 1);
        saveAndUpdateCart();
    });

    //Применить купон
    $('.btn:contains("Применить купон")').click(function() {
        const couponCode = $(this).prev('input').val().trim();
        applyCoupon(couponCode);
    });

    // Применить функцию купона
    function applyCoupon(code) {
        // Добавьть логику вашего купона здесь
        if (code === 'СКИДКА10') {
            let subtotal = JSON.parse(localStorage.getItem('total'));
            updateTotals(subtotal, true);
            alert('Купон применен! Скидка 10%');
        } else {
            alert('Неверный код купона');
        }
    }

    // Переход к оформлению заказа
    $('.btn:contains("Перейти к оформлению заказа")').click(function() {
        if (cart.length > 0) {
            // Здесь нужно добавить логику оформления заказа
            alert('Переход к оформлению заказа...');
            document.location.href = 'chackout.html';
        } else {
            alert('Ваша корзина пуста');
        }
    });

    // Сохранить корзину и обновить отображение
    function saveAndUpdateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    
});