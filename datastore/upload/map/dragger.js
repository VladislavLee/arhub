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
        markerElement = jQuery('#marker'),
        dragger = new ymaps.util.Dragger({
            // Драггер будет автоматически запускаться при нажатии на элемент 'marker'.
            autoStartElement: markerElement[0]
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

    dragger.events
        .add('start', onDraggerStart)
        .add('move', onDraggerMove)
        .add('stop', onDraggerEnd);

    function onDraggerStart(event) {
        var offset = markerElement.offset(),
            position = event.get('position');
        // Сохраняем смещение маркера относительно точки начала драга.
        markerOffset = [
            position[0] - offset.left,
            position[1] - offset.top
        ];
        markerPosition = [
            position[0] - markerOffset[0],
            position[1] - markerOffset[1]
        ];

        applyMarkerPosition();
    }

    function onDraggerMove(event) {
        applyDelta(event);
    }

    function onDraggerEnd(event) {
        applyDelta(event);
        markerPosition[0] += markerOffset[0];
        markerPosition[1] += markerOffset[1];
        // Переводим координаты страницы в глобальные пиксельные координаты.
        var markerGlobalPosition = myMap.converter.pageToGlobal(markerPosition),
            // Получаем центр карты в глобальных пиксельных координатах.
            mapGlobalPixelCenter = myMap.getGlobalPixelCenter(),
            // Получением размер контейнера карты на странице.
            mapContainerSize = myMap.container.getSize(),
            mapContainerHalfSize = [mapContainerSize[0] / 2, mapContainerSize[1] / 2],
            // Вычисляем границы карты в глобальных пиксельных координатах.
            mapGlobalPixelBounds = [
                [mapGlobalPixelCenter[0] - mapContainerHalfSize[0], mapGlobalPixelCenter[1] - mapContainerHalfSize[1]],
                [mapGlobalPixelCenter[0] + mapContainerHalfSize[0], mapGlobalPixelCenter[1] + mapContainerHalfSize[1]]
            ];
        // Проверяем, что завершение работы драггера произошло в видимой области карты.
        if (containsPoint(mapGlobalPixelBounds, markerGlobalPosition)) {
            // Теперь переводим глобальные пиксельные координаты в геокоординаты с учетом текущего уровня масштабирования карты.
            var geoPosition = myMap.options.get('projection').fromGlobalPixels(markerGlobalPosition, myMap.getZoom()),
            // Получаем уровень зума карты.
                zoom = myMap.getZoom(),
            // Получаем координаты тайла.
                tileCoordinates = getTileCoordinate(markerGlobalPosition, zoom, 256);

            const data = {
                latitude: `${geoPosition[0]}`,
                longitude: `${geoPosition[1]}`
            };
            fetch(`${url}/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // alert([
            //     'Координаты: ' + geoPosition,
            //     'Уровень зума: ' + zoom,
            //     'Глобальные пиксельные координаты: ' + markerGlobalPosition,
            //     'Координаты тайла: ' + tileCoordinates
            // ].join(' '));
        }
    }

    function applyDelta (event) {
        // Поле 'delta' содержит разницу между положениями текущего и предыдущего события драггера.
        var delta = event.get('delta');
        markerPosition[0] += delta[0];
        markerPosition[1] += delta[1];
        applyMarkerPosition();
    }

    function applyMarkerPosition () {
        markerElement.css({
            left: markerPosition[0],
            top: markerPosition[1]
        });
    }

    function containsPoint (bounds, point) {
        return point[0] >= bounds[0][0] && point[0] <= bounds[1][0] &&
               point[1] >= bounds[0][1] && point[1] <= bounds[1][1];
    }

    function getTileCoordinate(coords, zoom, tileSize){
        return [
            Math.floor(coords[0] * zoom / tileSize),
            Math.floor(coords[1] * zoom / tileSize)
        ];
    }
}