
var keypressed = false;

function saveToDatabase(e, editableObj,column,id) {
    //e.preventDefault();
    editableObj.contentEditable=false;

    if(e.keyCode != 13){
        keypressed = false;
    }

    if ( keypressed == false) {
        $(editableObj).css("background","url(./images/loaderIcon.gif) no-repeat right");

      //alert($(editableObj).css("background-color"););

      //alert(e + " - " + editableObj.innerHTML + " - " + column + " - " + id)

      $.ajax({
        type: 'POST',
        url: '/index.php',
        data: { 'coluna': column, 'editval': editableObj.innerHTML.replace('€', '').replace('&euro;', '').replace(' ', '').replace('&nbsp;', '').replace("<br>", ""), 'id1': id},
        dataType: 'text',
        success: function(data){
          $(editableObj).css("background","none");
          $('#sucesso').show().center();

          setTimeout(function(){ window.location.reload();}, 3000);

      },
      error: function(jqXHR, textStatus, errorThrown){
        $('#erro').show().center();
      }
     });
    }
};

function handle(e, editableObj,column,id){
    if(e.keyCode === 13){
      saveToDatabase(e, editableObj,column,id);
      keypressed = true;
  }
}

function placeCaretAtEnd(el) {
    el.innerHTML = el.innerHTML.replace('€', '').replace('&euro;', '').replace(' ', '').replace('&nbsp;', '').replace("<br>", "");
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
} else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

//onlick for remove auction
function removeAuctions(auction) {
    var api_addr = 'http://bid2.doismeios.pt:8080/api/auction/' + auction;

    if (confirm("Are you sure you want to delete auction " + auction +" ?")) {
        $.ajax({
            type: 'DELETE',
            url: api_addr,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                $('#sucesso').eq(0).show().center();
                //setTimeout(function(){ window.location.reload();}, 3000);
              },
              error: function(jqXHR, textStatus, errorThrown){
                $('#erro').show().center();
            }
        });
    }
}

//onlick for add auction
function addAuctions(auction) {
    var api_addr = 'http://bid2.doismeios.pt:8080/api/auction/' + auction;

    if (confirm("Are you sure you want to delete auction " + auction +" ?")) {
        $.ajax({
            type: 'DELETE',
            url: api_addr,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                $('#sucesso').eq(0).show().center();
                //setTimeout(function(){ window.location.reload();}, 3000);
              },
              error: function(jqXHR, textStatus, errorThrown){
                $('#erro').show().center();
            }
        });
    }
}



//Populate Auctions Tables
function populateAuctionTable(){
  $.ajax({
    type: 'GET',
    url: 'http://bid2.doismeios.pt:8080/api/auction',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    beforeSend: function (xhr) {
      //xhr.setRequestHeader('x-access-token', 'xxx');
    },
    success: function (data, status, jqXHR) {

      //Do stuff with the JSON data
      var leiloesAgendados = document.getElementById("leiloesAgendados");
      var numLeiloes = data.message.length;

      //Create Ongoing Auction Table Headers
      var tr = document.createElement('tr');
      var headertitles = ["ID Leilao", "Max Bid", "Current Bid", "Data Fim", "Nome", "Estado", "Vendedor", ""];

      for (var i = 0; i<headertitles.length; i++){
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(headertitles[i]));
        tr.appendChild(th);
      }
      leiloesAgendados.appendChild(tr);


      //Create Ended Auction Table Headers
      var tr = document.createElement('tr');
      var headertitles = ["ID Leilao", "Max Bid", "Current Bid", "Data Fim", "Nome", "Estado", "Vendedor", "Vencedor", "Pago", ""];

      for (var i = 0; i<headertitles.length; i++){
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(headertitles[i]));
        tr.appendChild(th);
      }
      leiloesTerminados.appendChild(tr);


      //populate table rows
      var existsEndedAuctions = false; //if true the ended auctions table will be displayed

      if (numLeiloes > 0) {
        for (var idx = 0; idx < numLeiloes; idx++){

          var _id         = data.message[idx]._id;
          var status      = data.message[idx].status;
          var maxbid      = data.message[idx].maxbid;
          var currentbid  = data.message[idx].currentbid;
          var enddate     = data.message[idx].enddate;
          var name        = data.message[idx].name;
          var status      = data.message[idx].status;
          var seller      = data.message[idx].seller;
          var buyer       = data.message[idx].buyer;
          var paied       = data.message[idx].paied;

          var tr = document.createElement('tr');

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(_id));
          tr.appendChild(td);

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(maxbid));
          tr.appendChild(td);

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(currentbid));
          tr.appendChild(td);

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(enddate));
          tr.appendChild(td);

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(name));
          tr.appendChild(td);

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(status));
          tr.appendChild(td);

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(seller));
          tr.appendChild(td);

          var td_remove = document.createElement('td');
          var btn = document.createElement("BUTTON");
          var t = document.createTextNode("Remove");
          btn.className = 'buttonRed';
          btn.id = _id;
          btn.onclick = function() {removeAuctions(this.id)};
          btn.appendChild(t);
          td_remove.appendChild(btn);

          if (status == 'Terminado' || status == 'Reiniciado'){
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(buyer));
            tr.appendChild(td);

            var td = document.createElement('td');
            td.appendChild(document.createTextNode(paied));
            tr.appendChild(td);
            tr.appendChild(td_remove);
            leiloesTerminados.appendChild(tr);
          }else{
            tr.appendChild(td_remove);
            leiloesAgendados.appendChild(tr);
          }
        }
      }
    },
     error: function (jqXHR, status) {
         // error handler
         alert(jqXHR.sucess);
     }
    });
  }

