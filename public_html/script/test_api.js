document.getElementById("placeholder").innerHTML="data.username";
  $.ajax({
    type: 'GET',
    url: 'http://bid2.doismeios.pt:8080/api/listusers',
    data: {},
    async: false,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InNhbHQiOiJtb2RpZnkiLCJoYXNoZWRQYXNzd29yZCI6Im1vZGlmeSIsInJvbGUiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJyb2xlIjp0cnVlLCJlbWFpbCI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnsic2FsdCI6dHJ1ZSwiaGFzaGVkUGFzc3dvcmQiOnRydWV9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InBlZHJvYmFyYm9zYUBwYi5jb20ucHQiLCJzYWx0IjoiZjM3NjhhNmZjOTJiMDg1MmEyMzBjNTNiN2MzNWIxMTExYWM5Njc0OGE4ODYwNzU0NWQzZGQ3ODJiNTdmM2MzMSIsImhhc2hlZFBhc3N3b3JkIjoiZTg2NzVkY2RjMWQ3Mjk2NmY2NGExYzQwNmQ0N2I1MWEyOGMwM2NkZCIsInVzZXJuYW1lIjoicGIiLCJjcmVhdGVkQXQiOiIyMDE3LTAyLTAxVDE3OjQ4OjE2LjIwNloiLCJ1cGRhdGVkQXQiOiIyMDE3LTAyLTAxVDE3OjQ4OjE2LjIwNloiLCJfaWQiOjB9LCJpYXQiOjE0ODYwMzcwMTYsImV4cCI6MTQ4NjQ2OTAxNn0.Gp11e_IyldfgOzxEPPMYT91qcewc-MADpWwVFhsVO6Y');
      if (xhr && xhr.overrideMimeType) {
        xhr.overrideMimeType('application/json;charset=utf-8');
      }
    },
    dataType: 'json',
    success: function (data) {
    //Do stuff with the JSON data
      document.getElementById("placeholder").innerHTML="data.username";
    }
    });
