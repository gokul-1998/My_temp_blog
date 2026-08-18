Ran command: `git status`
Ran command: `git log -n 3 --oneline`

To remove the latest commit (`6 done`), choose the option that fits what you want to do with the code changes:

---

### Option 1: Undo the commit but **keep your changes** (Recommended)
This removes the commit from history, but keeps all modified files in your working directory so you don't lose any code.

```bash
git reset HEAD~1
```
*(Use `git reset --soft HEAD~1` if you want the changes to remain staged).*

---

### Option 2: Completely **delete the commit and discard all its changes**
> [!CAUTION]
> This permanently discards all changes made in that commit.

```bash
git reset --hard HEAD~1
```

---

### If already pushed to GitHub / Remote
Since `main` is already synced with `origin/main`, you will need to force-push to update the remote repository:

```bash
git push --force-with-lease origin main
```

---

### Alternative: Safe undo without rewriting history (`git revert`)
If other teammates pull from `main`, creating a revert commit is safer than rewriting history:

```bash
git revert HEAD
git push origin main
```

---

Would you like me to run one of these for you? Just let me know if you'd like to **keep** or **discard** the code from that commit.