//Populate Wantlist Table
function populateWantlistTable(field, order){
  $.ajax({
    type: 'GET',
    url: 'http://bid2.doismeios.pt:8080/api/wantlist',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data, status, jqXHR) {

      //Do stuff with the JSON data
      var wantlistTbl = document.getElementById("wantlistTable");
      while (wantlistTbl.firstChild) {
          wantlistTbl.removeChild(wantlistTbl.firstChild);
      }
      alert(JSON.stringify(data));
      var numArtists = data.length-1;

      //Create Ongoing Auction Table Headers
      var tr = document.createElement('tr');
      var headertitles     = ["ID " , "Nome ", ""];
      var headertitlesJson = ["_id", "name", ""];

      for (var i = 0; i<headertitles.length; i++){
        var th = document.createElement('th');
        var label = document.createTextNode(headertitles[i]);
        var a     = document.createElement('a');
        var img   = document.createElement('img');
        img.src  = 'images/up.png'
        img.width = 12;
        img.height = 12;
        a.onclick = function() {populateWantlistTable(headertitlesJson[i], "asc")};
        a.appendChild(img);

        var a1     = document.createElement('a');
        var img1   = document.createElement('img');
        img1.src  = 'images/down.png';
        img1.width = 12;
        img1.height = 12;
        a1.onclick = function() {populateWantlistTable(headertitlesJson[i], "desc")};
        a1.appendChild(img1);

        th.appendChild(label);
        th.appendChild(a);
        th.appendChild(a1);
        tr.appendChild(th);
      }
      wantlistTbl.appendChild(tr);

      var artistList = [];

      //populate table rows
      if (numArtists > 0) {
        for (var idx in data){
          var _id         = data[idx]._id;
          var name        = data[idx].name;
          item = {};
          item ["_id"] = _id;
          item ["name"] = name;
          artistList.push(item);
        }


        artistList.sort(sortBy(field, order));

        for(var idx in artistList){

          var _id         = artistList[idx]._id;
          var name        = artistList[idx].name;

          var tr = document.createElement('tr');

          var td    = document.createElement('td');
          var label = document.createTextNode(_id);
          td.appendChild(label);
          tr.appendChild(td);

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(name));
          tr.appendChild(td);

          var td_remove = document.createElement('td');
          var btn = document.createElement("BUTTON");
          var t = document.createTextNode("Remove");
          btn.className = 'buttonRed';
          btn.id = _id;
          btn.onclick = function() {removeArtist(this.id)};
          btn.appendChild(t);
          td_remove.appendChild(btn);
          tr.appendChild(td_remove);
          wantlistTbl.appendChild(tr);
        }
      }
    },
     error: function (jqXHR, status) {
         // error handler
         alert(jqXHR.sucess);
     }
    });
}

//Sort JSON
function sortBy(prop, order){
  if (order == "asc"){
    return function(a,b){
       if( a[prop] > b[prop]){ return 1;  } else
       if( a[prop] < b[prop]){ return -1; }
       return 0;
    }
  }else{
    return function(a,b){
       if( a[prop] > b[prop]){ return -1; } else
       if( a[prop] < b[prop]){ return 1;  }
       return 0;
    }
  }
}



//logout function
function logout(){
  document.cookie = 'x-access-token=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/;';
  //alert("Cookie: " + document.cookie);
  window.location.href = "../";
}
