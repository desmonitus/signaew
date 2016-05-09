var profile = {};
profile.url = '/profile';
$(function() {
	getUserProfile();
});

function getUserProfile(){
	if(!isEmpty(getCookie('memCode'))){
		$('#firstName').val(getCookie('firstName'));
		$('#lastName').val(getCookie('lastName'));
	}
}

