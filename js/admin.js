// Admin Panel JavaScript

// Spinner
window.addEventListener('load', function() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.classList.remove('show');
    }
});

// Admin Login Form Handler
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Here you would typically make an API call to verify credentials
        // For demo purposes, we'll use a simple check
        if (username === 'admin' && password === 'admin123') {
            window.location.href = 'dashboard.html';
        } else {
            alert('Неверное имя пользователя или пароль');
        }
    });
}

// Mobile Navigation Toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('.admin-nav-menu');
        navMenu.classList.toggle('show');
    });
}

// Data Tables Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any data tables if needed
    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
        // Add sorting functionality
        const headers = table.querySelectorAll('th');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const index = Array.from(header.parentElement.children).indexOf(header);
                sortTable(table, index);
            });
        });
    });
});

// Table Sorting Function
function sortTable(table, column) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isNumeric = !isNaN(rows[0].children[column].textContent);

    rows.sort((a, b) => {
        const aValue = a.children[column].textContent;
        const bValue = b.children[column].textContent;

        if (isNumeric) {
            return parseFloat(aValue) - parseFloat(bValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });

    rows.forEach(row => tbody.appendChild(row));
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Image Preview
function previewImage(input, previewElement) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewElement.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Delete Confirmation
function confirmDelete(message = 'Вы уверены, что хотите удалить этот элемент?') {
    return confirm(message);
}

// Status Update Handler
function updateStatus(element, newStatus) {
    if (confirm('Изменить статус?')) {
        // Here you would typically make an API call to update the status
        const statusBadge = element.closest('tr').querySelector('.badge');
        statusBadge.textContent = newStatus;
        statusBadge.className = `badge bg-${newStatus === 'Выполнен' ? 'success' : 'warning'}`;
    }
}

// Export Data
function exportData(type) {
    // Here you would implement the export functionality
    alert(`Экспорт данных в формате ${type} будет реализован позже`);
}

// Search Functionality
function searchTable(input, tableId) {
    const input = document.getElementById(input);
    const filter = input.value.toUpperCase();
    const table = document.getElementById(tableId);
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < td.length; j++) {
            if (td[j].textContent.toUpperCase().indexOf(filter) > -1) {
                found = true;
                break;
            }
        }

        tr[i].style.display = found ? '' : 'none';
    }
}

// Initialize any charts if needed
function initializeCharts() {
    // Chart initialization code will go here
}

// Call initialization functions when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

// Product Management Functions
function editProduct(id) {
    // Here you would typically fetch the product data and populate the edit form
    // For demo purposes, we'll just show an alert
    alert(`Редактирование товара #${id}`);
}

function deleteProduct(id) {
    if (confirmDelete('Вы уверены, что хотите удалить этот товар?')) {
        // Here you would typically make an API call to delete the product
        // For demo purposes, we'll just show an alert
        alert(`Товар #${id} удален`);
    }
}

// Add Product Form Handler
const addProductForm = document.getElementById('addProductForm');
if (addProductForm) {
    addProductForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to add the product
            // For demo purposes, we'll just show an alert
            alert('Товар успешно добавлен');
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
            modal.hide();
            
            // Reset the form
            this.reset();
        }
    });
}

// Image Preview for Product Form
const productImageInput = document.querySelector('#addProductForm input[type="file"]');
if (productImageInput) {
    productImageInput.addEventListener('change', function() {
        const preview = document.createElement('img');
        preview.style.maxWidth = '200px';
        preview.style.marginTop = '10px';
        
        const container = this.parentElement;
        const existingPreview = container.querySelector('img');
        if (existingPreview) {
            container.removeChild(existingPreview);
        }
        
        previewImage(this, preview);
        container.appendChild(preview);
    });
}

