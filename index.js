"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post('/v2/webhook',(req,res)=>{
   
 var response = "currently service is unable to process your request"; 
 console.log(req.body)
 //console.log(req.body.result.action)
  
  if(!req.body || !req.body.queryResult|| !req.body.queryResult.action){  
   
   response = "Action is missing in request";
   console.log(response)
    //console.log(req.body.result.action)
    
}else{
  
  var action = req.body.queryResult.action;
  
 if(action === 'input.buyplan'){
  
      response = "Hi "+req.body.queryResult.parameters.name+", premium plan will cost S$48 , business plan will cost S$64, prime plan will cost S$72 for 2 days of trip. You need to share credit card details to complete plan purchase process. Let me know if you are interested to proceed. You can choose from proceed or cancel.";//Default response from the webhook to show it’s working
      console.log(response)
   
}else if(action === 'input.promotions'){
  
      response = "Promo code is travel20, promo offer is 20% off and valid upto 20-04-2018. If you wish to know anything more, please let me know."; 
      console.log(response)
  
}else if(action == 'input.plandetails'){
  
     response = "Insured is just myself , Business plan cost is S$20, CoverageType is single , PlanNumber is 7, TravelDestination is asia including australia and new zeeland , Premium plan cost is S$13, TripDuration is 1 day , Prime plan cost is S$22 , Insured is just myself , Business plan cost is S$255, CoverageType is annual , PlanNumber is 8, TravelDestination is asean , Premium plan cost is S$179, TripDuration is 1 year , Prime plan cost is S$281, Insured is group of 6 people , Business plan cost is S$153.9, CoverageType is single , PlanNumber is 10, TravelDestination is worldwide , Premium plan cost is S$114, TripDuration is 1 day , Prime plan cost is S$199.5,Insured is family of 2 adults and 3 children , Business plan cost is S$45.8, CoverageType is single , PlanNumber is 3, TravelDestination is asia including australia and new zeeland , Premium plan cost is S$29.77, TripDuration is 1 day , Prime plan cost is S$50.38 , Insured is couple , Business plan cost is S$32, CoverageType is single , PlanNumber is 2, TravelDestination is asean , Premium is 24, TripDuration is 1 day , Prime is 36, Insured is just myself , Business plan cost is S$382, CoverageType is annual , PlanNumber is 9, TravelDestination is worldwide , Premium plan cost is S$238, TripDuration is 1 year , Prime plan cost is S$428 ,Insured is couple , Business plan cost is S$760, CoverageType is annual , PlanNumber is 4, TravelDestination is worldwide excluding usa , Premium plan cost is S$472, TripDuration is 1 year , Prime plan cost is S$826,Insured is group of 6 people , Business plan cost is S$91.2, CoverageType is single , PlanNumber is 6, TravelDestination is asean , Premium plan cost is S$68.4, TripDuration is 1 day , Prime plan cost is S$102.6,Insured is just myself , Business plan cost is S$16, CoverageType is single , PlanNumber is 1, TravelDestination is asean , Premium plan cost is S$12, TripDuration is 1 day , Prime plan cost is S$18,Insured is couple , Business plan cost is S$54, CoverageType is single , PlanNumber is 5, TravelDestination is worldwide , Premium plan cost is S$40, TripDuration is 1 day , Prime plan cost is S$70.If you wish to know anything more, please let me know."; 
    console.log(response)
  
}else if(action === 'input.planhighlights'){

      response = "currently not available.If you wish to know anything more, please let me know."; 
       console.log(response) 
  
}else if(action === 'input.proceed'){
    
    var planType = req.body.queryResult.parameters.planType; 
    var creditCard = req.body.queryResult.parameters.creditCard;
    var cvv = req.body.queryResult.parameters.cvv;
    var mobile = req.body.queryResult.parameters.mobile;
    
    response = "Your "+planType+" plan purchase payment details are saved in our system. Please make a note, your mobile number "+mobile+" will be used for future communications. If you wish to know anything more, please let me know.";
    console.log(response)
  
  }else{
    response = "Alright. Thank you. If you wish to know anything more, please let me know.";
   console.log(response)
  }
    
  }
