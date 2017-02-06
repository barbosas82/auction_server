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

function check(cb, id)
{
if($(cb).is(":checked"))
{
  //alert("IS Checked " + id);
$.ajax({
        type: 'POST',
        url: '/index.php',
        data: {'checked': 'true', 'id': id},
        dataType: 'text',
        success: function(data){
          window.location.reload();
      },
      error: function(jqXHR, textStatus, errorThrown){
        $('#erro').show().center();
      }
     });

}else
{
//alert("IS Not Checked");
 $.ajax({
        type: 'POST',
        url: '/index.php',
        data: {'checked': 'false', 'id': id},
        dataType: 'text',
        success: function(data){
          window.location.reload();
      },
      error: function(jqXHR, textStatus, errorThrown){
        $('#erro').show().center();
      }
     });
}

}


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

    if (confirm("Are you sure you want to delete?")) {
        $.ajax({
            type: 'POST',
            url: api_addr,
            success: function(data){
                $('#sucesso').show().center();
                setTimeout(function(){ window.location.reload();}, 3000);
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
          //btn.onclick = removeAuctions(_id);
          btn.appendChild(t);
          td_remove.appendChild(bdn);



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
