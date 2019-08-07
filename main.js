function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  var getAllRecords = function() {
    $.getJSON('https://api.airtable.com/v0/appiGtaF3j1Qwae6e/Subsidized%20Childcare?api_key=keyGqOsVpcJt5u52h',
      function(airtable){
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var programTypes= record.fields['Program Types'];
          var Address = record.fields['Address'];
          var Phone = record.fields['Phone'];
          var Link = record.fields['Link'];
          var Photo = record.fields['Photo'];
          html.push(listView(id, programTypes, Address, Phone, Link, Photo));
        });
        $('.list-view').append(html);
      }
    );
  }

  var listView = function(id, programTypes, Address, Phone, Link, Photo ) {
    return `
    <div class="card" style="width: 18rem;>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">${programTypes}</li>
    <li class="list-group-item">${Address}</li>
    <li class="list-group-item">${Phone}</li>
    <li class="list-group-item"><a href="${Link}" class="list-group-item list-group-item-action" target="blank">Click here for more information</a></li>
    ${Photo ? `<img src="${Photo[0].url}">` : ``}
    </div>
    `;
  }


  var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}