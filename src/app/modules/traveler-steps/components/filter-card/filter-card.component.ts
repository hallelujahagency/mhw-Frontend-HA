import { Component, OnInit,HostListener  } from '@angular/core';
import * as moment from 'moment';

declare var $;

@Component({
  selector: 'app-filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.css']
})
export class FilterCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let body = $('body');
 
    let now = moment();
    
            // Click to show filter box on mobile
            $('#show-filter-mobile').on('click', function () {
              $('#filter-mobile-box').fadeIn();
              $('body').css({'overflow': 'hidden'});
          });

          // Click to hide filter box on mobile
          $('#filter-mobile-box .popup-filter-close, #filter-mobile-box .view-result').on('click', function () {
              $('#filter-mobile-box').fadeOut();
              $('body').css({'overflow': ''});
          });

          $('.hh-search-bar-buttons .button-date', body).each(function (e) {
            let t = $(this),
                checkInOut = $('.check-in-out-field', t),
                checkIn = $('.check-in-field', t),
                checkOut = $('.check-out-field', t),
                checkInTime = $('.check-in-time-field', t),
                checkOutTime = $('.check-out-time-field', t),
                render = $('.text', t);

            let singlePicker = (t.hasClass('button-date-single')),
                singleClick = typeof t.data('single-click') !== 'undefined' ? t.data('single-click') : true,
                sameDate = typeof t.data('same-date') !== 'undefined' ? t.data('same-date') : singlePicker;

            let checkInVal = checkIn.val() || now.format('YYYY-MM-DD'),
                checkOutVal = checkOut.val() || now.add('1', 'days').format('YYYY-MM-DD'),
                checkInTimeVal = checkInTime.val() || '12:00 am',
                checkOutTimeVal = checkOutTime.val() || '12:00 am',
                hasDate = !!(checkIn.val() && checkOut.val());

            let options = {
                onlyShowCurrentMonth: true,
                showCalendar: false,
                alwaysShowCalendars: false,
                singleDatePicker: singlePicker,
                sameDate: sameDate,
                singleClick: singleClick,
                autoApply: true,
                disabledPast: true,
                dateFormat: 'YYYY-MM-DD',
                enableLoading: true,
                showEventTooltip: true,
                customClass: '',
                classNotAvailable: ['disabled', 'off'],
                disableHighLight: true,
                autoResponsive: true,
                startDate: moment(checkInVal + ' ' + checkInTimeVal, 'YYYY-MM-DD hh:mm a'),
                endDate: moment(checkOutVal + ' ' + checkOutTimeVal, 'YYYY-MM-DD hh:mm a'),
            };

            

            checkInOut.daterangepicker(options,
                function (start, end, label) {
                    if (start !== null && end !== null && (hasDate || label == 'clicked_date')) {
                        checkIn.val(start.format('YYYY-MM-DD'));
                        checkOut.val(end.format('YYYY-MM-DD'));
                        checkInTime.val(start.format('hh:mm a'));
                        checkOutTime.val(end.format('hh:mm a'));
                        if (singlePicker) {
                            render.text(start.format(t.data('date-format')));
                        } else {
                            render.text(start.format(t.data('date-format')) + ' - ' + end.format(t.data('date-format')));
                        }
                        checkInOut.trigger('daterangepicker_change', [start, end, label]);
                    }
                });

            let dp = checkInOut.data('daterangepicker');
            dp.updateView();
            dp.isShowing = true;
            dp.hide(e, true);

            t.click(function () {
                dp.show();
            });

        });
        $('#show-filter-mobile', body).click(function () {
          $('.filter-mobile-box .button-date', body).each(function (e) {
              let t = $(this),
                  checkInOut = $('.check-in-out-field', t),
                  checkIn = $('.check-in-field', t),
                  checkOut = $('.check-out-field', t),
                  checkInTime = $('.check-in-time-field', t),
                  checkOutTime = $('.check-out-time-field', t),
                  render = $('.text', t);

              let singlePicker = (t.hasClass('button-date-single')),
                  singleClick = typeof t.data('single-click') !== 'undefined' ? t.data('single-click') : true,
                  sameDate = typeof t.data('same-date') !== 'undefined' ? t.data('same-date') : (t.hasClass('button-same-date'));

              let checkInVal = checkIn.val() || moment().format('YYYY-MM-DD'),
                  checkOutVal = checkOut.val() || moment().add('1', 'days').format('YYYY-MM-DD'),
                  checkInTimeVal = checkInTime.val() || '12:00 am',
                  checkOutTimeVal = checkOutTime.val() || '12:00 am',
                  hasDate = !!(checkIn.val() && checkOut.val());

              let options = {
                  parentEl: t,
                  onlyShowCurrentMonth: true,
                  showCalendar: true,
                  alwaysShowCalendars: true,
                  singleDatePicker: singlePicker,
                  sameDate: sameDate,
                  singleClick: singleClick,
                  autoApply: true,
                  disabledPast: true,
                  dateFormat: 'YYYY-MM-DD',
                  enableLoading: true,
                  showEventTooltip: true,
                  customClass: 'calendar-popup-filter',
                  classNotAvailable: ['disabled', 'off'],
                  disableHighLight: true,
                  autoResponsive: false,
                  startDate: moment(checkInVal + ' ' + checkInTimeVal, 'YYYY-MM-DD hh:mm a'),
                  endDate: moment(checkOutVal + ' ' + checkOutTimeVal, 'YYYY-MM-DD hh:mm a'),
              };

             
              checkInOut.daterangepicker(options,
                  function (start, end, label) {
                      if (start !== null && end !== null && (hasDate || label == 'clicked_date')) {
                          checkIn.val(start.format('YYYY-MM-DD'));
                          checkOut.val(end.format('YYYY-MM-DD'));
                          checkInTime.val(start.format('hh:mm a'));
                          checkOutTime.val(end.format('hh:mm a'));
                          if (singlePicker) {
                              render.text(start.format(t.data('date-format')));
                          } else {
                              render.text(start.format(t.data('date-format')) + ' - ' + end.format(t.data('date-format')));
                          }
                          checkInOut.trigger('daterangepicker_change', [start, end, label]);

                          let formWrapper = t.closest('.filter-mobile-box'),
                              timeWrapper = $('.date-wrapper.date-time', formWrapper);

                          if (timeWrapper.length) {
                              let checkInTime = $('[name="checkInTime"]', timeWrapper),
                                  checkOutTime = $('[name="checkOutTime"]', timeWrapper),
                                  checkInDate = start.format('YYYY-MM-DD'),
                                  checkOutDate = end.format('YYYY-MM-DD');

                              if (checkInDate === checkOutDate &&
                                  checkInTime.val() === checkOutTime.val() &&
                                  checkInTime.val() !== '' &&
                                  checkOutTime.val() !== '') {
                                  let checkInDropdown = $('.check-in-render .dropdown-time', timeWrapper),
                                      checkOutDropdown = $('.check-out-render .dropdown-time', timeWrapper),
                                      currentTime = checkInDropdown.find('.item.active'),
                                      pos = currentTime.index();

                                  $('.item', checkOutDropdown).eq(pos).next().click();
                                  $('.item', checkOutDropdown).eq(pos).addClass('disable').prevAll().addClass('disable');
                              }
                          }
                      }
                  });

              let dp = checkInOut.data('daterangepicker');

              dp.updateView();
              dp.isShowing = true;
              dp.hide(e, true);
          });
      });

        $('[data-plugin="ion-range-slider"]', body).each(function () {
          let elRanger = $(this);
          let min = parseFloat($(this).data().min),
              max = parseFloat($(this).data().max);
          elRanger.ionRangeSlider({
              skin: $(this).data('skin'),
              min: min,
              max: max,
              from: parseFloat($(this).data().from),
              to: parseFloat($(this).data().to),
              type: "double",
              prefix: $(this).data().prefix,
              onFinish: function (data) {
                  elRanger.trigger('hh_ranger_changed');
              },
              prettify: function(num) {
                  
                      return num;
                  
              }
          });
      });
  }

  clickDropdownPrix(variable:boolean=false){

    if(variable){
      document.getElementById("prix_main_menu").classList.toggle("show");

      $(".irs-handle").css("border", "2px solid #35989b !important")
    }
    
  }

 

   @HostListener("window:click", ["$event"])
  onWindowClick(event:any) {

    console.log(event.target.matches('.irs-handle'))

    if (!event.target.matches('.button-price-custom') && !event.target.matches('.irs-handle')) {

        var dropdowns = document.getElementsByClassName("prix_main_menuDrop");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }

      
      
    }
} 

 

}
