function addSourceToVideo(element, src, type) {
  var source = document.createElement('source');

  source.src = src;
  source.type = type;

  element.appendChild(source);
}


window.onload = () => {
  $("#sendbutton").click(() => {
    imagebox = $("#imagebox");
    link = $("#link");
    input = $("#imageinput")[0];
    if (input.files && input.files[0]) {
      let formData = new FormData();
      formData.append("video", input.files[0]);
      $.ajax({
        url: "/detect", // fix this to your liking
        type: "POST",
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        error: function (data) {
          console.log("upload error", data);
          console.log(data.getAllResponseHeaders());
        },
        success: function (filepath_on_server) {
          console.log(filepath_on_server);
          // bytestring = data["status"];
          // image = bytestring.split("'")[1];
          $("#link").css("visibility", "visible");
          $("#download").attr("href", filepath_on_server);

          var videoElement = document.createElement('video');
          videoElement.controls = true
          headerElement = document.getElementById('header');
          headerElement.appendChild(videoElement);
          addSourceToVideo(videoElement, filepath_on_server, 'video/mp4');

          console.log(filepath_on_server);
        },
      });
    }
  });
};

function readUrl(input) {
  imagebox = $("#imagebox");
  console.log(imagebox);
  console.log("evoked readUrl");
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target);

      imagebox.attr("src", e.target.result);
      //   imagebox.height(500);
      //   imagebox.width(800);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
