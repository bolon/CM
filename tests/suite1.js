module.exports = {
  'Demo ebay search iphone & filter' : function (client) {
    var homePage = client.page.home();
    homePage.navigate();
    homePage.expect.element('@searchBar').to.be.enabled;
    
    var navMenu = homePage.section.navigation;
    //wait for navMenu 
    navMenu.expect.element('@electronics').to.be.visible;
    //hover on navMenu
    navMenu.hoverOnMenu('@electronics');
    //click on iphone Menu
    navMenu.clickSubMenuNav('iPhone');
    

    var productListPage = client.page.productList();
    //click on more refinement
    productListPage.section.sideFilter.scrollAndClick('@moreRefinement');

    var refinementDialog = client.page.refinementDialog();
    //filter screen size
    refinementDialog.clickFilter('Screen Size');
    refinementDialog.section.filterPanel.tickFilterCb('@checkBoxFilter');
    //filter Price
    refinementDialog.clickFilter('Price');
    refinementDialog.section.filterPanel.inputValueFilter('@priceStart', 5000);
    refinementDialog.section.filterPanel.inputValueFilter('@priceEnd', 5000000);
    //filter location
    refinementDialog.clickFilter('Item Location');
    refinementDialog.section.filterPanel.tickFilterRadio('on eBay.com')
    refinementDialog.applyFilter();
    
    productListPage.section.sideFilter.checkIsSelected('7 in');
    productListPage.section.sideFilter.expect.element('@priceStart').to.have.value.that.equals("5,000");
    productListPage.section.sideFilter.expect.element('@priceEnd').to.have.value.that.equals("5,000,000");
    productListPage.section.sideFilter.checkIsSelected('on eBay.com');
  }
};