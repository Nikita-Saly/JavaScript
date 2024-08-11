/* Задание 1
• Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

• Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

{
title: "Название альбома",
artist: "Исполнитель",
year: "Год выпуска" */





const musicCollection = {
    albums: [
        {
            title: "The Dark Side of the Moon",
            artist: "Pink Floyd",
            year: "1973"
        },
        {
            title: "Abbey Road",
            artist: "The Beatles",
            year: "1969"
        },
        {
            title: "Thriller",
            artist: "Michael Jackson",
            year: "1982"
        }
    ],
    [Symbol.iterator]: function() {
        let index = 0;
        const albums = this.albums;
        return {
            next: function() {
                return index < albums.length ?
                    { value: albums[index++], done: false } :
                    { done: true };
            }
        };
    }
};

// Используем цикл for...of для перебора альбомов
for (const album of musicCollection) {
    console.log(`${album.title}, ${album.artist} (${album.year})`);
}

/* Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

Необходимо создать систему управления этими заказами, которая позволит:

• Отслеживать, какой повар готовит какое блюдо.
• Записывать, какие блюда заказал каждый клиент.

Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты. */


// Повара и их специализации
const chefsSpecialties = new Map([
    ['Виктор', 'Пицца'],
    ['Ольга', 'Суши'],
    ['Дмитрий', 'Десерты']
]);

// Блюда и их повара
const dishesAndChefs = new Map([
    ['Пицца "Маргарита"', 'Виктор'],
    ['Пицца "Пепперони"', 'Виктор'],
    ['Суши "Филадельфия"', 'Ольга'],
    ['Суши "Калифорния"', 'Ольга'],
    ['Тирамису', 'Дмитрий'],
    ['Чизкейк', 'Дмитрий']
]);

// Заказы клиентов
const orders = new Map();

// Заказы клиентов
const clientAlex = {};
const clientMaria = {};
const clientIrina = {};

clientAlex['Пицца "Пепперони"'] = 1;
clientAlex['Тирамису'] = 1;

clientMaria['Суши "Калифорния"'] = 1;
clientMaria['Пицца "Маргарита"'] = 1;

clientIrina['Чизкейк'] = 1;

orders.set(clientAlex, clientAlex);
orders.set(clientMaria, clientMaria);
orders.set(clientIrina, clientIrina);

// Вывод информации о заказах
orders.forEach((order, client) => {
    console.log('Заказ клиента:');
    Object.keys(order).forEach(dish => {
        console.log(`${dish} - ${dishesAndChefs.get(dish)} готовит ${chefsSpecialties.get(dishesAndChefs.get(dish))}`);
    });
    console.log('---------------------');
});
