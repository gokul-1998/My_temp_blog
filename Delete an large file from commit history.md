git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch my-next-app/public/video1.mp4 my-next-app/public/video3.mp4" \
--prune-empty --tag-name-filter cat -- --all
