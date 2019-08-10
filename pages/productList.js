const util = require('util');
const sideMenuCheckBox = '//span[text()="%s"]/preceding-sibling::input';
const itemTitleXpath = '//li[contains(@class, "s-item")]/*[contains(., "%s")]';

const sideMenuCommands = {
  scrollAndClick(selector) {
    this.moveToElement(selector, 0, 0).click(selector);
  },
  checkIsSelected(name) {
    var selector = util.format(sideMenuCheckBox, name);
    console.log(selector);
    this.waitForElementVisible(selector, 1000);
    this.expect.element(selector).to.be.selected;
  },
  priceStartIs(value) {
  }
}

const itemCommands = {
  checkFirstItemContainsName(name) {
    var selector = util.format(itemTitleXpath, name)
    this.waitForElementVisible(selector, 2000);
    this.api.assert.containsText(selector, name);
  }
}

module.exports = {
  commands: [],
  elements: {
    searchBar: {selector: 'input#gh-ac'},
    submitButton: {selector: 'input#gh-btn'}
  },
  sections: {
    sideFilter: {
      selector: 'div#leftnav',
      commands: [sideMenuCommands],
      elements: {
        moreRefinement: {selector: '//button/span[text()="More refinements"]/parent::button', locateStrategy: 'xpath'},
        priceStart: {selector: '(//div[contains(@class, "range")]/input)[1]', locateStrategy: 'xpath'},
        priceEnd: {selector: '(//div[contains(@class, "range")]/input)[2]', locateStrategy: 'xpath'},
      }
    },
    listProductContainer: {
      commands: [itemCommands],
      selector: 'ul.srp-list'
    }
  }
};