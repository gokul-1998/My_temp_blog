# note : gh needs to be installed via apt and not snap. if you install via snap it wont work
- https://github.com/cli/cli/issues/4351
- to uninstall if you installed via snap, 

```
 sudo apt remove gh
  295  sudo snap remove gh 
  296  sudo apt install gh
  297  gh auth login
  298  sudo apt purge gh
  299  sudo apt autoremove

sudo apt update
  302  sudo apt install gh
  303  gh auth status
  304  which gh
  305  gh --version
  306  hash -r
  307  gh --version
  308  which gh          # should show /usr/bin/gh
  309  gh --version      # should show 2.74.1
  310  gh auth status    # should now work
  311  gh auth login
```

- gh auth login --hostname github.com

- logout of vscode github , and use `gh auth login`

- now you can use `gh auth switch` to change the auths

