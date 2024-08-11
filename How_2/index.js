class Library {
    #books = [];

    constructor(books) {
        this.#books = books;
    }

    get getBooks() {
        return this.#books;
    }

    allBooks() {
        for (const el of this.#books) {
            console.log(`${this.#books.indexOf(el) + 1}
          Название: ${el.title} 
          Автор: ${el.author} 
          Год выпуска: ${el.year} 
          Описание: ${el.description}`);
        }
    }

    addBook(titleBook, authorBook, yearBook, descriptionBook) {
        const book = {
            title: titleBook,
            author: authorBook,
            year: yearBook,
            description: descriptionBook,
        };
        this.#books.push(book);
    }

    removeBook(titleBook) {
        for (const el of this.#books) {
            if (el.title === titleBook) {
                this.#books.splice(this.#books.indexOf(el), this.#books.indexOf(el));
                return 'Книга удалена';
            }
        }
        return 'Такой книги не существует';
    }
    hasBook(titleBook) {
        for (const el of this.#books) {
            if (el.title === titleBook) {
                return true;
            }
        }
        return false;
    }
}

const arrBooks = [
    {
        title: 'Все предельно',
        author: 'Стивен Кинг',
        year: 2002,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sunt?',
    },
    {
        title: 'Четыре сезона',
        author: 'Стивен Кинг',
        year: 1982,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sunt?',
    },
];

const library = new Library(arrBooks);

/*
library.addBook(
  'Все предельно',
  'Стивен Кинг',
  2002,
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sunt?'
);
library.addBook(
  'Четыре сезона',
  'Стивен Кинг',
  1982,
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sunt?'
);
*/

library.addBook(
    'Роза Марена',
    'Стивен Кинг',
    1995,
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sunt?'
);
library.allBooks();
console.log('-------------------------------------------');
console.log(library.removeBook('Четыре сезона'));
library.allBooks();
console.log(library.hasBook('Четыре сезона'));
console.log(library.hasBook('Роза Марена'));



/* Задание 2 */

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            { id: "1", text: "Отличный телефон! Батарея держится долго." },
            { id: "2", text: "Камера супер, фото выглядят просто потрясающе." }
        ]
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            { id: "3", text: "Интересный дизайн, но дорогой." }
        ]
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            { id: "4", text: "Люблю играть на PS5, графика на высоте." }
        ]
    }
];

// Отображение начальных данных
function displayInitialReviews() {
    const reviewsContainer = document.getElementById('reviews');
    initialData.forEach(product => {
        const productContainer = document.createElement('div');
        productContainer.className = 'review-container';
        const productTitle = document.createElement('h3');
        productTitle.innerText = product.product;
        productContainer.appendChild(productTitle);

        product.reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerText = review.text;
            productContainer.appendChild(reviewElement);
        });

        reviewsContainer.appendChild(productContainer);
    });
}

// Добавление нового отзыва
function addReview() {
    const selectedProduct = document.getElementById('product-select').value;
    const reviewText = document.getElementById('review-text').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = '';

    try {
        if (reviewText.length < 50 || reviewText.length > 500) {
            throw new Error('Отзыв должен быть длиной от 50 до 500 символов.');
        }

        const productIndex = initialData.findIndex(p => p.product === selectedProduct);
        const newReview = {
            id: (initialData[productIndex].reviews.length + 1).toString(),
            text: reviewText
        };

        initialData[productIndex].reviews.push(newReview);

        // Обновление отображения
        const productContainer = document.querySelector(`.review-container:nth-child(${productIndex + 1})`);
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review';
        reviewElement.innerText = newReview.text;
        productContainer.appendChild(reviewElement);

        document.getElementById('review-text').value = '';
    } catch (error) {
        errorMessage.innerText = error.message;
    }
}

// Инициализация
displayInitialReviews();
