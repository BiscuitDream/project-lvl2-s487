[![Maintainability](https://api.codeclimate.com/v1/badges/724899651b534d275ddb/maintainability)](https://codeclimate.com/github/BiscuitDream/project-lvl2-s487/maintainability)
[![Build Status](https://travis-ci.org/BiscuitDream/project-lvl2-s487.svg?branch=master)](https://travis-ci.org/BiscuitDream/project-lvl2-s487)


# Описание
Утилиту для поиска отличий в конфигурационных файлах (json, yaml, ini).

##Возможности утилиты:

- Поддержка разных форматов
- Генерация отчета в виде plain text, pretty и json
- Пример использования:

$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.

### Установка
В папке с проектом:
```sh
$ make publish
$ npm link
```
[![asciicast](https://asciinema.org/a/kW3dXLkvhnBMwK8I97i8fRc6y.svg)](https://asciinema.org/a/kW3dXLkvhnBMwK8I97i8fRc6y)

### help
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  Output format (default: "common")
  -h, --help           output usage information

### Использование
Доступны 3 вида форматирования: обычный, plain, json

Плоские конфиги:
[![asciicast](https://asciinema.org/a/Gm6WdtT8W8mUv3rjjFstlz6em.svg)](https://asciinema.org/a/Gm6WdtT8W8mUv3rjjFstlz6em)


Вложенные конфиги:
[![asciicast](https://asciinema.org/a/r6XSHpj3Eno1EDtkxaSpyM9zo.svg)](https://asciinema.org/a/r6XSHpj3Eno1EDtkxaSpyM9zo)
