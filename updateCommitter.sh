GITHASH=git rev-parse @~2
git filter-branch --commit-filter 'export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"; export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"; export GIT_COMMITTER_DATE="$GIT
_AUTHOR_DATE"; git commit-tree "$@"' -- $GITHASH..HEAD