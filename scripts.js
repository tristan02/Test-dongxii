var slideIndex = 1;


function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";

  console.log(slideIndex);
}



function initialize() {

  var story_http = new XMLHttpRequest();


    story_http.onreadystatechange = function () {
      if (story_http.readyState == 4 && story_http.status == 200){

        data = JSON.parse(story_http.response);

        showStories(data);

        console.log(data.results[0].teaser[0].url);
        console.log(data.results[0].title.en);
        console.log(data.results[0].content.en);
      }
    }
  
  story_http.open("GET", "https://api.dongxii.com/parse/classes/Story");
  story_http.setRequestHeader('X-Parse-Application-Id', 'dongxii');  
  story_http.send();

}

function showStories (data) {

  for (var i = 0; i < data.results.length; i++) {

    document.getElementById("stories-container").innerHTML += 
      '<div id="'+ i +'" class="w3-display-container mySlides">' + 
  '<img src="' + data.results[i].teaser[0].url +'" style="width:100%">' +
  '<div><button type="button" onclick="showStory()" class="w3-display-bottomleft w3-large w3-container w3-padding-16 btn btn-info btn-lg btn-marg" data-toggle="modal" data-target="#myModal">' + 
    data.results[i].title.en + ' --> Read</button></div></div>';



  };

  showDivs(slideIndex);
}

function showStory(){
  document.getElementById("story-title").innerHTML = data.results[slideIndex-1].title.en;
  document.getElementById("story-desc").innerHTML = data.results[slideIndex-1].content.en;
}

var data;

initialize();

