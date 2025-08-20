

https://chatgpt.com/share/688e138d-30e0-8007-b96f-37d59f9b486a

- `nano ~/.gitconfig`
```
[credential "https://github.com"]
        helper =
        helper = !/usr/bin/gh auth git-credential
[credential "https://gist.github.com"]
        helper =
        helper = !/usr/bin/gh auth git-credential
[filter "lfs"]
        clean = git-lfs clean -- %f
        smudge = git-lfs smudge -- %f
        process = git-lfs filter-process
        required = true

[includeIf "gitdir:/home/gokul/gokul_repos/**"]
    path = ~/.gitconfig-personal

[includeIf "gitdir:/home/gokul/articence_repos/**"]
    path = ~/.gitconfig-work

```

- `nano ~/.gitconfig-personal`
```
[user]
    name = gokul
    email = gokul@dasdce.com
```

# no user should be there in the mail config file, if present it will throw error
- you can check it by running `git config user.name` inside the git repository
