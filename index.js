var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
var contentstring = "has not run properly" 

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            checkText = text.toUpperCase()
            if (checkText.indexOf('ANIMAL') > -1) {
                sendAnimalMessage(sender)
                continue
            }
            if (checkText.indexOf('PERSON') > -1) {
                sendPersonMessage(sender)
                continue
            }

  if (checkText.indexOf('INNOVATION') > -1) {
                sendInnovationMessage(sender)
                continue
            }
              if (checkText.indexOf('WHO') > -1) {
                sendWhoMessage(sender)
                continue
            }
                          if (checkText.indexOf('IDEA') > -1) {
                randomWord()
                sendTextMessage(sender,contentstring)
                continue
            }
            
                                    if (checkText === 'ME') {

                sendTextMessage(sender,"who are you?")
                continue
            }
            
            
            
                        if (checkText === 'HI') {
                sendTextMessage(sender,"Yes I am alive")
                continue
            }
                        if (checkText === 'HELP') {
                sendHelpMessage(sender)
                continue
            }

            
            sendTextMessage(sender, text.substring(0, 200) + " is a silly thing to say.")
        }
        if (event.postback) {
            text = JSON.stringify(event.postback)
checkText = text.toUpperCase()
            if (checkText.indexOf('ANIMAL') > -1) {
                sendAnimalMessage(sender)
                continue
            }
            if (checkText.indexOf('PERSON') > -1) {
                sendPersonMessage(sender)
                continue
            }
            if (checkText==='HI') {
                sendTextMessage(sender,"Yes I am alive")
                continue
            }
            
              if (checkText.indexOf('WHO') > -1) {
                sendWhoMessage(sender)
                continue
            }
  if (checkText.indexOf('INNOVATION') > -1) {
                sendInnovationMessage(sender)
                continue
            }

            continue
        }
    }
    res.sendStatus(200)
})

var token = "CAADHStbK6vgBAHwlgbrWanZBFPrA8fpRyMQrja3ydo8jZCAuhzeSNFLQDFbPOqaqnXuxsAvDBzDxIUeAZAo65H6h6tR0WXxWiIB0vPgkRWRXxZC1X4yDbkQ8qfAcSqJaUlYIKqS9Y2ECbAco8IZAZAVVxlYdl3nBgO0NctEQDCiEjC9adroONkuccZCStmn8MAZD"

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
function sendInnovationMessage(sender){
sendTextMessage(sender, "I don\'t really like to talk about innovation.")

}

