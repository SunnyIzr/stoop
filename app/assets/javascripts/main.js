$(document).ready(function(){
  PostEvents.init();
  CommentEvents.init();
  FollowEvents.init();
  MessageEvents.init();
  
  //Dropzone
  postDropzone = Dropzone.options.newPost = {
    paramName: "post[image]", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    autoProcessQueue: false,
    init: function() {

      this.on("addedfile", function() {
        if (this.files[1]!=null){
          this.removeFile(this.files[0]);
        }
      });
          
      var submitButton = document.querySelector("#submit-image-post")
          myDropzone = this; // closure

      submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        myDropzone.processQueue(); // Tell Dropzone to process all queued files.
      });

      // You might want to show the submit button only when 
      // files are dropped here:
      this.on("addedfile", function() {
        // Show submit button here and/or inform user to click it.
      });

    },
    accept: function(file, done) {
      done();
    }
  };
})