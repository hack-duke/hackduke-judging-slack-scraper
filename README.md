# Hackduke Judging Slack Scraper

##Overview
This project retrieves pairwise choices by scraping chat logs with the hackduke-judging-bot

## Getting started
```bash
$ chmod +x scraper.sh                               # changes permissions for scraper.sh
$ npm install                                       # Install project dependencies
$ ./scraper.sh JUDGEBOT_TOKEN                       # Download logs, use token from hackduke-secrets
$ node index.js                                     # Process slack logs to find choices
```

## Notes
Logs before date 1476409309000 for david.yang and before date 1476408152000 for andy.wang should be removed because they are produced during testing