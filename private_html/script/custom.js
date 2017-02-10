//logout function
function logout() {
  document.cookie = 'x-access-token=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/;';
  //alert("Cookie: " + document.cookie);
  window.location.href = "../";
}

//Sort JSON
function sortBy(list, prop, asc) {
  list = list.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}

//Populate Auction Tables
function populateAuctionTable() {
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

//Populate Wantlist Table
function populateWantlistTable(field, asc){
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
      //alert(JSON.stringify(data));
      var numArtists = data.length-1;

      //Create Ongoing Auction Table Headers
      var tr = document.createElement('tr');
      var headertitles     = ["ID" , "Nome", ""];
      var headertitlesJson = ["_id" , "name", ""];

      for (var i = 0; i<headertitles.length; i++){
        var th = document.createElement('th');
        if (i<headertitles.length-1){
          var label = headertitles[i];
          var labelJson = headertitlesJson[i];
          var paramsTrue = "\""+labelJson+"\",true";
          var paramsFalse = "\""+labelJson+"\",false";
          th.innerHTML = "<div class=\"alignTextCenter\" style=\"display: inline-block;\">" + label + "</div><div class=\"floatright\"><a onclick=\'populateWantlistTable(" + paramsTrue + ")\'><img src=\"images/up.png\" alt=\"up\" height=\"12\" width=\"12\"></a><a onclick=\'populateWantlistTable(" + paramsFalse + "); \'><img src=\"images/down.png\" alt=\"up\" height=\"12\" width=\"12\"></a></div>"
        }
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

        sortBy(artistList, field, asc);

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
          btn.onclick = function() {deleteArtist(this.id)};
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

//Add artist
function addArtist(artist){
  $.ajax({
    type: 'POST',
    url: 'http://bid2.doismeios.pt:8080/api/wantlist',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: "{\"name\":\"" + artist + "\"}",
    success: function (data, status, jqXHR) {
      //Do stuff with the JSON data
      alert(data.message);
      populateWantlistTable("_id", false);
    },
     error: function (jqXHR, status) {
         // error handler
         alert("Erro: " + JSON.stringify(jqXHR));
     }
    });
}

//Remove artist
function deleteArtist(artist){
  $.ajax({
    type: 'DELETE',
    url: 'http://bid2.doismeios.pt:8080/api/wantlist/' + artist,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data, status, jqXHR) {
      //Do stuff with the JSON data
      alert(data.message);
      populateWantlistTable("_id", true);
    },
     error: function (jqXHR, status) {
         // error handler
         alert("Erro: " + JSON.stringify(jqXHR));
     }
    });
}
