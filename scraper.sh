#!/bin/bash
ARRAY=( 'cody.li' 'patricia.torvalds' 'brian.lin' 'yoon_ko' 'david.yang' 'stephanie.ding' 'andy.wang' 'harvey.shi' 'austin.wu' 'austin.hua' 'nayib.gloria' 'aaron.chang' 'carter.zenke' 'faith.rodriguez' 'steven.yang' 'david_bi' 'kelsey.evezich' 'michelle.chen' 'anna.miyajima' 'yixin.lin' 'molly.chen' 'vivian.wang' 'edward.liang' 'thomas.li' 'natalieqle' 'tracy.lu' 'melissa.zhang' 'dorothyfeng' 'amy.yang')
ELEMENTS=${#ARRAY[@]}
for (( i=0;i<$ELEMENTS;i++)); do
    echo "Scraping judge history for ${ARRAY[${i}]}"
    echo `slack-history-export -t $1 -u ${ARRAY[${i}]} -d logs -F json`
done 
