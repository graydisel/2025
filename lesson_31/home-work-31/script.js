// #1 За допомогою ajax-запиту вивести погоду
//
// http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19
// q=XXX - місто, для якого показати погоду

// Вводимо в інпут назву міста, натискаємо кнопку Погода
// Якщо таке місто не існує (404), виводимо напис, що таке місце не знайдено
// Якщо місто існує, виводимо наступну інформацію:
// temp – температура
// pressure - тиск
// description – опис
// humidity – вологість
// speed – швидкість вітру
// deg - напрям у градусах
// icon - значок, де 10d код іконки (виводимо картинку з таким урлом, як нам повернувся)
// http://openweathermap.org/img/w/10d.png

const submitElement = document.getElementById('submit');

submitElement.addEventListener('click', () => {
    const inputCity = document.getElementById('city-name').value;
    getWeatherData(inputCity);
});


async function getWeatherData(city) {

    const textRegEx = /^[a-zA-Z\-]+$/;

    if (!textRegEx.test(city)) {
        alert('Invalid city. Please enter a valid city');
    }
    else {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('weather-information').classList.add('hidden');

        const input = city.toUpperCase();
        const linkApi = `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&APPID=5d066958a60d315387d9492393935c19`;

        try {
            const data = await fetch(linkApi).then(res => {
                if (!res.ok) {
                    alert('Sorry, no city matched');
                    throw new Error('Sorry, no city matched');

                }
                return res.json();
            });
            console.log(data);
            document.getElementById('weather-information').classList.remove('hidden');
            document.getElementById('temperature').innerHTML = data.main.temp;
            document.getElementById('pressure').innerHTML = data.main.pressure;
            document.getElementById('humidity').innerHTML = data.main.humidity;
            document.getElementById('wind-speed').innerHTML = data.wind.speed;
            document.getElementById('wind-direction').innerHTML = data.wind.deg;

        } catch (error) {
            console.log(error.message);
        } finally {
            document.getElementById('loading').classList.add('hidden');
        }
    }

}



// За бажанням:
// #2 Використовуючи API https://jsonplaceholder.typicode.com/ зробити пошук поста за ід.
// На сторінку вивести інпут та кнопку Пошук
// Ід поста має бути введений в інпут (валідація: ід від 1 до 100)
// Якщо знайдено пост, то вивести на сторінку нижче блок з постом і зробити кнопку для отримання коментарів до посту.
// По клику на кнопку коментарі має бути виведені нижче під постом коментарі до цього посту
// Якщо зробити Пошук нового поста, старий пост та коментарі видаляються зі сторінки
// Зробити завдання використовуючи проміси, перехопити помилки.