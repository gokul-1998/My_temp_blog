The issue you are encountering without using `--network=host` is a common **Docker DNS resolution failure** when a container tries to reach an external public IP address or API.

Docker containers, by default, try to use the DNS settings from your host machine. If your host's DNS configuration uses a local resolver (like `127.0.0.53` from `systemd-resolved` on Ubuntu, or another local proxy/cache), the container often fails because **`127.0.0.53` inside the container is the container's own loopback address, not the host's DNS service.**

To fix this reliably *without* using `--network=host`, you need to explicitly tell the Docker container which public DNS server to use.

## **The Recommended Fix (Explicit DNS)**

The cleanest and easiest fix is to pass a reliable, public DNS server directly to the container using the `--dns` flag.

Run the command with the public DNS of your choice (e.g., Cloudflare's 1.1.1.1 or Google's 8.8.8.8):

```bash
sudo docker run --rm -it \
  --dns 1.1.1.1 \
  -v ~/cloudflared:/etc/cloudflared \
  cloudflare/cloudflared:latest tunnel create pbx_server_tunnel
```

### **Why this works:**

When you add `--dns 1.1.1.1`, Docker injects this IP address into the container's `/etc/resolv.conf` file. The container will then bypass any local DNS issues and send its DNS queries (like resolving `api.cloudflare.com`) directly to the external, public DNS server, resolving the "request canceled" timeout.

-----

## **Alternative (Docker Daemon Configuration)**

If you want **all** your Docker containers to use a specific public DNS server by default, you can configure the Docker daemon itself:

1. **Edit the Docker Daemon configuration file:**

    ```bash
    sudo nano /etc/docker/daemon.json
    ```

2. **Add or modify the `dns` entry** to include public DNS servers. If the file is empty, add the following:

    ```json
    {
      "dns": ["1.1.1.1", "8.8.8.8"]
    }
    ```

3. **Restart the Docker service** for the changes to take effect:

    ```bash
    sudo systemctl restart docker
    ```

Any container you run after this (without the `--network=host` or an explicit `--dns` flag) will automatically use the specified DNS servers.
