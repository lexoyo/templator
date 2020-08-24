module.exports = function(unifile) {
    this.unifile = unifile;
};

module.exports.prototype.getOptions = function(session) {
  return {
    name: 'jekyll',
    displayName: 'Jekyll layout',
    pleaseCreateAVhost: 'create a Jekyll layout.',
    afterPublishMessage: 'AFTER PUBLISH MESSAGE',
    isLoggedIn: true,
    authorizeUrl: null,
    dashboardUrl: null,
    pleaseCreateAVhost: null,
    vhostsUrl: null,
    buyDomainUrl: null,
    skipVhostSelection: true,
    skipFolderSelection: false,
    afterPublishMessage: null,
  };
};

module.exports.prototype.finalizePublication = (context, onStatus) => {
  console.log('>>>>>>>>>>>>>>>>>>> TODO: use context.data.elements to build forestry fm template')
}

module.exports.prototype.beforeWrite = (context, actions) => {
  return actions.map((action) => {
    if (action.name === 'writefile' && action.path.endsWith('.html')) {
      return {
        ...action,
        // leave templates unescaped and remove <silex-template> tags
        content: action.content.replace(/<silex-template>((.|\n)+?)<\/silex-template>/g, (match, p1) => decodeHTMLEntities(p1)),
      }
    }
    return action
  })
}
module.exports.prototype.getDefaultPageFileName = (context, data) => data.pages[0].id + '.html'

// for jekyll
module.exports.prototype.getHtmlFolder = (context, defaultFolder) => '_layouts'
module.exports.prototype.getRootUrl = (context, rootUrl) => '{{ site.url }}{{ site.baseurl }}/'
// prevent page name added to page title (the page name here is a layout name)
module.exports.prototype.getPageTitle = (defaultTitle, context) => defaultTitle

function decodeHTMLEntities(text) {
  const entities = [['amp', '&'], ['apos', '\''], ['#x27', '\''], ['#x2F', '/'], ['#39', '\''], ['#47', '/'], ['lt', '<'], ['gt', '>'], ['nbsp', ' '], ['quot', '"']]
  entities.forEach((entity) => text = text.replace(new RegExp('&' + entity[0] + ';', 'g'), entity[1]))
  return text
}
