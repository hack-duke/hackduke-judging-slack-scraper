# HackDuke Judging Slack Scraper

##Overview
This project retrieves pairwise choices by scraping chat logs with the hackduke-judging-bot

## Getting started
```bash
$ npm install slack-history-export -g               # install slack-history-export globally
$ chmod +x scraper.sh                               # changes permissions for scraper.sh
$ npm install                                       # Install project dependencies
$ ./scraper.sh JUDGEBOT_TOKEN                       # Download logs, use token from hackduke-secrets
$ node index.js                                     # Process slack logs to find choices
```

## Notes
All logs before 1476408117000 are discarded because they occur before the official start time.
