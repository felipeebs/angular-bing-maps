/*global angular, Microsoft*/

function bboxDirective() {
    'use strict';

    function link(scope, element, attrs, mapCtrl) {
        var startCorner, endCorner;
        function setBoundaries() {
            if (!scope.coords || scope.coords.length !== 4) {
                return false;
            }
            startCorner = new Microsoft.Maps.Location(scope.coords[0], scope.coords[1]);
            endCorner = new Microsoft.Maps.Location(scope.coords[2], scope.coords[3]);
            var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(startCorner, endCorner);
            mapCtrl.map.setView({ bounds: viewBoundaries});
        }
        setBoundaries();

        scope.$watch('coords', function (newBbox) {
            scope.coords = newBbox;
            setBoundaries();
        });
    }

    return {
        link: link,
        restrict: 'EA',
        scope: {
            coords: '=?',
        },
        require: '^bingMap'
    };

}

angular.module('angularBingMaps.directives').directive('bbox', bboxDirective);
