// Replace "leverdemo" with your own company name
url = 'https://api.lever.co/v0/postings/diatomrobotics?mode=json'

//Checking for potential Lever source or origin parameters
var pageUrl = window.location.href;
var leverParameter = '';
var trackingPrefix = '?lever-'

if( pageUrl.indexOf(trackingPrefix) >= 0){
  // Found Lever parameter
  var pageUrlSplit = pageUrl.split(trackingPrefix);
  leverParameter = '?lever-'+pageUrlSplit[1];
}

function createJobs(_data) {
  for(i = 0; i < _data.length; i++) {
    var posting = _data[i] ;
    var title = posting.text;
    var description = posting.description;
    //Making each job description shorter than 250 characters
    var shortDescription = $.trim(description).substring(0, 250)
    .replace('\n', ' ') + "...";
    var location = posting.categories.location;
    var commitment = posting.categories.commitment;
    var team = posting.categories.team;
    var link = posting.hostedUrl+leverParameter;

    $('#jobs-container .jobs-list').append(
      '<div data-link="'+link+'" class="job '+team+' '+location+' '+commitment+'">' +
        '<h2 class="job-title" href="'+link+'"">'+title+'</h2>' +
        '<p class="tags"><span>'+location+'</span><span>'+commitment+'</span></p>' +
		'<a class="btn" href="'+link+'">Apply</a>' +
      '</div>'  
    );
  }
}

//Fetching job postings from Lever's postings API
$.ajax({
  dataType: "json",
  url: url,
  success: function(data){
    createJobs(data);
  }
});

//Making each job description a link
$("#jobs-container").on("click", ".job", function() {
    var link = $(this).data("link");
    window.location.href = link;
});