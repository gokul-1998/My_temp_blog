To **transfer all PostgreSQL databases at once** from one server to another, the best approach is to use the `pg_dumpall` tool, which is designed for exactly this purpose.

---

## ✅ Option 1: **Using `pg_dumpall` and `psql` (Recommended for Full Server Migration)**

### 🔁 This method migrates:

* All databases
* Roles (users, permissions)
* Tablespaces
* Global objects (like `pg_shadow`, `pg_database`)

---

### 🔧 On the source server or client:

```bash
pg_dumpall -h source_host -U postgres -p 5432 -f all_databases.sql
```

> 🔐 You may need to set the `PGPASSWORD` environment variable or use `.pgpass` file for authentication:

```bash
export PGPASSWORD='your_password'
```

---

### 📁 Transfer the dump file to the target server:

```bash
scp all_databases.sql user@target_host:/tmp/
```

---

### ⬇️ On the target server:

Restore all databases using `psql`:

```bash
psql -h localhost -U postgres -f /tmp/all_databases.sql
```

> 🔒 Make sure:
>
> * The target server is **empty or fresh** (to avoid conflicts).
> * The target PostgreSQL version is **equal to or newer** than the source version.

---

## ⚠️ Important Notes

* `pg_dumpall` produces a **plain SQL script**, not a binary/custom format.
* This method **must be run by a superuser** or a user with permission to read all databases.
* Existing databases on the destination with the same name may **cause errors** unless you drop them first.
* `pg_dumpall` is **server-wide**, so only use it when you want **everything moved**.

---

---

The repeated `DEBUG: StartTransaction` and `CommitTransaction` messages you're seeing mean that `pg_dumpall` is successfully connecting and processing the databases—but with **PostgreSQL server debug logging enabled**, it’s very verbose.

### 🔍 What’s happening:
Your `pg_dumpall` is working fine, but the server at `195.201.172.241` has **debug-level logging turned on**, which floods your output with transaction logs like:

```
DEBUG:  StartTransaction...
DEBUG:  CommitTransaction...
```

---

### ✅ What you should do:

1. **Check if the dump completed:**
   Run:

   ```bash
   ls -lh all_databases.sql
   ```

   If the file has a reasonable size (not empty), your backup is likely complete.

   You can peek into it to confirm:

   ```bash
   head -n 20 all_databases.sql
   ```

2. **(Optional) Suppress debug output during dump:**
   If the debug messages are from the **client-side** (your machine), you can try suppressing them by:

   ```bash
   pg_dumpall -h 192.1xx.x.x -U username -p 5432 -f all_databases.sql > /dev/null 2>&1
   ```

   But if they are from the **server logs**, you can’t suppress them unless you change the logging level in the PostgreSQL server config.



   ---

   You're almost there. Since you've now successfully switched to the `postgres` superuser and can access `psql`, you can restore the `all_databases.sql` dump from here.

---

### ✅ To restore the full PostgreSQL dump:

Assuming the `all_databases.sql` file is in the home directory of `user`, you can restore it using:

```bash
psql -f /home/user/all_databases.sql
```

Or if it's in a different path, adjust accordingly:

```bash
psql -f /full/path/to/all_databases.sql
```

---

### 🧠 Notes:

* You **must** run this as the `postgres` superuser (which you now are via `sudo -i -u postgres`).
* `pg_dumpall` includes global objects like roles and database creation statements, so `psql` must have superuser privileges — which `postgres` has.

---

### 🛠️ Common issues:

If you get errors like:

* `role "xyz" does not exist` — it just means the script is trying to assign ownership or grant permissions to a user that hasn’t yet been created. That’s fine — `pg_dumpall` should also recreate users/roles.
* If you get permission denied on the SQL file, you can copy it into `/tmp`:

```bash
sudo cp /home/user/all_databases.sql /tmp/
sudo chown postgres:postgres /tmp/all_databases.sql
sudo -i -u postgres
psql -f /tmp/all_databases.sql
```

---

Let me know if you'd like help restoring only specific databases or roles from the dump.


- clean up after restore
- `sudo rm /tmp/all_databases.sql`

# you might get permission issues
```
\c databasename

GRANT ALL PRIVILEGES ON DATABASE databasename TO user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user;
GRANT ALL ON SCHEMA public TO user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT ALL ON TABLES TO user;
```


To grant privileges on **all databases** to a user (e.g., `gokul`), you’ll need to **loop through each database** and run the grant statements inside each one, because PostgreSQL executes most grants in the context of a specific database.

---

### ✅ Method: Use a Bash loop (as `postgres` user)

Here's a complete way to do this in Bash:

```bash
sudo -i -u postgres
```

Then run:

```bash
for db in $(psql -At -c "SELECT datname FROM pg_database WHERE datistemplate = false;"); do
  echo "Granting on database: $db"
  psql "$db" -c "GRANT ALL PRIVILEGES ON DATABASE \"$db\" TO gokul;"
  psql "$db" -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gokul;"
  psql "$db" -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gokul;"
  psql "$db" -c "GRANT ALL ON SCHEMA public TO gokul_articence;"
  psql "$db" -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO gokul;"
done
```

---

### 🧠 What this does:

* Loops through all **non-template** databases.
* Executes all the grant commands in each database.

---

### 🛑 Notes:

* Make sure `gokul_articence` exists on the server before running this.
* If your tables use **non-public schemas**, adjust `public` to your schema name.
* If you want to give **read-only** instead of full privileges, use `SELECT` instead of `ALL PRIVILEGES`.

---

Let me know if you'd like a read-only version of this or want to target only specific databases.

