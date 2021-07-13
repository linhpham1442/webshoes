function FuncDelete(){
    var del=confirm("Are you sure you want to delete this document?");
    if (del==true){
       alert ("Document Deleted")
    }else{
        alert("Document Not Deleted")
    }
    return del;
}
function exit_message(){
    $( ".message" ).hide( "slow", function() {
            
      });
}
function showDate(data){
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      };
    return new Intl.DateTimeFormat("Asia",options).format(data);
}