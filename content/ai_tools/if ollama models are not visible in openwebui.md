I see the problem — your **Ollama** server is bound to `127.0.0.1:11434`, which means it’s only accessible on the host, not inside your Docker container.
That’s why Open WebUI inside Docker can’t connect when it tries `localhost:11434` — in the container, “localhost” is itself, not your host machine.

You have two main ways to fix it:

---

### **Option 1 – Use `host.docker.internal`**

Run your Open WebUI container with:

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  -e OLLAMA_HOST=http://host.docker.internal:11434 \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

---

### **Option 2 – Bind Ollama to all interfaces**

Edit your Ollama service config so it listens on `0.0.0.0` instead of `127.0.0.1`.

1. Edit the systemd service:

   ```bash
   sudo systemctl edit ollama
   ```

2. Add:

   ```
   [Service]
   Environment="OLLAMA_HOST=0.0.0.0"
   ```

3. Reload and restart:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart ollama
   ```

4. Verify:

   ```bash
   ss -tulpn | grep 11434
   ```

   You should see `0.0.0.0:11434`.

Then you could run Open WebUI with:

```bash
docker run -d \
  -p 3000:8080 \
  -v open-webui:/app/backend/data \
  -e OLLAMA_HOST=http://<your_host_ip>:11434 \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

---

If you want the **quick fix without touching Ollama configs**, Option 1 with `host.docker.internal` will work right away.
If you want **other devices** to access Ollama too, go with Option 2.

---

Do you want me to rewrite your current Docker command for Open WebUI so it works with **host.docker.internal** immediately? That will solve the connection issue without changing Ollama’s binding.
