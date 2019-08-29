import $ from 'jquery';
import _ from 'underscore';
import {Form} from 'enketo-core';

const findCurrentElement = (elem, name, childMatcher) => {
  return childMatcher ? elem.find(childMatcher(name)) : elem.children(name);
};

const bindJsonToXml = (elem, data, childMatcher) => {
  Object.keys(data).map(key => [key, data[key]])
    .forEach(([id, value]) => {
      const current = findCurrentElement(elem, id, childMatcher);
      if (typeof value === 'object') {
        if(current.children().length) {
          bindJsonToXml(current, value, null);
        } else {
          current.text(value._id);
        }
      } else {
        current.text(value);
      }
    });
};

export const bindDataToModel = (model, data) => {
  const xml = $($.parseXML(model));
  const root = xml.find('model instance').children().first();
  if (data) {
    bindJsonToXml(root, data, name => '>%, >inputs>%'.replace(/%/g, name));
  }
  return new XMLSerializer().serializeToString(root[0]);
};

const nodesToJs = (data, repeatPaths, path) => {
  repeatPaths = repeatPaths || [];
  path = path || '';
  const result = {};
  withElements(data)
    .each(function(n) {
      var dbDocAttribute = n.attributes.getNamedItem('db-doc');
      if (dbDocAttribute && dbDocAttribute.value === 'true') {
        return;
      }

      var typeAttribute = n.attributes.getNamedItem('type');
      var updatedPath = path + '/' + n.nodeName;
      var value;

      var hasChildren = withElements(n.childNodes).size().value();
      if(hasChildren) {
        value = nodesToJs(n.childNodes, repeatPaths, updatedPath);
      } else if (typeAttribute && typeAttribute.value === 'binary') {
        // this is attached to the doc instead of inlined
        value = '';
      } else {
        value = n.textContent;
      }

      if (repeatPaths.indexOf(updatedPath) !== -1) {
        if (!result[n.nodeName]) {
          result[n.nodeName] = [];
        }
        result[n.nodeName].push(value);
      } else {
        result[n.nodeName] = value;
      }
    });
  return result;
};

const withElements = (nodes) => {
  return _.chain(nodes)
    .filter(function(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    });
};

class EnketoForm {
  private form: Form;

  constructor(html, modelStr, content, external=undefined) {
    $('.container').replaceWith($(html));
    this.form = new Form($('#form').find('form').first(), {
      modelStr,
      instanceStr: bindDataToModel(modelStr, content),
      external: undefined
    });
    const errors = this.form.init();
    if (errors && errors.length) {
      console.log('Form Errors', JSON.stringify(errors));
    }
  }

  getData() {
    const record = this.form.getDataStr({ irrelevant: false });
    var root = $.parseXML(record).firstChild;
    var repeatPaths = $(this.form)
      .find('repeat[nodeset]')
      .map(() => {return $(this).attr('nodeset');})
      .get();
    return nodesToJs(root.childNodes, repeatPaths, '/' + root.nodeName);
  };
}

export default EnketoForm;
