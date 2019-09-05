const plainFormatter = (ast) => {
  const property = 'Property';
  const iter = (elem) => {
    if (elem.type === 'parametre') {
      if (elem.status === 'unchanged') {
        return '';
      }
      if (elem.status === 'added') {
        return `Property '${elem.name}' was added with value: ${elem.valueNew}`;
      }
      if (elem.status === 'removed') {
        return `Property '${elem.name}' was removed`;
      }
      if (elem.status === 'changed') {
        return `Property '${elem.name}' was updated. From ${elem.valueOld} to ${elem.valueNew}`;
      }
    }
    if (elem.type === 'parametresList') {
      return `${elem.children.map(iter).join('\n')}`;
    }
  };

  return iter(ast).trim();
};

export default plainFormatter;


/*
Property 'timeout' was updated. From 50 to 20
Property 'proxy' was removed
Property 'common.setting4' was removed
Property 'common.setting5' was removed
Property 'common.setting2' was added with value: 200
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.sites' was added with value: 'hexlet.io'
Property 'group1.baz' was updated. From 'bars' to 'bas'
Property 'group3' was removed
Property 'verbose' was added with value: true
Property 'group2' was added with value: [complex value]
*/


const exampleRecursive = {
  "name": "root",
  "type": "parametresList",
  "children": [
    {
      "name": "common",
      "type": "parametresList",
      "children": [
        {
          "name": "setting1",
          "type": "parametre",
          "status": "unchanged",
          "valueOld": "Value 1",
          "valueNew": "Value 1",
          "children": []
        },
        {
          "name": "setting2",
          "type": "parametre",
          "status": "removed",
          "valueOld": "200",
          "valueNew": null,
          "children": []
        },
        {
          "name": "setting3",
          "type": "parametre",
          "status": "changed",
          "valueOld": true,
          "valueNew": {
            "key": "value"
          },
          "children": []
        },
        {
          "name": "setting6",
          "type": "parametresList",
          "children": [
            {
              "name": "key",
              "type": "parametre",
              "status": "unchanged",
              "valueOld": "value",
              "valueNew": "value",
              "children": []
            },
            {
              "name": "ops",
              "type": "parametre",
              "status": "added",
              "valueOld": null,
              "valueNew": "vops",
              "children": []
            }
          ]
        },
        {
          "name": "follow",
          "type": "parametre",
          "status": "added",
          "valueOld": null,
          "valueNew": false,
          "children": []
        },
        {
          "name": "setting4",
          "type": "parametre",
          "status": "added",
          "valueOld": null,
          "valueNew": "blah blah",
          "children": []
        },
        {
          "name": "setting5",
          "type": "parametre",
          "status": "added",
          "valueOld": null,
          "valueNew": {
            "key5": "value5"
          },
          "children": []
        }
      ]
    },
    {
      "name": "group1",
      "type": "parametresList",
      "children": [
        {
          "name": "baz",
          "type": "parametre",
          "status": "changed",
          "valueOld": "bas",
          "valueNew": "bars",
          "children": []
        },
        {
          "name": "foo",
          "type": "parametre",
          "status": "unchanged",
          "valueOld": "bar",
          "valueNew": "bar",
          "children": []
        },
        {
          "name": "nest",
          "type": "parametre",
          "status": "changed",
          "valueOld": {
            "key": "value"
          },
          "valueNew": "str",
          "children": []
        }
      ]
    },
    {
      "name": "group2",
      "type": "parametre",
      "status": "removed",
      "valueOld": {
        "abc": "12345"
      },
      "valueNew": null,
      "children": []
    },
    {
      "name": "group3",
      "type": "parametre",
      "status": "added",
      "valueOld": null,
      "valueNew": {
        "fee": "100500"
      },
      "children": []
    }
  ]
}


const exampleFlat = {
  "name": "root",
  "type": "parametresList",
  "children": [
    {
      "name": "host",
      "type": "parametre",
      "status": "unchanged",
      "valueOld": "hexlet.io",
      "valueNew": "hexlet.io",
      "children": []
    },
    {
      "name": "timeout",
      "type": "parametre",
      "status": "changed",
      "valueOld": 50,
      "valueNew": 20,
      "children": []
    },
    {
      "name": "proxy",
      "type": "parametre",
      "status": "removed",
      "valueOld": "123.234.53.22",
      "valueNew": null,
      "children": []
    },
    {
      "name": "follow",
      "type": "parametre",
      "status": "removed",
      "valueOld": false,
      "valueNew": null,
      "children": []
    },
    {
      "name": "verbose",
      "type": "parametre",
      "status": "added",
      "valueOld": null,
      "valueNew": true,
      "children": []
    }
  ]
}
