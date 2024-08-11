document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reviewForm');
    const productList = document.getElementById('product-list');
    const reviewList = document.getElementById('review-list');
    const reviewsContainer = document.getElementById('reviews-container');
    const selectedProductName = document.getElementById('selected-product-name');

    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Получение значений полей формы
        const productName = document.getElementById('product-name').value.trim();
        const reviewText = document.getElementById('review-text').value.trim();

        // Если оба поля заполнены, добавляем отзыв
        if (productName && reviewText) {
            addReview(productName, reviewText);
            form.reset(); // Очистка формы после добавления отзыва
            displayProductList(); // Обновление списка продуктов с отзывами
        }
    });

    // Функция для добавления отзыва в LocalStorage
    function addReview(productName, reviewText) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || {};

        // Если отзывов для данного продукта нет, создаем новый массив
        if (!reviews[productName]) {
            reviews[productName] = [];
        }

        // Добавляем новый отзыв в массив
        reviews[productName].push(reviewText);

        // Сохраняем обновленный объект отзывов в LocalStorage
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Функция для отображения списка продуктов с отзывами
    function displayProductList() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
        productList.innerHTML = ''; // Очистка списка перед заполнением

        // Создание элемента списка для каждого продукта
        for (const product in reviews) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = product;
            a.href = "#"; // Добавление ссылки для продукта

            // Обработка клика по названию продукта
            a.addEventListener('click', function() {
                displayReviews(product);
            });

            li.appendChild(a);
            productList.appendChild(li);
        }
    }

    // Функция для отображения отзывов о конкретном продукте
    function displayReviews(productName) {
        const reviews = JSON.parse(localStorage.getItem('reviews'))[productName] || [];
        selectedProductName.textContent = productName;
        reviewList.innerHTML = ''; // Очистка списка отзывов

        // Создание элемента списка для каждого отзыва
        reviews.forEach((review, index) => {
            const li = document.createElement('li');
            li.textContent = review;

            // Создание кнопки удаления отзыва
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.className = 'delete-button';

            // Обработка клика по кнопке удаления
            deleteButton.addEventListener('click', function() {
                deleteReview(productName, index);
            });

            li.appendChild(deleteButton);
            reviewList.appendChild(li);
        });

        // Отображение контейнера с отзывами
        reviewsContainer.style.display = 'block';
    }

    // Функция для удаления отзыва
    function deleteReview(productName, reviewIndex) {
        let reviews = JSON.parse(localStorage.getItem('reviews'));

        // Удаление отзыва из массива
        reviews[productName].splice(reviewIndex, 1);

        // Если отзывов не осталось, удаляем продукт из объекта
        if (reviews[productName].length === 0) {
            delete reviews[productName];
        }

        // Сохранение обновленного объекта отзывов в LocalStorage
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Обновление списка отзывов и продуктов
        displayReviews(productName);
        displayProductList();
    }

    // Отображение списка продуктов при загрузке страницы
    displayProductList();
});
