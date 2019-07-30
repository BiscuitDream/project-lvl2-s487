install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

clear:
	npm run clear

build:
	npm run clear
	npm run build

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
