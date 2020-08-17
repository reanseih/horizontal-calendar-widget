command: "echo Hello World!",
// command: 'date -v1d +"%e"; date -v1d -v+1m -v-1d +"%d"; date +"%d%n%m%n%Y"',

dayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "October", "Nov", "Dec"],
offdayIndices: [5, 6], // Fr, Sa

refreshFrequency: 60000,
displayedDate: null,

render: function () {
  return "<div class=\"cal-container\">\
  <div class=\"title\"></div>\
  <div class=\"table\">\
  <div class=\"tr weekday\"></div>\
  <div class=\"tr date\"></div>\
  </div>\
  </div>";
},

style: "                              \n\
  bottom: 5px                         \n\
  width: 100%                         \n\
  font-family: Monaco                 \n\
  font-size: 9px                      \n\
  font-weight: 500                    \n\
  color: #fff                         \n\
                                      \n\
  .title                              \n\
    color: rgba(#000, 0)              \n\
    font-size: 12px                   \n\
    padding-left: 20px                \n\
    padding-bottom: 5px               \n\
    text-transform uppercase          \n\
                                      \n\
  .table                              \n\
    display: flex                     \n\
    flex-direction: column            \n\
    border-collapse: collapse         \n\
                                      \n\
  .tr                                 \n\
    display: flex                     \n\
                                      \n\
  .tr div                             \n\
    width: 1.5em                      \n\
    padding-left: 4px                 \n\
    padding-right: 4px                \n\
    text-align: center                \n\
                                      \n\
  .weekday div:first-of-type,         \n\
  .date div:first-of-type,            \n\
  .midline div:first-of-type          \n\
    margin-left: 20px                 \n\
                                      \n\
  .weekday div                        \n\
    display: table-cell               \n\
    padding-top: 3px                  \n\
    padding-bottom: 4px               \n\
                                      \n\
  .date div                           \n\
    display: table-cell               \n\
    padding-top: 3px                  \n\
    padding-bottom: 3px               \n\
                                      \n\
  .today, .off-today                  \n\
    background: rgba(#000, 0.2)       \n\
                                      \n\
  .weekday .today,                    \n\
  .weekday .off-today                 \n\
    border-radius: 3px 3px 0 0        \n\
                                      \n\
  .date .today,                       \n\
  .date .off-today                    \n\
    border-radius: 0 0 3px 3px        \n\
                                      \n\
  .midline                            \n\
    height: 1px                       \n\
    background: rgba(#000, .0)        \n\
                                      \n\
  .midline .today                     \n\
    background: rgba(#000, .0)        \n\
                                      \n\
  .midline .offday                    \n\
    background: rgba(#f77, .0)        \n\
                                      \n\
  .midline .off-today                 \n\
    background: rgba(#f77, .0)        \n\
                                      \n\
  .offday, .off-today                 \n\
    color: rgba(#f77, 1)              \n\
",

update: function (output, domEl) {
  // var date = output.split("\n"), firstWeekDay = date[0], lastDate = date[1], today = date[2], m = date[3]-1, y = date[4];

  // // DON'T MANUPULATE DOM IF NOT NEEDED
  // if(this.displayedDate != null && this.displayedDate == output) return;
  // else this.displayedDate = output;

  var date = new Date(), y = date.getFullYear(), m = date.getMonth(), today = date.getDate();

  // DON'T MANUPULATE DOM IF NOT NEEDED
  var newDate = [today, m, y].join("/");
  if(this.displayedDate != null && this.displayedDate == newDate) return;
  else this.displayedDate = newDate;

  var firstWeekDay = new Date(y, m, 1).getDay();
  var lastDate = new Date(y, m + 1, 0).getDate();

  var weekdays = "", midlines = "", dates = "";

  for (var i = 1, w = firstWeekDay; i <= lastDate; i++, w++) {
    w %= 7;
    var isToday = (i == today), isOffday = (this.offdayIndices.indexOf(w) != -1);
    var className = "ordinary";
    if(isToday && isOffday) className = "off-today";
    else if(isToday) className = "today";
    else if(isOffday) className = "offday";

    weekdays += "<div class=\""+className+"\">" + this.dayNames[w] + "</div>";
    midlines += "<div class=\""+className+"\"></div>";
    dates += "<div class=\""+className+"\">" + i + "</div>";
  };

  $(domEl).find(".title").html(this.monthNames[m]+" "+y);
  $(domEl).find(".weekday").html(weekdays);
  $(domEl).find(".midline").html(midlines);
  $(domEl).find(".date").html(dates);
}
