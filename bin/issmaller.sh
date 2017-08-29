#! /bin/bash

FILE_PATH='static/game.js'

if [ -z "$(git status --porcelain)" ]; then
  # Working directory clean.
  if (( `git diff --name-only HEAD^ | grep $FILE_PATH | wc -l` == 0 )); then
    # No changes to static/game.js in last commit, so we're done
    exit 0
  fi
  # Compare count of last commit to previous commit.
  CURR_CHAR_COUNT=$(git cat-file -s HEAD:${FILE_PATH})
  PREV_CHAR_COUNT=$(git cat-file -s HEAD^:${FILE_PATH})
else
  # Uncommitted changes.
  if (( `git diff --name-only HEAD | grep $FILE_PATH | wc -l` == 0 )); then
    # No changes to static/game.js in working directory, so we're done
    exit 0
  fi
  # Compare count of file in working directory to last commit.
  CURR_CHAR_COUNT=$(cat ${FILE_PATH} | wc -m)
  PREV_CHAR_COUNT=$(git cat-file -s HEAD:${FILE_PATH})
fi

if (( CURR_CHAR_COUNT < PREV_CHAR_COUNT )); then
  echo "$CURR_CHAR_COUNT < $PREV_CHAR_COUNT"
  exit 0
fi

echo "$CURR_CHAR_COUNT >= $PREV_CHAR_COUNT"
exit 1
