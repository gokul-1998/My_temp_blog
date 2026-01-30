- revert the current branch to origin head (basically remove the current commit)

# This resets both HEAD and the working tree to the commit you were on

# before the pull/merge attempt (ORIG_HEAD is automatically created by Git)

`git reset --hard ORIG_HEAD`
