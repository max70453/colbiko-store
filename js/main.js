(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Modal Video
    // $(document).ready(function () {
    //     var $videoSrc;
    //     $('.btn-play').click(function () {
    //         $videoSrc = $(this).data("src");
    //     });
    //     console.log($videoSrc);

    //     $('#videoModal').on('shown.bs.modal', function (e) {
    //         $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    //     })

    //     $('#videoModal').on('hide.bs.modal', function (e) {
    //         $("#video").attr('src', $videoSrc);
    //     })
    // });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

    const products = [
        { 
            id: 1741596421720, 
            name: "Дрогобычская", 
            description: "Состав: свинина, посолочная смесь, сахар, пряности и экстракты пряностей, усилитель вкуса и аромата, регулятор кислотности, ароматизаторы, краситель гемоглобин.",
            price: 780,
            category: 'Полукопченые',
            filter: 'sail',
            image: "img/drogobych1734251466.jpg",
            stars: 4
        },
        {
            id: 1741596421720, 
            name: "С говядиной",
            description: "Состав: мясо куриное, говядина, мясо куриное механической обвалки, свинина, эмульсия свиной шкурки, вода, крупа манная, сыворотка молочная сухая, посолочная смесь",
            price: 650,
            category: 'Вареные',
            filter: 'sail',
            image: "img/kolbasa-s-goviadinoi-varenaia1734951339.jpg",
            stars: 4
        },
        {
            id: 1741596427002, 
            name: "Сервелат", 
            description: "Грудинка свиная, говядина высшего сорта, свинина нежирная, посолочная смесь (соль поваренная пищевая, фиксатор окраски (Е250)), смесь пряностей, стартовая культура.",
            price: 980,
            category: 'Сырокопченые',
            filter: 'discount',
            image: "img/kolbasa-servelat-1647351193.jpg",
            stars: 4
        },
        {
            id: 1741596429732, 
            name: "Московская", 
            description: "Говядина высшего сорта, сало хребтовое, посолочная смесь (соль поваренная пищевая, фиксатор окраски (Е250)), смесь пряностей, стартовая культура.",
            price: 1350,
            category: 'Сырокопченые',
            filter: 'discount',
            image: "img/kolbasa-moskovskaia-1647351314.jpg",
            stars: 5
        },
        {
            id: 1741596430913, 
            name: "Курхан", 
            description: "Филе куриное, мясо куриное, сало хребтовое, нитритно-посолочная смесь, соль пищевая, смесь пряностей, чеснок.",
            price: 1700,
            category: 'Сыровяленые',
            filter: 'discount',
            image: "img/kolbasa-kurkhan-1647351377.jpg",
            stars: 5
        },
        {
            id: 1741596431912, 
            name: "Пикантная", 
            description: "Мясо куриное, сало боковое, соевый изолят, нитритно-посолочная смесь, соль пищевая, смесь пряностей, краситель пищевой (Е120), стартовая культура.",
            price: 1800,
            category: 'Сырокопченые',
            filter: 'new',
            image: "img/kolbasa-pikantnaia-1647335319.jpg",
            stars: 5
        },
        {
            id: 1741596445184, 
            name: "Фирменная", 
            description: "Состав: свинина, говядина, шпик, ММО, посолочная смесь, сахар, пряности и экстракты пряностей, усилитель вкуса и аромата, регуляторы кислотности, стабилизатор, антиокислитель, ароматизаторы, красители, гемоглобин.",
            price: 690,
            category: 'Варено-копченые',
            filter: 'new',
            image: "img/kolbasa-firmennaia-vareno-kopchenaia1734351651.jpg",
            stars: 3
        },
        {
            id: 1741596448845, 
            name: "Гранд-филе", 
            description: "Филе куриное, мясо куриное, посолочная смесь  (соль пищевая, фиксатор окраски (Е250)), смесь пряностей.",
            price: 800,
            category: 'Сыровяленые',
            filter: 'new',
            image: "img/kolbasa-grand-file-1647351135.jpg",
            stars: 4
        },
        {
            id: 1741596448845, 
            name: "Три поросенка", 
            description: "Состав: свинина, мясо куриное механической обвалки, вода, крупа манная, сыворотка молочная сухая, посолочная смесь",
            price: 580,
            category: 'Вареные',
            filter: 'new',
            image: "img/kolbasa-tri-porosenka-varenaia1734951258.jpg",
            stars: 5
        }
    ];

    localStorage.setItem('products', JSON.stringify(products));
    
    $('#contact-form').on('click', function(e){
        e.preventDefault();
        let name = $("input[name='name']").val();
        let email = $("input[name='email']").val();
        if (!name || !email) {
           alert('Поля имя и Email обязательны');
        }
        else{
            alert('Ваше сообщение успешно отправлено');
            location.reload();
        }
    })

    $('.detail').on('click', function(e){
        e.preventDefault();
        const detail = e.target.text;
        console.log(e.target.text);
        
        localStorage.setItem('productDetail', JSON.stringify(detail));
        window.location.replace('shop-detail.html');
    })
        
})(jQuery);

// Account Dashboard Navigation
$(document).ready(function() {
    // Function to show section
    function showSection(sectionId) {
        // Hide all sections
        $('.dashboard-section').removeClass('active');
        // Show selected section
        $('#' + sectionId).addClass('active');
        
        // Update navigation
        $('.dashboard-nav li').removeClass('active');
        $('.dashboard-nav a[href="#' + sectionId + '"]').parent().addClass('active');
    }

    // Handle navigation clicks
    $('.dashboard-nav a').click(function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href').substring(1);
        showSection(targetId);
    });

    // Show initial section (profile)
    showSection('profile');

    // Handle form submissions
    $('#profile form').submit(function(e) {
        e.preventDefault();
        alert('Профиль успешно обновлен');
    });

    $('#settings form').submit(function(e) {
        e.preventDefault();
        alert('Настройки успешно сохранены');
    });

    // Handle address actions
    $('#addresses .btn-primary').click(function() {
        alert('Функция добавления адреса будет доступна в ближайшее время');
    });

    $('.btn-edit').click(function() {
        alert('Функция редактирования адреса будет доступна в ближайшее время');
    });

    $('.btn-delete').click(function() {
        if (confirm('Вы уверены, что хотите удалить этот адрес?')) {
            $(this).closest('.address-card').remove();
        }
    });

    // Handle wishlist actions
    $('.btn-remove').click(function() {
        if (confirm('Вы уверены, что хотите удалить этот товар из избранного?')) {
            $(this).closest('.product-card').remove();
        }
    });
});