// Order Management Functions
function viewOrder(id) {
    // Here you would typically fetch the order data from the server
    // For demo purposes, we'll use sample data
    const orderData = {
        id: id,
        customer: {
            name: 'Иван Петров',
            email: 'ivan@example.com',
            phone: '+7 (999) 123-45-67'
        },
        shipping: {
            address: 'г. Москва, ул. Примерная, д. 1, кв. 1',
            method: 'Доставка курьером'
        },
        items: [
            {
                name: 'Колбаса Докторская',
                quantity: '2 кг',
                price: '₽450',
                total: '₽900'
            },
            {
                name: 'Колбаса Сервелат',
                quantity: '1 кг',
                price: '₽550',
                total: '₽550'
            }
        ],
        total: '₽2,500'
    };

    // Populate the modal with order data
    document.getElementById('orderId').textContent = orderData.id;
    
    // Customer info
    const customerInfo = document.getElementById('customerInfo');
    customerInfo.innerHTML = `
        <p class="mb-1"><strong>Имя:</strong> ${orderData.customer.name}</p>
        <p class="mb-1"><strong>Email:</strong> ${orderData.customer.email}</p>
        <p class="mb-1"><strong>Телефон:</strong> ${orderData.customer.phone}</p>
    `;

    // Shipping info
    const shippingInfo = document.getElementById('shippingInfo');
    shippingInfo.innerHTML = `
        <p class="mb-1"><strong>Адрес:</strong> ${orderData.shipping.address}</p>
        <p class="mb-1"><strong>Способ доставки:</strong> ${orderData.shipping.method}</p>
    `;

    // Order items
    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = orderData.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.total}</td>
        </tr>
    `).join('');

    // Total
    document.getElementById('orderTotal').textContent = orderData.total;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('viewOrderModal'));
    modal.show();
}

function updateOrderStatus(select, orderId) {
    const newStatus = select.value;
    if (confirm(`Изменить статус заказа #${orderId} на "${newStatus}"?`)) {
        // Here you would typically make an API call to update the status
        // For demo purposes, we'll just show an alert
        alert(`Статус заказа #${orderId} обновлен на "${newStatus}"`);
    } else {
        // Reset the select to its previous value
        select.value = select.getAttribute('data-previous-value');
    }
}

function deleteOrder(id) {
    if (confirmDelete('Вы уверены, что хотите удалить этот заказ?')) {
        // Here you would typically make an API call to delete the order
        // For demo purposes, we'll just show an alert
        alert(`Заказ #${id} удален`);
    }
}

function printOrder() {
    window.print();
}

// Status Filter Handler
const statusFilter = document.getElementById('statusFilter');
if (statusFilter) {
    statusFilter.addEventListener('change', function() {
        const status = this.value;
        const rows = document.querySelectorAll('#ordersTable tbody tr');
        
        rows.forEach(row => {
            const orderStatus = row.querySelector('select').value;
            if (!status || orderStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// User Management Functions
function editUser(id) {
    // Here you would typically fetch the user data and populate the edit form
    // For demo purposes, we'll just show an alert
    alert(`Редактирование пользователя #${id}`);
}

function resetPassword(id) {
    // Show the reset password modal
    const modal = new bootstrap.Modal(document.getElementById('resetPasswordModal'));
    modal.show();
    
    // Store the user ID for the form submission
    document.getElementById('resetPasswordForm').setAttribute('data-user-id', id);
}

function deleteUser(id) {
    if (confirmDelete('Вы уверены, что хотите удалить этого пользователя?')) {
        // Here you would typically make an API call to delete the user
        // For demo purposes, we'll just show an alert
        alert(`Пользователь #${id} удален`);
    }
}

// Add User Form Handler
const addUserForm = document.getElementById('addUserForm');
if (addUserForm) {
    addUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to add the user
            // For demo purposes, we'll just show an alert
            alert('Пользователь успешно добавлен');
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
            modal.hide();
            
            // Reset the form
            this.reset();
        }
    });
}

// Reset Password Form Handler
const resetPasswordForm = document.getElementById('resetPasswordForm');
if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            const userId = this.getAttribute('data-user-id');
            const password = this.querySelector('input[type="password"]').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают');
                return;
            }
            
            // Here you would typically make an API call to reset the password
            // For demo purposes, we'll just show an alert
            alert(`Пароль пользователя #${userId} успешно сброшен`);
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal'));
            modal.hide();
            
            // Reset the form
            this.reset();
        }
    });
}

