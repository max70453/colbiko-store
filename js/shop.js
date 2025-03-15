$(document).ready(function() {

    let products = JSON.parse(localStorage.getItem('products'))
    
    loadItems(products);
    
    function loadItems(data) {
          let out = '';
          for (let key in data){
            out+='<div class="col-md-6 col-lg-6 col-xl-4 fruite-card">'
            out+='<div class="rounded position-relative fruite-item">'
            out+='<div class="fruite-img">'
            out+=`<img src="${data[key].image}" class="img-fluid card-img w-100 rounded-top" alt="">`
            out+='</div>'                        
            out+='<div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">'
            out+=`${data[key].category}</div>`
            out+='<div class="p-4 border border-top-0 rounded-bottom">'
            out+=`<h4>${data[key].name}</h4>`
            out+=`<p class="truncate-4-lines">${data[key].description}</p>`
            out+='<div class="d-flex justify-content-between align-items-center flex-lg-wrap">'
            out+=`<p class="text-dark fs-5 fw-bold mb-0">${data[key].price} / кг</p>`
            out+='<a href="#" class="btn btn-shopping-cart border border-secondary rounded-pill px-2 text-primary">'
            out+='<i class="fa fa-shopping-bag me-2"></i>В корзину</a>'
            out+='</div>'
            out+='</div>'
            out+='</div>'
            out+='</div>'
        }
        
      $('#items').html(out);
    }

// Фильтр по ценовому диапазону
$('#rangeInput').on('input', function() {
    const maxPrice = $(this).val();
    $('#amount').text(maxPrice + 'р');
    filterProducts(maxPrice);
});

  // Фильтровать товары по цене
  function filterProducts(maxPrice) {
    $('.fruite-card').each(function() {
        const price = parseFloat($(this).find('.text-dark').text());
        if (price <= maxPrice) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

//Количество категорий
function countCategory() {
let count1 = count2 = count3 = count4 = count5 = 0;

$('.fruite-card').each(function() {
    const productCategory = $(this).find('.bg-secondary').text();
    if (productCategory === 'Вареные') {
        count1++;
        $('.categoryCount1').text( '(' + count1 + ')' );
    }
    if (productCategory === 'Полукопченые') {
        count2++;
        $('.categoryCount2').text( '(' + count2 + ')' );
    }
    if (productCategory === 'Сырокопченые') {
        count3++;
        $('.categoryCount3').text( '(' + count3 + ')' );
    }
    if (productCategory === 'Сыровяленые') {
        count4++;
        $('.categoryCount4').text( '(' + count4 + ')' );
    }
    if (productCategory === 'Варено-копченые') {
        count5++;
        $('.categoryCount5').text( '(' + count5 + ')' );
    }
    else{
        $('.categoryCount').text( '(' + $('.fruite-card').length + ')');
    }
});
}
countCategory();

// Фильтр по категориям
$('.fruite-categorie a').on('click', function(e) {
    e.preventDefault();
    const category = $(this).text().trim();
    filterByCategory(category);
});

// Фильтровать товары по категориям
function filterByCategory(category) {
    let count = 0;
    $('.fruite-card').each(function() {
        const productCategory = $(this).find('.bg-secondary').text();
        if (category === 'Все' || productCategory === category) {
            $(this).show();
            count++;
        } else {
            $(this).hide();
        }
    });
    // $('.categoryCount').text(count);
}

$('input[name="Categories-1"]').on('change', function() {
    const filterValue = $(this).attr('id');

    switch(filterValue) {
        case 'Categories-3': // Распродажа
            const filteredSailArray = products.filter(function(item) {
                return item.filter === 'sail';
            });
            loadItems(filteredSailArray);
            break;

        case 'Categories-4': // Скидка
            const filteredDscountArray = products.filter(function(item) {
                return item.filter === 'discount';
            });
            loadItems(filteredDscountArray);
            break;

        case 'Categories-5': // Новые
            const filteredNewArray = products.filter(function(item) {
                return item.filter === 'new';
            });
            loadItems(filteredNewArray);
            break;

        default:
            loadItems(products);
            break;
    }
});
});