You’ve got a few good **UI options** to inspect what’s inside Redis. The right one depends on whether your Redis is local, remote, or production 🔍

---

## 🔹 Popular Redis UIs

### 1️⃣ **RedisInsight (Recommended)**

Official Redis UI, works great for most setups.

**Features**

* Browse keys (by DB, pattern, type)
* View/edit values
* Monitor memory usage & commands
* Supports Redis Stack (JSON, Search, Streams, etc.)

**How to use**

1. Download RedisInsight
   👉 [https://redis.io/insight](https://redis.io/insight)
2. Install it (desktop app or Docker)
3. Add your Redis connection:

   * Host: `localhost` or server IP
   * Port: `6379`
   * Password (if set)
   * TLS (if applicable)

**Docker version**

```bash
docker run -d \
  --name redisinsight \
  -p 5540:5540 \
  redis/redisinsight:latest
```

Then open:

```
http://<server-ip>:5540
```

✅ Best overall choice

---

### 2️⃣ **Redis Commander (Web-based, lightweight)**

Simple web UI, easy to run.

**Install**

```bash
npm install -g redis-commander
```

**Run**

```bash
redis-commander
```

Open:

```
http://localhost:8081
```

Or connect to a remote Redis:

```bash
redis-commander --redis-host <host> --redis-port 6379 --redis-password <password>
```

✅ Good for quick inspection
❌ Fewer features than RedisInsight

---

### 3️⃣ **Another Redis Desktop Manager**

Older but still usable.

* [https://github.com/qishibo/AnotherRedisDesktopManager](https://github.com/qishibo/AnotherRedisDesktopManager)
* Cross-platform desktop app
* Key browsing & editing

✅ Simple and fast
❌ Not officially maintained by Redis

---

## 🔹 If Redis Is on a Remote Server (Important ⚠️)

If Redis is on a **production server**, do **NOT** expose port `6379` publicly.

### Safer options

#### 🔐 Option A: SSH Tunnel

```bash
ssh -L 6379:localhost:6379 user@your-server
```

Then connect UI to:

```
localhost:6379
```

#### 🔐 Option B: Run UI on the same server

(e.g., RedisInsight via Docker, then access over VPN or SSH tunnel)

---

## 🔹 Quick CLI Check (No UI)

Just in case:

```bash
redis-cli
keys *
```

⚠️ Avoid `KEYS *` on large production DBs — use:

```bash
SCAN 0
```

---

## ✅ My Recommendation

* **Use RedisInsight** if you want a clean, powerful UI
* **Use Redis Commander** if you want quick & lightweight

If you want, tell me:

* Is Redis **local or remote**?
* Is this **dev or production**?
* Docker or bare metal?

I can give you a **step-by-step setup tailored to your server**.

* <https://chatgpt.com/share/69521cef-ce28-8011-91ab-57c42712d93f>
