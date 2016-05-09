var application = {};
application.contextPath = window.location.origin;

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + "; ";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    return document.cookie=="";
}

function onReady(){
	CheckUserLogin();
    $('#profileHeader').click(function(){
        window.location = application.contextPath + '/profile';
    }); 
    $('#logoHeader').click(function(){
        window.location = application.contextPath;
    });
}

function CheckUserLogin(){
  if(checkCookie()){
    $('#menu').hide();
    $('#logout').hide();
  }else{
    $('#menu').show();
    $('#logout').show();
  }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function Logout(){
    deleteAllCookies();
    location.reload(true);
}

function isEmpty(value){
    if(value==null){
        return true;
    }else if(value ==''){
        return true;
    }else if(value =='null'){
        return true;
    }else if(value == 'undefined'){
        return true;
    }else{
        return false;
    }
}