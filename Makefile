install:
	npm install

clear:
	npm run clear

publish:
	npm publish --dry-run

build:
	npm run clear
	npm run build

.PHONY: test
