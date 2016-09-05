import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';    //react doc test utilities
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
//document.defaultview 该属性返回当前 document 对象所关联的 window 对象，如果没有，会返回 null。
global.window = global.document.defaultView;
const $ = jquery(global.window);

// Build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  
  return $(ReactDOM.findDOMNode(componentInstance));  //produces html
}

// Build helper for simulating events
$.fn.simulate = function(eventName, value) {

  if(value) {
    this.val(value);
  }

  //https://facebook.github.io/react/docs/test-utils.html
  TestUtils.Simulate[eventName](this[0])
}

// Set up chai-jquery
//chai and jquery as peerDependencies
/* https://github.com/chaijs/chai-jquery/issues/40 */
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };