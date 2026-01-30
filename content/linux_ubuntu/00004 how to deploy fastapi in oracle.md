```
 history
    1  ls
    2  df -h
    3  mkdir fastapi_app
    4  cd fastapi_app/
    5  python3
    6  git clone https://github.com/Adithyenkandasamy/Quiz-app_fastapi.git
    7  nano .env
    8  touch .env
    9  exit
   10  sudo apt update && sudo apt upgrade -y
   11  sudo apt install python3 python3-pip python3-venv git -y
   12  cd fastapi_app/Quiz-app_fastapi/
   13  python3 -m venv venv
   14  source venv/bin/activate
   15  pip install -r requirements.txt
   16  uvicorn main:app --host 0.0.0.0 --port 8000
   17  sudo ss -tulnp | grep 8000
   18  curl http://127.0.0.1:8000/
   19  sudo apt install nginx -y
   20  sudo nano /etc/nginx/sites-available/fastapi
   21  nano 
   22  sudo apt install nano
   23  sudo nano /etc/nginx/sites-available/fastapi
   24  sudo ln -s /etc/nginx/sites-available/fastapi /etc/nginx/sites-enabled/
   25  sudo nginx -t
   26  sudo systemctl restart nginx
   27  sudo rm /etc/nginx/sites-enabled/default
   28  sudo nginx -t
   29  sudo systemctl restart nginx
   30  wget http://140.245.235.255/
   31  ufw status
   32  reboot
   33  sudo reboot
   34  sudo lsof -i -P -n | grep 8000
   35  ps aux | grep uvicorn
   36  sudo ufw status
   37  ls
   38  nano /etc/nginx/sites-available/fastapi
   39  sudo ln -s /etc/nginx/sites-available/fastapi /etc/nginx/sites-enabled/
   40  sudo nginx -t
   41  sudo systemctl restart nginx
   42  curl ifconfig.me
   43  sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
   44  sudo netfilter-persistent save
   45  sudo apt install firewalld
   46  sudo firewall-cmd --zone=public --permanent --add-port=80/tcp
   47  sudo firewall-cmd --reload
   48  history
ubuntu@instance-20250824-0855:~$
```

- `sudo nano /etc/nginx/sites-available/fastapi`

```
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```
