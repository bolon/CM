const util = require('util');
const menuXpath = '//li/a[text()="%s"]';
const subMenuXpath = '//li/a[text()="%s"]';
const categorySelectXpath = '//select/option[contains(., "%s")]'

const searchCommands = {
  search() {
    this.waitForElementVisible('@searchBar', 1000)
      .sendKeys('@searchBar', "\uE007")
      .api.pause(1000);

    return this; // Return page object for chaining
  }
};

const navMenuCommands = {
  hoverOnMenu(selector) {
    this.moveToElement(util.format(selector), 1000, function(){
          let subMenu = navMenu.getSubMenuNav('Iphone');
    }, `Hover on nav`);  
  },
  clickSubMenuNav(subMenuName) {
    var xpathSubMenuNav = util.format(subMenuXpath, subMenuName);
    this.useXpath().waitForElementVisible(xpathSubMenuNav, 1000)
      .click(xpathSubMenuNav)
      .api.pause(1000);
  },
  getSubMenuNav(selector) {
    return this.waitForElementVisible(util.format(subMenuXpath, selector), 1000);
  }
};

const categoryCommands = {
  selectCategory(name){
    var selector = util.format(categorySelectXpath, name);
    this.useXpath().waitForElementVisible(selector, 1000)
      .click(selector)
      .api.pause(1000);
  }
};

module.exports = {
  url: 'https://www.ebay.com',
  commands: [searchCommands],
  elements: {
    searchBar: {selector: 'input#gh-ac'},
    submitButton: {selector: 'input#gh-btn'},
    categoriesButton: {selector: 'select#gh-cat'}
  },
  sections: {
    navigation: {
      selector: 'div>ul.hl-cat-nav__container',
      commands: [navMenuCommands],
      elements: {
        electronics: {
          selector: util.format(menuXpath, 'Electronics'),
          locateStrategy: 'xpath'
        },
      }
    },
    categories: {
      selector: 'select#gh-cat',
      commands: [categoryCommands]
      }
    }
};