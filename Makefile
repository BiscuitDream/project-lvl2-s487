install:
	npm install

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
