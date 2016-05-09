var index = {};
index.url = '/';
$(function() {
  $('.parallax').parallax();
  CheckUserLoginIndex();
  $("#submit").click(function(){
    LoginFunction();
  });
});
function LoginFunction(){
  login = new Object();
  login.user = $('#username').val();
  login.pass = $('#password').val();
  $.ajax({
        type: "POST",
        url: index.url,
        content: "application/json; charset=utf-8",
        dataType: "json",
        data: login,
        success: function(d) {
            if (d.success == true){
                setCookie("memCode", d.rows[0].memCode);
                setCookie("user", d.rows[0].memUser);
                setCookie("firstName", d.rows[0].firstName);
                setCookie("lastName", d.rows[0].lastName);
                location.reload(true);
            }else{
               Materialize.toast(d.message, 4000);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            // TODO: Show error
            console.log('error');
        }
      });
};
function CheckUserLoginIndex(){
  if(!checkCookie()){
    $('#section').hide();
    $('.parallax-container').hide();
    $('#menu').show();
    $('#logout').show();
  }else{
    $('#section').show();
    $('.parallax-container').show();
  }
}