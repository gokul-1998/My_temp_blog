- how to change the author of a commit

```bash
git filter-branch -f --env-filter 'if [ "$GIT_COMMIT" = "1f4c6dcdc740975eda511af05c70eca8e727c903" ]; then export GIT_AUTHOR_NAME="gokul-1998"; export GIT_AUTHOR_EMAIL="gokulakrishnanm1998@gmail.com"; export GIT_COMMITTER_NAME="gokul-1998"; export GIT_COMMITTER_EMAIL="gokulakrishnanm1998@gmail.com"; fi' HEAD
```

- `git push --force origin main`
