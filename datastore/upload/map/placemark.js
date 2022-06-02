jQuery(function () {
    ymaps.ready(init);
});

function init () {
    const url = 'https://content-manager-route-nikitadyadechkin-1-dev.apps.sandbox.x8i5.p1.openshiftapps.com/posts';
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id')

    var geolocation = ymaps.geolocation,
        myMap = new ymaps.Map('map', {
            center: [55.819543, 37.611619],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        }),
        // Смещение маркера относительно курсора.
        markerOffset,
        markerPosition;

    geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true
    }).then(function (result) {
        // Красным цветом пометим положение, вычисленное через ip.
        result.geoObjects.options.set('preset', 'islands#redCircleIcon');
        result.geoObjects.get(0).properties.set({
            balloonContentBody: 'Мое местоположение'
        });
        myMap.geoObjects.add(result.geoObjects);
    });

    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        // Синим цветом пометим положение, полученное через браузер.
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        myMap.geoObjects.add(result.geoObjects);
    });

    fetch(`${url}/near`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for(const index in data) {
                let post = data[index]
                console.log(post)
                console.log(post.latitude, post.longitude)
                console.log(post, parseFloat(post.latitude), parseFloat(post.longitude))
                myMap.geoObjects.add(new ymaps.Placemark([parseFloat(post.latitude), parseFloat(post.longitude)], {
                    balloonContent: post.title
                }, {
                    preset: 'islands#circleIcon',
                    iconColor: '#3caa3c'
                }))
            }
            console.log(data);
        });

}