var speech={
         "fulfillmentText":response
        ,"fulfillmentMessages":[
            {
                "text": {
                    "text": [
                        response
                    ]
                }
            }
        ]
        ,"source":"webhook-echo-sample"
    } 

  return res.json(speech);});


restService.post("/audio", function(req, res) {
  var speech = "";
  switch (req.body.result.parameters.AudioSample.toLowerCase()) {
    //Speech Synthesis Markup Language 
    case "music one":
      speech =
        '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music two":
      speech =
        '<speak><audio clipBegin="1s" clipEnd="3s" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music three":
      speech =
        '<speak><audio repeatCount="2" soundLevel="-15db" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music four":
      speech =
        '<speak><audio speed="200%" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
    case "music five":
      speech =
        '<audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio>';
      break;
    case "delay":
      speech =
        '<speak>Let me take a break for 3 seconds. <break time="3s"/> I am back again.</speak>';
      break;
    //https://www.w3.org/TR/speech-synthesis/#S3.2.3
    case "cardinal":
      speech = '<speak><say-as interpret-as="cardinal">12345</say-as></speak>';
      break;
    case "ordinal":
      speech =
        '<speak>I stood <say-as interpret-as="ordinal">10</say-as> in the class exams.</speak>';
      break;
    case "characters":
      speech =
        '<speak>Hello is spelled as <say-as interpret-as="characters">Hello</say-as></speak>';
      break;
    case "fraction":
      speech =
        '<speak>Rather than saying 24+3/4, I should say <say-as interpret-as="fraction">24+3/4</say-as></speak>';
      break;
    case "bleep":
      speech =
        '<speak>I do not want to say <say-as interpret-as="bleep">F&%$#</say-as> word</speak>';
      break;
    case "unit":
      speech =
        '<speak>This road is <say-as interpret-as="unit">50 foot</say-as> wide</speak>';
      break;
    case "verbatim":
      speech =
        '<speak>You spell HELLO as <say-as interpret-as="verbatim">hello</say-as></speak>';
      break;
    case "date one":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="yyyymmdd" detail="1">2017-12-16</say-as></speak>';
      break;
    case "date two":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dm" detail="1">16-12</say-as></speak>';
      break;
    case "date three":
      speech =
        '<speak>Today is <say-as interpret-as="date" format="dmy" detail="1">16-12-2017</say-as></speak>';
      break;
    case "time":
      speech =
        '<speak>It is <say-as interpret-as="time" format="hms12">2:30pm</say-as> now</speak>';
      break;
    case "telephone one":
      speech =
        '<speak><say-as interpret-as="telephone" format="91">09012345678</say-as> </speak>';
      break;
    case "telephone two":
      speech =
        '<speak><say-as interpret-as="telephone" format="1">(781) 771-7777</say-as> </speak>';
      break;
    // https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3
    case "alternate":
      speech =
        '<speak>IPL stands for <sub alias="indian premier league">IPL</sub></speak>';
      break;
  }
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/video", function(req, res) {
  return res.json({
    speech:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    displayText:
      '<speak>  <audio src="https://www.youtube.com/watch?v=VX7SSnvpj-8">did not get your MP3 audio file</audio></speak>',
    source: "webhook-echo-sample"
  });
});

restService.post("/slack-test", function(req, res) {
  var slack_message = {
    text: "Details of JIRA board for Browse and Commerce",
    attachments: [
      {
        title: "JIRA Board",
        title_link: "http://www.google.com",
        color: "#36a64f",

        fields: [
          {
            title: "Epic Count",
            value: "50",
            short: "false"
          },
          {
            title: "Story Count",
            value: "40",
            short: "false"
          }
        ],

        thumb_url:
          "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
      },
      {
        title: "Story status count",
        title_link: "http://www.google.com",
        color: "#f49e42",

        fields: [
          {
            title: "Not started",
            value: "50",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          },
          {
            title: "Development",
            value: "40",
            short: "false"
          }
        ]
      }
    ]
  };
  return res.json({
    speech: "speech",
    displayText: "speech",
    source: "webhook-echo-sample",
    data: {
      slack: slack_message
    }
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
