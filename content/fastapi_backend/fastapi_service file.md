To make your **FastAPI app** run automatically when you restart your laptop (Linux system), you can use **systemd** to create a **service file**.

---

### ✅ Step 1: Prepare Your FastAPI App

Let’s assume:

* Your app is in: `/home/youruser/myapp/main.py`
* You run it with: `uvicorn main:app --host 0.0.0.0 --port 8000`
* You’re using a **virtual environment** at: `/home/youruser/myapp/venv/`

---

### ✅ Step 2: Create a Systemd Service File

Create a file called:

```bash
sudo nano /etc/systemd/system/fastapi-app.service
```

Paste the following content (edit paths accordingly):

```ini
[Unit]
Description=FastAPI app with Uvicorn
After=network.target

[Service]
User=youruser
Group=youruser
WorkingDirectory=/home/youruser/myapp
ExecStart=/home/youruser/myapp/venv/bin/uvicorn main:app --host 0.0.0.0 --port=8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

🔁 **Replace `youruser` and paths** with your actual username and paths.

---

### ✅ Step 3: Reload systemd and Enable the Service

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable fastapi-app.service
```

To **start it now**:

```bash
sudo systemctl start fastapi-app.service
```

To **check status**:

```bash
sudo systemctl status fastapi-app.service
```

To **check logs**:

```bash
journalctl -u fastapi-app.service -f
```

---

### ✅ Your FastAPI app will now

* Automatically start on boot
* Restart if it crashes
* Log via `journalctl`

Let me know if you’re using `gunicorn` or `docker` and I’ll adapt it accordingly.

TLDR :
Example Fastapi_app.service

```
[Unit]
Description=FastAPI app with Uvicorn
After=network.target

[Service]
User=minato
Group=minato
WorkingDirectory=/home/minato/Desktop/FastApi-crud
ExecStart=/home/minato/Desktop/FastApi-crud/env/bin/uvicorn main:app --host 0.0.0.0 --port=8000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```
