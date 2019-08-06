install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

clear:
	npm run clear

build:
	npm run clear
	npm run build

test:
	npm test

watch:
	npm run watch

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
