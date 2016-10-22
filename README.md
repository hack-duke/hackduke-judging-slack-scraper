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