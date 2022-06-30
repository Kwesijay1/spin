#!/bin/bash
# domain=$1
# echo "Queue started"
cd /var/www/asabeee.com/public_html/asabeee/ && php artisan queue:work --daemon --timeout=600 --tries=3 --delay=30 --sleep=60
#cd /var/www/asabeee.com/public_html/asabeee/ && php artisan queue:work --daemon --timeout=600 --tries=3 --delay=30 --sleep=60 >> /dev/null 2>&1 &

# cd /home/projects/ARMS-ERP
# docker exec arms-app nohup php artisan queue:work --daemon --timeout=600 --tries=3 --delay=30 --sleep=60 >> /dev/null 2>&1 &

