module.exports = {
  'Demo ebay search iphone & filter' : function (client) {
    var homePage = client.page.home();
    var searchKeyword = 'MacBook'
    homePage.navigate();
    homePage.expect.element('@searchBar').to.be.enabled;
    
    
    homePage.setValue('@searchBar', searchKeyword);
    homePage.click('@categoriesButton');
    homePage.section.categories.selectCategory("Computers/Tablets & Networking");
    homePage.search();
        
    var productListPage = client.page.productList();
    var items = productListPage.section.listProductContainer;
    items.checkFirstItemContainsName(searchKeyword);
  }
};