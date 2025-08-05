Great! A native `systemctl`-managed PostgreSQL installation is stable, performant, and well-suited for long-term production workloads. Here’s a complete step-by-step guide tailored for a **Debian/Ubuntu-based system** (let me know if you're using a different distro):

---

## ✅ Step-by-Step: Install PostgreSQL with systemctl

### **1. Update and install dependencies**
```bash
sudo apt update
sudo apt install -y wget gnupg2 lsb-release
```

---

### **2. Add the official PostgreSQL repository**
```bash
# Import the repository signing key
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Add PostgreSQL APT repository
echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | \
  sudo tee /etc/apt/sources.list.d/pgdg.list
```

---

### **3. Install PostgreSQL**
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
```

This will install the latest stable version (e.g., 16.x as of now).

---

### **4. Check status**
```bash
sudo systemctl status postgresql
```

You should see it active and running.

---

### **5. Switch to the `postgres` user and access `psql`**
```bash
sudo -i -u postgres
psql
```

At this point, you're in the interactive PostgreSQL shell as the default superuser `postgres`.

---

### **6. (Optional) Create your own user and database**
Inside the `psql` prompt:
```sql
-- Create a new user with password
CREATE USER myuser WITH PASSWORD 'mypassword';

-- Create a new database owned by that user
CREATE DATABASE mydb OWNER myuser;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

\q
```

---

### **7. Enable remote access (if needed)**

**a. Edit `postgresql.conf`**
```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
```
Find this line:
```conf
#listen_addresses = 'localhost'
```
Change to:
```conf
listen_addresses = '*'
```

**b. Edit `pg_hba.conf` to allow remote IPs**
```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
```
Add at the bottom:
```conf
host    all             all             0.0.0.0/0               md5
```

**c. Restart PostgreSQL**
```bash
sudo systemctl restart postgresql
```

---

### **8. Open the port in firewall (optional)**
If you use UFW:
```bash
sudo ufw allow 5432/tcp
```

---

## ✅ You're Done!

You now have a running PostgreSQL database managed by `systemctl`.

---
