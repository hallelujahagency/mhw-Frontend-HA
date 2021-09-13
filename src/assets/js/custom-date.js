

var minDate = new Date();
var maxDate = new Date();
var datePickers = [];

minDate.setDate(minDate.getDate() + 1);
maxDate.setMonth(maxDate.getMonth() + 12);

function pad(s) {
    return (s < 10) ? '0' + s : s;
}

var datePickerInputs = Array.prototype.slice.call(document.querySelectorAll('.tiny-date-picker'));
var datePickerOptions = {
    // mode: mobilecheck() ? 'dp-modal' : 'dp-below',
    format: function (d) {
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    },
    parse(str) {
        var dateParts = str.split("/");
        var date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        return isNaN(date) ? new Date() : date;
    },
    min: minDate,
    max: maxDate,
    dayOffset:  1,
    lang: {
        days: [
            'dim',
            'lun',
            'mar',
            'mer',
            'jeu',
            'ven',
            'sam'
          ],
        months: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aôut',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre',
          ],
        today: 'Aujourd&#039;hui',
        clear: 'Effacer',
        close: 'Fermer',
    },
};

datePickerInputs.forEach(function (datePickerInput) {
    datePickers.push(TinyDatePicker('.tiny-date-picker', datePickerOptions));
});

TinyDatePicker('.tiny-date-picker', datePickerOptions);

var selectedDate, returnDate, noStayes;

$('#loop_request_departureAt').change(function () {
    selectedDate = $(this).val();

    if (selectedDate) {
        var newMinDate = moment(selectedDate, 'DD/MM/YYYY').add(1, 'day').toDate();
        var newOptions = $.extend({}, datePickerOptions, {min: newMinDate});


        datePickers[1].destroy();
        console.log(datePickers[1], newOptions);
        datePickers[1] = TinyDatePicker(datePickerInputs[1], newOptions);
        datePickers[1].setState({
            selectedDate: null
        })
    }

   // updateDisabledButton();
});

$('#loop_request_returnAt').change(function () {
    returnDate = $(this).val();



  //  updateDisabledButton();
});