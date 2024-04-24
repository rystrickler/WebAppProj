function success2(data){
  if (data)
    alert("login success")
  else
    alert("login error")
}
function createClicked() {
  $.ajax({
      url: '/create',
      type: 'POST',
      data: {"user":$("#user").val(), "passw":$("#passw").val()},
      dataType: 'json',// Without this, the server's response will be a string instead of a JSON object
      success:function(data){
        if (data)
          alert("Create successful!")
        else
          alert("Create unsuccessful, a form field is missing or the username already exists.")
      }
    });
      return false;
}
function loginClicked() {
  $.ajax({
      url: '/login',
      type: 'POST',
      data: {"user":$("#user").val(), "passw":$("#passw").val()},
      dataType: 'json',// Without this, the server's response will be a string instead of a JSON object
      success:function(data){
        if(data){
          //alert("Login successful (this is where it will immediately load to next page")
          location.href = "./inventory"
        }
        else
          alert("Login unsucessful, ensure username and password are correct.")
      }
    });
      return false;
}
function clearFormClicked(){
  $("#user").val("")
  $("#passw").val("")
}
$(document).ready(function(){  
  //alert("page loaded")
  // $("#readButton").click(readClicked);
  $("#createButton").click(createClicked);
  $("#login").click(loginClicked)
//$("#putButton").click(updateClicked)  //new
  //$("#deleteButton").click(deleteClicked)
  $("#clearForm").click(clearFormClicked)
});  
