#!/bin/bash
# domain=$1
# echo "Scheduler started"
# cd /var/www/$1/public_html/ARMS-ERP/ && php artisan schedule:work

# docker exec arms-app nohup php artisan schedule:work &
cd /home/projects/ARMS-ERP
docker exec arms-app nohup php artisan schedule:work >> /dev/null 2>&1 &
