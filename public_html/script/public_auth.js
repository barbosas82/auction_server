function validateLogin(){
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        $.ajax({
          type: 'POST',
          url: 'http://bid2.doismeios.pt:8080/authenticate',
          contentType: "application/json; charset=utf-8",
          data: "{\"username\": \"" + username + "\", \"password\": \"" +  password  +  "\"}",
          dataType: "json",
          success: function (data, status, jqXHR) {
            if (data.success){
              document.cookie = "x-access-token=" + data.token + "; path=/;"; //set token cookie
              window.location.href = "/private/"; //redirect to authenticated page
            }else{
              alert("Error: " + data.message);
            }
          },
           error: function (jqXHR, status) {
               // error handler
               alert(JSON.stringify(jqXHR));
           }
          });
        }