// Role Filter Handler
const roleFilter = document.getElementById('roleFilter');
if (roleFilter) {
    roleFilter.addEventListener('change', function() {
        const role = this.value;
        const rows = document.querySelectorAll('#usersTable tbody tr');
        
        rows.forEach(row => {
            const userRole = row.querySelector('.badge').textContent.toLowerCase();
            if (!role || userRole === role) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Content Management Functions
function editBanner(id) {
    // Here you would typically fetch the banner data and populate the edit form
    // For demo purposes, we'll just show an alert
    alert(`Редактирование баннера #${id}`);
}

function deleteBanner(id) {
    if (confirmDelete('Вы уверены, что хотите удалить этот баннер?')) {
        // Here you would typically make an API call to delete the banner
        // For demo purposes, we'll just show an alert
        alert(`Баннер #${id} удален`);
    }
}

function editNews(id) {
    // Here you would typically fetch the news data and populate the edit form
    // For demo purposes, we'll just show an alert
    alert(`Редактирование новости #${id}`);
}

function deleteNews(id) {
    if (confirmDelete('Вы уверены, что хотите удалить эту новость?')) {
        // Here you would typically make an API call to delete the news
        // For demo purposes, we'll just show an alert
        alert(`Новость #${id} удалена`);
    }
}

function editPage(id) {
    // Here you would typically fetch the page data and populate the edit form
    // For demo purposes, we'll just show an alert
    alert(`Редактирование страницы #${id}`);
}

function deletePage(id) {
    if (confirmDelete('Вы уверены, что хотите удалить эту страницу?')) {
        // Here you would typically make an API call to delete the page
        // For demo purposes, we'll just show an alert
        alert(`Страница #${id} удалена`);
    }
}

// Add Banner Form Handler
const addBannerForm = document.getElementById('addBannerForm');
if (addBannerForm) {
    addBannerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to add the banner
            // For demo purposes, we'll just show an alert
            alert('Баннер успешно добавлен');
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addBannerModal'));
            modal.hide();
            
            // Reset the form
            this.reset();
        }
    });
}

// Add News Form Handler
const addNewsForm = document.getElementById('addNewsForm');
if (addNewsForm) {
    addNewsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to add the news
            // For demo purposes, we'll just show an alert
            alert('Новость успешно добавлена');
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addNewsModal'));
            modal.hide();
            
            // Reset the form
            this.reset();
        }
    });
}

// Add Page Form Handler
const addPageForm = document.getElementById('addPageForm');
if (addPageForm) {
    addPageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to add the page
            // For demo purposes, we'll just show an alert
            alert('Страница успешно добавлена');
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addPageModal'));
            modal.hide();
            
            // Reset the form
            this.reset();
        }
    });
}

// Image Preview for Content Forms
const contentImageInputs = document.querySelectorAll('input[type="file"][accept="image/*"]');
contentImageInputs.forEach(input => {
    input.addEventListener('change', function() {
        const preview = document.createElement('img');
        preview.style.maxWidth = '200px';
        preview.style.marginTop = '10px';
        
        const container = this.parentElement;
        const existingPreview = container.querySelector('img');
        if (existingPreview) {
            container.removeChild(existingPreview);
        }
        
        previewImage(this, preview);
        container.appendChild(preview);
    });
});

// Settings Management Functions
// General Settings Form Handler
const generalSettingsForm = document.getElementById('generalSettingsForm');
if (generalSettingsForm) {
    generalSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to save the settings
            // For demo purposes, we'll just show an alert
            alert('Общие настройки успешно сохранены');
        }
    });
}

// Contact Settings Form Handler
const contactSettingsForm = document.getElementById('contactSettingsForm');
if (contactSettingsForm) {
    contactSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to save the settings
            // For demo purposes, we'll just show an alert
            alert('Контактная информация успешно сохранена');
        }
    });
}

// Social Media Settings Form Handler
const socialSettingsForm = document.getElementById('socialSettingsForm');
if (socialSettingsForm) {
    socialSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to save the settings
            // For demo purposes, we'll just show an alert
            alert('Настройки социальных сетей успешно сохранены');
        }
    });
}

// Payment Settings Form Handler
const paymentSettingsForm = document.getElementById('paymentSettingsForm');
if (paymentSettingsForm) {
    paymentSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Here you would typically make an API call to save the settings
            // For demo purposes, we'll just show an alert
            alert('Настройки платежных систем успешно сохранены');
        }
    });
}

// Image Preview for Settings Forms
const settingsImageInputs = document.querySelectorAll('#generalSettingsForm input[type="file"]');
settingsImageInputs.forEach(input => {
    input.addEventListener('change', function() {
        const preview = document.createElement('img');
        preview.style.maxWidth = '200px';
        preview.style.marginTop = '10px';
        
        const container = this.parentElement;
        const existingPreview = container.querySelector('img');
        if (existingPreview) {
            container.removeChild(existingPreview);
        }
        
        previewImage(this, preview);
        container.appendChild(preview);
    });
}); 