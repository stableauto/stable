// Replace "leverdemo" with your own company name
url = 'https://api.lever.co/v0/postings/diatomrobotics?mode=json'
apiKey = 'AsABwDmtoMECw_mOsfF_';

//Checking for potential Lever source or origin parameters
var pageUrl = window.location.href;
var leverParameter = '';
var trackingPrefix = '?lever-'

var urlSplit = pageUrl.split('?')[1];
var jobID = urlSplit.split('=')[1];

//Fetching job postings from Lever's postings API
$.ajax({
  type="POST",
  url: url,
  success: function(data){
    createJobs(data);
  }
});
