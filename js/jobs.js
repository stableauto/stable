// Replace "leverdemo" with your own company name
url = 'https://api.lever.co/v0/postings/diatomrobotics?mode=json'

//Checking for potential Lever source or origin parameters
var pageUrl = window.location.href;
var leverParameter = '';
var trackingPrefix = '?lever-'

var urlSplit = pageUrl.split('?')[1];
var jobID = urlSplit.split('=')[1];

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
	var lists = posting.lists;
	var additional = posting.additional
    //Making each job description shorter than 250 characters
    var shortDescription = $.trim(description).substring(0, 250)
    .replace('\n', ' ') + "...";
    var location = posting.categories.location;
    var commitment = posting.categories.commitment;
    var team = posting.categories.team;
    var link = posting.hostedUrl;
	var link2 = posting.applyUrl;
	var uniqueID = $.trim(link).substring(37,link.length);
	
	if (uniqueID != jobID) {
		continue;
    }

    $('#jobs-container .jobs-list').append(
      '<div>' +
        '<h2 class="job-title" href="'+link+'"">'+title+'</h2>' +
        '<p class="tags"><span>'+location+'</span><span>'+commitment+'</span></p>' +
		'<span>'+description+'</span>' +
		'<span>'+lists[0]["text"]+'</span>' +
		'<span>'+lists[0]["content"]+'</span>' +
		'<span>'+additional+'</span>' +
		'<a class="btn" href="'+link2+'">Apply</a>' +
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
