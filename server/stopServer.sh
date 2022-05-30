cd /home/aita/public_html/instant/server
pidFile=`ls *.pid`
pid=${pidFile%.*}
echo $pid stop server
kill $pid
rm -rf $pidFile
