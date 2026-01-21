# install pgadmin and postgres in ubunut.md

- <https://www.pgadmin.org/download/pgadmin-4-apt/>

```
#
# Setup the repository
#

# Install the public key for the repository (if not done previously):
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg

# Create the repository configuration file:
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'

#
# Install pgAdmin
#

# Install for both desktop and web modes:
sudo apt install pgadmin4

# Install for desktop mode only:
sudo apt install pgadmin4-desktop

# Install for web mode only: 
sudo apt install pgadmin4-web 

# Configure the webserver, if you installed pgadmin4-web:
sudo /usr/pgadmin4/bin/setup-web.sh
```

- `sudo apt-get install postgresql`
- `sudo -u postgres psql postgres`
- `ALTER USER postgres WITH PASSWORD 'password';`

# the above one causes trouble, so use the below one
<https://medium.com/yavar/install-and-configure-postgresql-and-pgadmin-on-ubuntu-20-04-22-04-52c52c249b9e>

# to set up password to postgres

- <https://stackoverflow.com/questions/12720967/how-can-i-change-a-postgresql-user-password>
