var request = require('request');
var fs = require('fs')
var sortBy = require('lodash').sortBy
var filter = require('lodash').filter
var sleep = require('sleep');

readFiles('logs/')

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err)
      return
    }
    var data = {}
    for(var i = 0; i < filenames.length; i++) {
      data[filenames[i]] = JSON.parse(fs.readFileSync('logs/' + filenames[i], 'utf8'))
    }
    accumulateChoices(data)
  })

}

function accumulateChoices(data) {
  var choices = []

  var keys = Object.keys(data)
  for(var k = 0; k < keys.length; k++) {

    var obj = data[keys[k]]

    var filtered = filter(obj, function(o) { 
      // official judging start time
      return o['date'] > 1476408117000
    })

    var sorted = sortBy(filtered, 'ts').reverse()

    for(var i = 0; i < sorted.length - 3; i++) {
      if(sorted[i]['text'] === 'Successfully performed judge decision, please choose again!') {
        object = {}

        var selection = sorted[i+1]['text']

        object['choice'] = selection

        var j = i

        var firstAppIndex = -1
        var secondAppIndex = -1

        while(j < sorted.length) {
          if(sorted[j]['attachments'] && sorted[j]['attachments'][0]['author_name'] == 'Second Applicant') {
            secondAppIndex = j
            firstAppIndex = j+1
            break
          }
          j++
        }

        var firstQuestions = sorted[firstAppIndex]['attachments'][0]['fields']
        for(var j = 0; j < firstQuestions.length; j++) {
          if(firstQuestions[j]['title'] == 'Resume Link') {
            var resume = firstQuestions[j]['value']
            object['firstResume'] = resume.substring(1, resume.length-1)
          }
        }

        var secondQuestions = sorted[secondAppIndex]['attachments'][0]['fields']
        for(var j = 0; j < secondQuestions.length; j++) {
          if(secondQuestions[j]['title'] == 'Resume Link') {
            var resume = secondQuestions[j]['value']
            object['secondResume'] = resume.substring(1, resume.length-1)
          }
        }

        choices.push(object)

      }
    }
  }

  console.log(choices)
  console.log(choices.length)

  var counter = 0 
  var judge = setInterval(function(){ 
    if(counter >= 1) {
      clearInterval(judge)
    } else {
      if(choices[counter]['choice'] == '1') {
          winner = choices[counter]['firstResume']
          loser = choices[counter]['secondResume']
      }  else {
          winner = choices[counter]['secondResume']
          loser = choices[counter]['firstResume']
      }
      request({
          url: 'http://' + process.env.USER + ':' + process.env.PASSWORD + '@hackduke-judging.herokuapp.com/perform_overwrite_decision',
          method: 'POST',
        json: {winner_id: winner, loser_id: loser, session_name: 'code_for_good2016applicant', judge_id: '1'}
      }, function(error, response, body){
        console.log(body);
      });
    }
    counter++
  }, 500);

}



