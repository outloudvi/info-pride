#!/bin/bash
set -eu

pushd $(dirname $0)

node ./validate.mjs
