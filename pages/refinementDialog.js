const util = require('util')
const sidePanelMenuXpath = '//div/span[text()="%s"]';
const radioOptionsXpath = '//label/span[contains(., "%s")]'

const searchCommands = {
  submit() {
    this.waitForElementVisible('@searchBar', 1000)
      .sendKeys('@searchBar', "\uE007")
      .api.pause(1000);

    return this; // Return page object for chaining
  }
};

const filterCommands = {
  applyFilter(){
    this.waitForElementVisible('@applyButton', 1000)
      .click('@applyButton')
      .api.pause(1000);
      
      return this;
  },
  clickFilter(filterName){
    var selector = util.format(sidePanelMenuXpath, filterName);
    this.useXpath().waitForElementVisible(selector, 3000)
      .click(selector)
      .api.pause(1000);
  }
}

const filterPanelCommands = {
  tickFilterCb(selector, numberOfSelection=1){   //todo : create func to click based on user input
    this.waitForElementVisible(selector, 2000)
      .click(selector)
      .api.pause(1000);
  },
  inputValueFilter(selector, value){
    this.waitForElementVisible(selector, 1000)
      .sendKeys(selector, value)
      .api.pause(1000);
  },
  tickFilterRadio(name){
    var selector = util.format(radioOptionsXpath, name);
       
    this.waitForElementVisible(selector, 2000)
      .click(selector)
      .api.pause(1000);
  },
}

module.exports = {
  commands: [filterCommands],
  elements: {
    applyButton: {selector: 'button[aria-label=Apply]'}
  },
  sections: {
    filterPanel: {
      commands: [filterPanelCommands],
      selector: '#refineOverlay-mainPanel',
      elements: {
        checkBoxFilter: {selector: '//div[@id="refineOverlay-subPanel"]//input', locateStrategy: 'xpath'},
        priceStart: {
          selector : '(//input[contains(@id, "price")])[1]',
          locateStrategy: 'xpath'
        },
        priceEnd: {
          selector : '(//input[contains(@id, "price")])[2]',
          locateStrategy: 'xpath'
        }
      }
    }
  }
};