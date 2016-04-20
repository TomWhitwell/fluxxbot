var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

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
