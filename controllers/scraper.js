var mongoose = require('mongoose'),
	express = require('express'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio'),
    Scraper = mongoose.model('Scraper');
	

exports.add = function(req, res){
  var _id 	 = req.body._id;
  var maxbid = req.body.maxbid;
  
  url_auction = 'http://www.coisas.com/auction_details.php?auction_id=' + _id;
	
	request(url_auction, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
			
			var auction_title = $("div.auctions_list_item_view_content_container").find($('.auction_title')).text().trim();
			var auction_cur_bid = $("div.auctions_list_item_view_content_container").find($('.pt5')).text().trim();
			var auction_remaining_time = $("div#ad-overview-details tr").children().eq(1).text().trim();
			var auction_remaining_time_days = auction_remaining_time.split(" dias")[0] * 24 * 60;
			var auction_remaining_time_hours = auction_remaining_time.split(", ")[1].split("h")[0] * 60;
			var auction_remaining_time_minutes = auction_remaining_time.split("h ")[1].split("m")[0];
			var auction_end_date = new Date(Date.now());
			auction_end_date.setMinutes(auction_end_date.getMinutes() + 10);
			var auction_seller = $("div.seller-column div div div b a").text();

			console.log("--> " + auction_title + " -- " + auction_cur_bid + " -- " + auction_remaining_time + " -- " + auction_seller);
			
            res.json({ success: true , message: auction_end_date});
        }
    });

  
  

};

