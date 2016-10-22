var fs = require('fs')
var sortBy = require('lodash').sortBy
var filter = require('lodash').filter

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
    onFileContent(data)
  })
}

readFiles('logs/', function(data) {
  accumulateChoices(data)
}, function(err) {
  throw err;
})

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
}