function sendAnimalMessage(sender) {
    messageData = {
        "attachment": {
            "type": "image",
            "payload": {"url": "http://lorempixel.com/400/200/animals/",}    
                    },
            }
        
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
function sendPersonMessage(sender) {
    messageData = {
        "attachment": {
            "type": "image",
            "payload": {"url": "http://lorempixel.com/400/200/people/",}    
                    },
            }
        
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendHelpMessage(sender){
    messageData = {
        "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"I can help you with these things only?",
        "buttons":[
          {
            "type":"postback",
            "title":"Pic of an animal",
            "payload":"ANIMALS"
          },
          {
            "type":"postback",
            "title":"Pic of a person",
            "payload":"PERSON"
          },
          {
            "type":"postback",
            "title":"Innovation bants",
            "payload":"INNOVATION"
          }
        ]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })


}
function sendWhoMessage(sender){

    messageData = {
        "attachment": {
            "type": "image",
            "payload": {"url": "http://fluxx.uk.com/cms/wp-content/uploads/2016/03/Image-5-614x345.jpg",}    
                    },
            }
        
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
                sendTextMessage(sender,"We are Fluxx.")


}



var subjects=[
'Nepalese',
'crazy',
'radical',
'weird',
'slightly dodgy',
'hot new',
'CIA-backed',
'amazing',
'stealth mode',
'awesome',
'bonkers',
'secret',
'Belgian',
'gnarly',
'superhot',
'mysterious'
];

var verbs=[
];

var objects=[
'some guys from Iceland set up',
'has 82% of the Chinese market',
'is blowing up in India',
'they saw on Weibo',
'they saw on VK',
'they saw on WeChat',
'got banned from Shoreditch',
'was in the Daily Mail',
'their grandma invested in',
'is massive in Papua New Guinea',
'is still in Beta',
'the high street banks are worried about',
'was founded by ex-Bitcoin guys',
'is big in Iceland',
'is coming to Oculus Rift',
'has branches all over Mexico',
'they heard about at the school gate',
'some 9 year-olds told them about',
'some Latvian hackers built',
'has a flagship store in Baku'
];

var endings=[
'. Elon Musk is all over it.',
'. Millenials are all over it.',
'. Everyone who works there has a huge beard.',
'. Brent Hoberman turned them down.',
'. They have an office DJ.',
'. They all ride tiny bikes around the office.',
'. The CEO has a moustache.',
'. The whole thing is run from a caravan in Mongolia.',
'. The founder lives in a yurt.',
'. They\'re advertising in Coronation St.',
'. Bono drew their logo.',
'. The Dalai Lama is on the board.',
'. Leonardo DiCaprio put in $25m.',
'. They turned down Ashton Kutcher',
'. Jared Leto directed their Superbowl ad.',
'. Justin Bieber was at the launch party.',
'. Ellen DeGeneres is their PR consultant.',
'. The CEO\'s life coach is MC Hammer.',
'. They 3D printed their entire office.',
'. They have a horse in the office.', 
'. The staff get 9 months vacation a year.',
'. They sponsored Deptford Fashion Week.',
'. Woah.',
'. Every customer gets free ukulele lessons.',
'. The office has real grass on the floor.'
];

var xWords=[
'Instagram',
'Facebook',
'Tinder',
'Twitter',
'Candy Crush',
'Vine',
'Snapchat',
'LinkedIn',
'Netflix',
'Spotify',
'Uber',
'AirBnB',
'Pinterest',
'Dropbox',
'Square',
'Stripe',
'Zenefits',
'New Coke',
'Slack',
'PayPal',
'Apple Pay',
'Squarespace',
'TenPay',
'M-Pesa',
'virtual reality',
'Google Wallet',
'QR codes',
'Hedgeable',
'Crowdcube',
'WeChat',
'Beats',
'Coinbase',
'Alipay'

];

var yWords=[
'overdrafts',
'buying a house',
'payday loans',
'share dealing',
'people with bad credit',
'paying your gas bill',
'checking your bank balance',
'doing your tax return',
'getting a new credit card',
'paying the milkman',
'getting your credit card nicked',
'buying a sofa',
'paying the nanny',
'splitting a bar tab',
'buying lunch',
'doing your VAT',
'high net worth individuals',
'buying a private island',
'paying your kid\'s pocket money',
'tax havens',
'investing in Russia',
'investing in fine wine',
'art collectors',
'people who ride expensive bikes',
'student loans',
'angel investors',
'sovereign wealth funds',
'quantitative easing',
'ATM machines',
'credit cards',
'founders',
'drug dealers',
'gangsters',
'members of the House of Lords'
];

function randomWord(){

pickSubject = Math.round(Math.random()*(subjects.length-1));
pickVerb = Math.round(Math.random()*(verbs.length-1));
pickObject = Math.round(Math.random()*(objects.length-1));
pickEnding = Math.round(Math.random()*(endings.length-1));
pickX = Math.round(Math.random()*(xWords.length-1));
pickY = Math.round(Math.random()*(yWords.length-1));

contentstring = 
'I heard about this ' 
+ 
subjects[pickSubject]
+ 
' startup that '
+
objects[pickObject]
+
'.  It\'s like '
+
xWords[pickX]
+
' for '
+
yWords[pickY]
+
endings[pickEnding]
; 
}
