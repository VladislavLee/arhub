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
    let myLocation = {}

    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        myLocation = result.geoObjects.position
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

                let point = new ymaps.Placemark([parseFloat(post.latitude), parseFloat(post.longitude)], {
                    balloonContent: post.title
                }, {
                    preset: 'islands#circleIcon',
                    iconColor: '#3caa3c'
                });

                let multiRoute = {}
                point.events.add(['balloonopen'], function (e) {
                     multiRoute = new ymaps.multiRouter.MultiRoute({
                        referencePoints: [
                            myLocation,
                            [parseFloat(post.latitude), parseFloat(post.longitude)]
                        ],
                        params: {
                            //Тип маршрутизации - пешеходная маршрутизация.
                            routingMode: 'pedestrian'
                        }
                    }, {
                        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                        boundsAutoApply: true
                    });
                    myMap.geoObjects.add(multiRoute);
                });

                point.events.add(['balloonclose'], function (e) {
                    myMap.geoObjects.remove(multiRoute)
                    console.log("event triggered", e)
                });

                myMap.geoObjects.add(point)
            }
            console.log(data);
        });

}