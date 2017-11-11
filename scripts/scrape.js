//scrape script

//take in request and cheerio, thus making our scrapes possible
var request = require('request');
var cheerio = require('cheerio');

//this function will scrape the NYTimes website (cb is our callback)
var scrape = function(url, cb) {

	//if our url is the times home page (and it will be)...
	if (url == 'http://www.nytimes.com') {

		//then use request to take in the body of the page's html
		request(url, function(err, res, body) {

			//load the body into cheerio's shorthand
			var $ = cheerio.load(body);

			//and make an empty object to svae our article info
			var articles = {};

			//now find each element that has the "theme-summary" class
			// (i.e., the section holding th articles)
			$('.theme-summary').each(function(i, element) {

				//the text of any enclosed child elements with the story-heading class
				//will be saved to the head variable

				var head = $(this).children('.story-heading').text();
				//the text of any enclosed child elements with the summary class
				//will be saved to the sum variable
				
				var sum = $(this).children('.summary').text();

				//so long as our headline and sum aren't empty strings, do the following
				if (head !== "" && sum !== "") {

					//this section uses regular expressions and the trim function
					//to tidy our headlines and summaries
					//we're basically removing extra lines, extra spacing, extra tabs,
					//and other assorted scourges to typographical cleanliness.
					var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
					var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

					//initialize an array and put headNeat into it
					//and we will push more data into articles[i] below
					articles[i] = [headNeat];
					articles[i].push(sumNeat);
				}
			});

			//with every article scraped into the articles object (good for testing)
			console.log(articles);

			//now pass articles into our callback function
			cb(articles);
		});
	}
};

//export the funciton, so other files in our backend can use it
module.exports = scrape;