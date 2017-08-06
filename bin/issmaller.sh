#! /bin/bash

if (( `git diff --name-only HEAD^ | grep 'static/game.js' | wc -l` == 0 )); then
  exit 0
fi

CURR_CHAR_COUNT=$(git cat-file -s HEAD:static/game.js)
PREV_CHAR_COUNT=$(git cat-file -s HEAD^:static/game.js)

if (( CURR_CHAR_COUNT < PREV_CHAR_COUNT )); then
  echo "$CURR_CHAR_COUNT < $PREV_CHAR_COUNT"
  exit 0
fi

echo "$CURR_CHAR_COUNT >= $PREV_CHAR_COUNT"
exit 1
