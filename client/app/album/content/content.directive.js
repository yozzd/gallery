'use strict';

angular.module('galleryApp')
    .directive('justified', function ($timeout, $document) {
        return {
            restrict: 'AE',
            link: function (scope, el) {
                scope.$watch('$last', function (n) {
                    if (n) {
                        $timeout(function () {
                            $(el[0]).justifiedGallery({
                                rowHeight: 160,
                                maxRowHeight: 240,
                                margins: 3,
                                lastRow: 'justify'
                            });
                        });
                    }
                });
                if (scope.vm.limit !== undefined) {
                    scope.$watch('vm.limit', function (n, o) {
                        if (n > o) {
                            $timeout(function () {
                                $document.scrollToElementAnimated(document.getElementById('more'));
                                $(el[0]).justifiedGallery({
                                    rowHeight: 160,
                                    maxRowHeight: 240,
                                    margins: 3,
                                    lastRow: 'justify'
                                });
                            });
                        }
                    });
                }
            }
        };
    })
    .directive('repeatDone', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var parentScope = element.parent().scope();
                if (scope.$last) {
                    parentScope.$last = true;
                }
            }
        };
    });
