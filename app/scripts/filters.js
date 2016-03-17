'use strict';

angular.module('appFilters', [])

    .filter('toSafe', function ($sce) {
        return function (html) {
            return $sce.trustAsHtml(html);
        };
    })

    // Telephone Formating
    .filter('telephone', function () {
        return function (tel) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            var country, city, number;

            switch (value.length) {
                case 10:
                    country = 1;
                    city = value.slice(0, 3);
                    number = value.slice(3);
                    break;

                default:
                    return tel;
            }

            // Possible future International Merchant
            if (country === 1) {
                country = '';
            }

            number = number.slice(0, 3) + '-' + number.slice(3);

            return (country + ' (' + city + ') ' + number).trim();
        };
    })

    .filter('hours', function () {
        return function (hours) {
            var re = /(([0-1][0-9])|([2][0-3])):([0-5][0-9])/g;
            var m;
            if ((m = re.exec(hours)) !== null) {
                var time = m[0];
                var parts = time.split(':'),
                    hour = parts[0],
                    minutes = parts[1];
                if (hour > 12) {
                    time = (hour - 12) + ':' + minutes + 'pm';
                } else if (hour < 12) {
                    time = (hour - 0) + ':' + minutes + 'am';
                }
                return time;
            }
        };
    })

    .filter('formatDate', function () {
        return function (date) {
            var re = /([0-1][0-9])([0-3][0-9])([0-2][0-9][0-9][0-9])/g;
            var m;
            if ((m = re.exec(date)) !== null) {
                var month = m[1],
                    day = m[2],
                    year = m[3];

                var newdate = year + '-' + month + '-' + day;
                return newdate;
            }
        };
    })

    .filter('customCurrency', ['$filter', function ($filter) {
        return function (amount, currencySymbol) {
            var currency = $filter('currency');

            if(amount < 0){
                return currency(amount, currencySymbol).replace('(', '-').replace(')', '');
            }

            return currency(amount, currencySymbol);
        };
    }])

    .filter('displayDate', function () {
        return function (date) {
            var re = /([0-2][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])/g;
            var m;
            if ((m = re.exec(date)) !== null) {
                var fullDate = m[0];
                var parts = fullDate.split('-'),
                    month = parts[1],
                    day = parts[2],
                    year = parts[0];

                var newDate = month + day + year;
                return newDate;
            }
        };
    })

    .filter('displayWrittenDate', function () {
        return function (date) {
            var re = /([0-2][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])/g;
            var m;
            if ((m = re.exec(date)) !== null) {
                date = m[0];
                var parts = date.split('-'),
                    month = parts[1],
                    day = parts[2],
                    year = parts[0];

                if (month === '01') {month = 'January';}
                if (month === '02') {month = 'February';}
                if (month === '03') {month = 'March';}
                if (month === '04') {month = 'April';}
                if (month === '05') {month = 'May';}
                if (month === '06') {month = 'June';}
                if (month === '07') {month = 'July';}
                if (month === '08') {month = 'August';}
                if (month === '09') {month = 'September';}
                if (month === '10') {month = 'October';}
                if (month === '11') {month = 'November';}
                if (month === '12') {month = 'December';}

                if (day < 10) {day = (day - 0);}

                var newDate = month + ' ' + day + ', ' + year;
                return newDate;
            }
        };
    })

    .filter('bindDate', function () {
        return function (date) {
            var re = /([0-2][0-9][0-9][0-9])-([0-1][0-9])-([0-3][0-9])/g;
            var m;
            if ((m = re.exec(date)) !== null) {
                var fullDate = m[0];
                var parts = fullDate.split('-'),
                    month = parts[1],
                    day = parts[2],
                    year = parts[0];

                var newDate = month + '/' + day + '/' + year;
                return newDate;
            }
        };
    })

    .filter('displayArrayDate', function () {
        return function (date) {
            var newdate = date.join();
            var dates = parseFloat(newdate.replace(/,/g, ''));

            var re = /([0-2][0-9][0-9][0-9])([0-1][0-9])([0-3][0-9])/g;
            var m;

            if ((m = re.exec(dates)) !== null) {
                var year = m[1],
                    month = m[2],
                    day = m[3];

                var newDate = month + day + year;
                return newDate;
            }
        };
    })

    .filter('character', function () {
        return function (input) {
            return String.fromCharCode(64 + parseInt(input,10));
        };
    })

    .filter('expYear', function () {
        return function (year) {
            var re = /([0-2][0-1])([0-3][0-9])/g;
            var m;

            if ((m = re.exec(year)) !== null) {
                var newYear = m[2];
                return newYear;
            }
        };
    });
