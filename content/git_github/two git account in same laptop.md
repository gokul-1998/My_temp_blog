Using two different GitHub profiles on the same laptop is manageable by configuring SSH keys and specifying them per repository. Here's a step-by-step guide:

---

### 1. **Generate SSH Keys for Both Accounts**

Each GitHub account should have its own SSH key.

#### For Account 1

```bash
ssh-keygen -t ed25519 -C "your_email1@example.com"
```

- Save the key as `~/.ssh/id_ed25519_account1` (or another identifiable name).

#### For Account 2

```bash
ssh-keygen -t ed25519 -C "your_email2@example.com"
```

- Save the key as `~/.ssh/id_ed25519_account2`.

---

### 2. **Add the SSH Keys to Your SSH Agent**

Add the generated keys to the SSH agent.

```bash
eval "$(ssh-agent -s)"
```

#### Add Account 1 Key

```bash
ssh-add ~/.ssh/id_ed25519_account1
```

#### Add Account 2 Key

```bash
ssh-add ~/.ssh/id_ed25519_account2
```

---

### 3. **Add SSH Keys to GitHub**

1. Copy the public keys to your clipboard:

   ```bash
   cat ~/.ssh/id_ed25519_account1.pub
   cat ~/.ssh/id_ed25519_account2.pub
   ```

2. Go to GitHub:
   - For each account, navigate to **Settings > SSH and GPG keys > New SSH Key**.
   - Add the respective key for each account.

---

### 4. **Configure SSH for Multiple Accounts**

Edit or create the `~/.ssh/config` file:

```bash
nano ~/.ssh/config
```

Add the following configuration:

```plaintext
# Account 1
Host github-account1
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_account1

# Account 2
Host github-account2
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_account2
```

---

### 5. **Clone Repositories Using Specific Accounts**

Use the configured host names (`github-account1` or `github-account2`) when cloning repositories:

#### For Account 1

```bash
git clone git@github-account1:username/repo.git
```

#### For Account 2

```bash
git clone git@github-account2:username/repo.git
```

---

### 6. **Set Global or Repository-Specific Git Config**

You can set your name and email globally or per repository.

#### Global

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email1@example.com"
```

#### Per Repository

Inside the repository directory:

```bash
git config user.name "Your Name"
git config user.email "your_email2@example.com"
```

---

### 7. **Switch Between Accounts**

Git automatically uses the appropriate SSH key based on the `Host` in the `~/.ssh/config` file. Ensure that your repositories are cloned using the correct `Host` (`github-account1` or `github-account2`).

---

Now, you can work with both GitHub accounts seamlessly on the same machine!

- `gh auth switch` - to change accounts
