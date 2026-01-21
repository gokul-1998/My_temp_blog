root@debian-s-1vcpu-2gb-blr1-01:~# history
    1  apt update && apt upgrade -y
    2  apt install -y wget curl git unzip sox mariadb-server mariadb-client apache2 php php-cli php-mysql php-pear php-curl php-gd php-mbstring php-intl php-bcmath php-xml php-json php-zip php-readline nodejs npm build-essential linux-headers-$(uname -r) fail2ban ufw
    3  mysql_secure_installation
    4  mysql -u root -p
    5  CREATE DATABASE asterisk;
    6  GRANT ALL PRIVILEGES ON asterisk.* TO 'asteriskuser'@'localhost' IDENTIFIED BY 'yourpassword';
    7  FLUSH PRIVILEGES;
    8  EXIT;
    9  cd /usr/src
   10  wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-20-current.tar.gz
   11  tar xvf asterisk-20-current.tar.gz
   12  cd asterisk-20.*/
   13  contrib/scripts/install_prereq install
   14  ./configure
   15  make menuselect
   16  make -j$(nproc)
   17  make install
   18  make samples
   19  make config
   20  ldconfig
   21  systemctl enable asterisk
   22  systemctl start asterisk
   23  asterisk -rvvv
   24  useradd -m asterisk
   25  chown -R asterisk:asterisk /var/run/asterisk
   26  chown -R asterisk:asterisk /etc/asterisk
   27  chown -R asterisk:asterisk /var/{lib,log,spool}/asterisk
   28  chown -R asterisk:asterisk /usr/lib/asterisk
   29  sed -i 's/#AST_USER=.*/AST_USER=asterisk/' /etc/default/asterisk
   30  sed -i 's/#AST_GROUP=.*/AST_GROUP=asterisk/' /etc/default/asterisk
   31  systemctl restart asterisk
   32  cd /usr/src
   33  wget https://mirror.freepbx.org/modules/packages/freepbx/freepbx-17.0-latest.tgz
   34  tar xfz freepbx-17.0-latest.tgz
   35  cd freepbx
   36  chown -R asterisk:asterisk /var/www/html
   37  ./start_asterisk start
   38  ./install -n
   39  systemctl restart apache2
   40  ip addrt
   41  ip addr
   42  ufw allow OpenSSH
   43  ufw allow 80/tcp
   44  ufw allow 443/tcp
   45  ufw allow 5060/udp
   46  ufw allow 10000:20000/udp
   47  ufw enable
   48  systemctl status apache2
   49  systemctl enable apache2
   50  systemctl start apache2
   51  ufw status
   52  ufw allow 80/tcp
   53  ufw allow 443/tcp
   54  ufw reload
   55  ls -l /var/www/html/
   56  echo "<?php phpinfo(); ?>" > /var/www/html/info.php
   57  apache2ctl -M | grep php
   58  apt install libapache2-mod-php -y
   59  a2enmod php*
   60  systemctl restart apache2
   61  a2enmod rewrite
   62    systemctl restart apache2
   63  nano /etc/apache2/sites-available/000-default.conf
   64  systemctl restart apache2
   65  tail -n 20 /var/log/apache2/error.log
   66  chown -R asterisk:asterisk /var/www/html
   67  find /var/www/html -type d -exec chmod 755 {} \;
   68  find /var/www/html -type f -exec chmod 644 {} \;
   69  systemctl restart apache2
   70  systemctl status httpd
   71  systemctl start httpd
   72  nano /etc/asterisk/http.conf
   73  nano /etc/asterisk/http_custom.conf 
   74  /etc/asterisk/manager.conf
   75  nano /etc/asterisk/manager.conf
   76  firewall-cmd --add-port=8088/tcp --permanent
   77  firewall-cmd --add-port=5038/tcp --permanent
   78  firewall-cmd --reload
   79  asterisk -rx "core show version"
   80  systemctl status apache2
   81  apt update
   82  apt install apache2
   83  # Check if ufw is active
   84  ufw status
   85  # If active, allow the ports
   86  ufw allow 80/tcp
   87  ufw allow 443/tcp
   88  ufw allow 8088/tcp
   89  ufw allow 5038/tcp
   90  systemctl status apache2
   91  systemctl status asterisk
   92  netstat -tlnp | grep -E ':(80|443|8088|5038)'
   93  # Install net-tools to get netstat
   94  apt install net-tools
   95  # Check what's listening on ports
   96  ss -tlnp | grep -E ':(80|443|8088|5038)'
   97  # Check FreePBX web directory
   98  ls -la /var/www/html/
   99  # Check Apache configuration for FreePBX
  100  ls -la /etc/apache2/sites-enabled/
  101  # Install net-tools to get netstat
  102  apt install net-tools
  103  # Check what's listening on ports
  104  ss -tlnp | grep -E ':(80|443|8088|5038)'
  105  # Check FreePBX web directory
  106  ls -la /var/www/html/
  107  # Check Apache configuration for FreePBX
  108  ls -la /etc/apache2/sites-enabled/
  109  tail -50 /var/log/apache2/error.log
  110  cd /usr/src/freepbx
  111  ./install -n
  112  cd /usr/src/freepbx
  113  ./install -n
  114  # Check if the file exists and its permissions
  115  ls -la /etc/freepbx.conf
  116  # Fix permissions
  117  chmod 644 /etc/freepbx.conf
  118  chown asterisk:asterisk /etc/freepbx.conf
  119  # Fix PHP session directory permissions
  120  chown -R www-data:www-data /var/lib/php/sessions
  121  chmod 1733 /var/lib/php/sessions
  122  # Make sure www-data can read FreePBX files
  123  chown -R asterisk:asterisk /var/www/html
  124  chmod -R 755 /var/www/html
  125  # Add www-data to asterisk group
  126  usermod -a -G asterisk www-data
  127  systemctl restart apache2
  128  # Create the cache directory if it doesn't exist
  129  mkdir -p /var/www/html/admin/assets/less/cache/
  130  # Set proper ownership and permissions
  131  chown -R asterisk:asterisk /var/www/html/admin/assets/
  132  chmod -R 775 /var/www/html/admin/assets/
  133  # Make sure www-data (Apache user) can write to it
  134  chown -R asterisk:www-data /var/www/html/admin/assets/less/cache/
  135  chmod -R 775 /var/www/html/admin/assets/less/cache/
  136  # Set ownership for all web files
  137  chown -R asterisk:asterisk /var/www/html/
  138  # Set proper permissions
  139  find /var/www/html/ -type d -exec chmod 755 {} \;
  140  find /var/www/html/ -type f -exec chmod 644 {} \;
  141  # Make cache and writable directories group-writable
  142  chmod -R 775 /var/www/html/admin/assets/less/cache/
  143  chown -R asterisk:www-data /var/www/html/admin/assets/
  144  # Ensure Apache user is in asterisk group (if not done already)
  145  usermod -a -G asterisk www-data
  146  # Add to /etc/sudoers.d/freepbx
  147  www-data ALL=(asterisk) NOPASSWD: /usr/bin/crontab
  148  nano /etc/sudoers.d/freepbx
  149  sudo -u www-data sudo -u asterisk /usr/bin/crontab -l
  150  sudo nano /tmp/fix_freepbx_cron.sh
  151  sudo chmod +x /tmp/fix_freepbx_cron.sh
  152  sudo /tmp/fix_freepbx_cron.sh
  153  sudo fwconsole chown
  154  sudo chown -R asterisk:asterisk /var/www/html/admin/modules/dashboard/assets/less/cache
  155  sudo chmod -R 775 /var/www/html/admin/modules/dashboard/assets/less/cache
  156  sudo chown -R asterisk:asterisk /var/www/html
  157  sudo chmod -R 775 /var/www/html
  158  groups www-data
  159  sudo usermod -a -G asterisk www-data
  160  sudo systemctl restart apache2  # or nginx
  161  sudo fwconsole chown
  162  sudo fwconsole restart
  163  sudo systemctl restart apache2  # or nginx if using that
  164  sudo chown -R asterisk:asterisk /var/www/html
  165  sudo fwconsole chown
  166  sudo chmod -R 775 /var/lib/php/sessions
  167  sudo chown -R asterisk:asterisk /var/lib/php/sessions
  168  # Make sure session directory is writable
  169  sudo chmod 1733 /tmp
  170  SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1
  171  php -i | grep session.save_path
  172  # Make sure that directory exists and is writable
  173  sudo fwconsole restart && sudo systemctl restart apache2
  174  fwconsole reload --verbose
  175  fwconsole chown
  176  fwconsole reload
  177  ls -la /var/spool/cron/asterisk
  178  fwconsole ma disable sangomacrm
  179  fwconsole reload
  180  sudo a2enmod rewrite
  181  sudo systemctl restart apache2
  182  fwconsole chown
  183  fwconsole reload --verbose
  184  fwconsole reload --verbose
  185  # Enable Apache rewrite module
  186  a2enmod rewrite
  187  # Edit Apache configuration
  188  nano /etc/apache2/sites-available/000-default.conf
  189  systemctl restart apache2
  190  # Verify it worked
  191  fwconsole reload
  192  # Enable rewrite module
  193  a2enmod rewrite
  194  # Find your Apache config file
  195  ls /etc/apache2/sites-available/
  196  nano /etc/apache2/sites-available/000-default.conf
  197  # Test Apache config
  198  apachectl configtest
  199  # If it says "Syntax OK", restart Apache
  200  systemctl restart apache2
  201  # Set proper permissions
  202  fwconsole chown
  203  fwconsole reload
  204  grep DocumentRoot /etc/apache2/sites-available/*.conf
  205  # Check for .htaccess files
  206  ls -la /var/www/html/.htaccess
  207  ls -la /var/www/html/admin/.htaccess
  208  # Check PHP session settings
  209  php -i | grep session.save_path
  210  ls -ld /var/lib/php/sessions
  211  # Check current session directory permissions
  212  ls -ld /var/lib/php/sessions
  213  # Fix session directory permissions
  214  chown -R www-data:www-data /var/lib/php/sessions
  215  chmod 1733 /var/lib/php/sessions
  216  # Restart Apache
  217  systemctl restart apache2
  218  # Find your PHP version
  219  php -v
  220  # Edit php.ini (adjust version number if needed)
  221  nano /etc/php/8.2/apache2/php.ini
  222  # Check FreePBX config
  223  grep -i session /etc/freepbx.conf
  224  chown -R www-data:www-data /var/lib/php/sessions
  225  chmod 1733 /var/lib/php/sessions
  226  systemctl restart apache2
  227  rm -rf /var/lib/php/sessions/*
  228  ls -ld /var/lib/php/sessions
  229  ps aux | grep apache2 | grep -v grep | head -5
  230  sudo visudo
  231  sudo chown -R asterisk:asterisk /var/www/html/admin/
  232  # or whatever the appropriate user/group should be
  233  /etc/php-fpm.d/www.conf
  234  nano /etc/php-fpm.d/www.conf
  235  sudo nano /etc/php-fpm.d/www.conf
  236  sudo find /etc/php* -name "www.conf"
  237  php -v
  238  dpkg -l | grep php
  239  systemctl list-units | grep fpm
  240  ls /etc/php* /etc/php*/fpm/pool.d 2>/dev/null
  241  sudo nano /etc/apache2/envvars
  242  sudo chown -R asterisk:asterisk /var/www/html
  243  sudo chown -R asterisk:asterisk /var/lib/asterisk
  244  sudo chown -R asterisk:asterisk /etc/asterisk
  245  sudo systemctl restart apache2
  246  ps aux | grep apache2
  247  sudo chown -R asterisk:asterisk /var/www/html /var/lib/asterisk /etc/asterisk
  248  export APACHE_RUN_USER=asterisk
  249  export APACHE_RUN_GROUP=asterisk
  250  grep APACHE_RUN_ /etc/apache2/envvars
  251  sudo systemctl restart apache2
  252  # Connect via SSH
  253  ssh root@your-freepbx-ip
  254  # Make the file writable
  255  chmod 644 /etc/asterisk/ari.conf
  256  # If file doesn't exist, create it
  257  touch /etc/asterisk/ari.conf
  258  chmod 644 /etc/asterisk/ari.conf
  259  chown asterisk:asterisk /etc/asterisk/ari.conf
  260  # Edit the file
  261  nano /etc/asterisk/ari.conf
  262  chmod 644 /etc/asterisk/ari.conf
  263  cat /etc/asterisk/ari.conf 
  264  chmod 644 /etc/asterisk/ari.conf
  265  chown asterisk:asterisk /etc/asterisk/ari.conf
  266  nano /etc/asterisk/ari.conf 
  267  cat /etc/asterisk/ari.conf 
  268  asterisk -rx "ari reload"
  269  asterisk -rx "core reload"
  270  asterisk -rx "module reload res_ari.so"
  271  asterisk -rx "http reload"
  272  asterisk -rx "ari show users"
  273  asterisk -rx "ari show status"
  274  sudo netstat -tulpn | grep 8088
  275  sudo ss -tulpn | grep 8088
  276  sudo systemctl status asterisk
  277  sudo systemctl status asterisk
  278  asterisk -rx "http show status"Retry
  279  asterisk -rx "http show status"
  280  curl -u asterisk:your_password http://127.0.0.1:8088/ari/asterisk/info
  281  sudo cat /etc/asterisk/http.conf
  282  sudo cat /etc/asterisk/http_additional.conf
  283  sudo nano /etc/asterisk/http_additional.conf
  284  y
  285  asterisk -rx "module reload res_http.so"
  286  curl -u asterisk:your_password http://127.0.0.1:8088/ari/asterisk/info
  287  history
root@debian-s-1vcpu-2gb-blr1-01:~# 
