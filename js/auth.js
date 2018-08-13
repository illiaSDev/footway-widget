function getData(){
	return gapi.auth2.init({
	  'clientId': '168802504845-0e6rlg4bn1p406a0ea16om7387icujjc.apps.googleusercontent.com',
	  'scope': 'https://www.googleapis.com/auth/analytics.readonly',
	}).then(function(a) {
	  return gapi.client.request({
	    path: 'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:85863148&metrics=rt:activeUsers&dimensions=rt:latitude,rt:longitude',
	    headers: {
	    	"cache-control": "max-age=1"
	    }
		})
	}).then(function(response) {
	  var testData = response.result.rows.reduce(function(a, it){
	    return a.concat([+it[0], +it[1], it[2] / 20, 210]);
	  }, []);

	  globe.reset();
	  globe.addData(testData, { format: 'legend', name: "New data"});
	  globe.createPoints();

	  setTimeout(getData, 5000);

	}).catch(function(reason) {
	  console.error(reason);
	});
}

function start() {
	getData();
  // // 2. Initialize the JavaScript client library.
  // gapi.auth2.init({
  // // apiKey: "AIzaSyBvkwZe0XlwhFIsbE4gBknogTShrYn_Xis",
  // // discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest"],
  // // // Your API key will be automatically added to the Discovery Document URLs.
  // // clientId and scope are optional if auth is not required.
  // 'clientId': '168802504845-0e6rlg4bn1p406a0ea16om7387icujjc.apps.googleusercontent.com',
  // 'scope': 'https://www.googleapis.com/auth/analytics.readonly',
  // }).then(function(a) {
  // // 3. Initialize and make the API request.
  // // return gapi.client.load('analytics', 'v3').then(function() {
  // //   return gapi.client.analytics.data.realtime.get(
  // //   'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:85863148&metrics=rt:activeUsers&dimensions=rt:latitude,rt:longitude&key=AIzaSyACJk22ggBH6KXZ7ofmFfb4SmCJ6lCJZaY'
  // //   );
  // // });

  // // gapi.client.analytics.data.realtime.get(
  // //   'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:85863148&metrics=rt:activeUsers&dimensions=rt:latitude,rt:longitude&access_token').then(a => console.log(a)).catch(err => console.error(err))
  // /*1*/
  // return gapi.client.request({
  //   'path': 'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:85863148&metrics=rt:activeUsers&dimensions=rt:latitude,rt:longitude'
  //   // 'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names'
  // });
  
  // // return gapi.client.request({
  // //   path: '/v4/reports:batchGet',
  // //   root: 'https://analyticsreporting.googleapis.com/',
  // //   method: 'POST',
  // //   body: {
  // //   reportRequests: [
  // //     {
  // //     viewId: "ga:85863148",
  // //     dateRanges: [
  // //       {
  // //       startDate: 'today',
  // //       endDate: 'today'
  // //       }
  // //     ],
  // //     metrics: [
  // //       {
  // //       expression: 'ga:sessions'
  // //       }
  // //     ]
  // //     }
  // //   ]
  // //   }
  // // })
  // }).then(function(response) {
  // console.log(response);
  // var testData = response.result.rows.reduce(function(a, it){
  //   return a.concat([+it[0], +it[1], it[2] / 20, 210]);
  // }, [])
  // globe.reset();
  // globe.addData(testData, { format: 'legend', name: "New data"});
  // globe.createPoints();
  // }, function(reason) {
  // console.error(reason);
  // });
};
// 1. Load the JavaScript client library.
gapi.load('client:auth2:analytics', start);
