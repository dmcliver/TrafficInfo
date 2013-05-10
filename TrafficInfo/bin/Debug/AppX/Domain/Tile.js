var Tile = (function (tmplate) {

    var tileXml = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(tmplate);

    var tileTextAttributes = tileXml.getElementsByTagName("text");
    var tileBindingAttributes = tileXml.getElementsByTagName("binding");
    var titleImageAttributes = tileXml.getElementsByTagName("image");
 
    Object.defineProperty(this, "text", {
        set :function (text) {
            tileTextAttributes[0].appendChild(tileXml.createTextNode(text));
        }
    });

    Object.defineProperty(this, "image", {
        set :function (src) {
            titleImageAttributes[0].setAttribute("src", src);
        }
    });

    Object.defineProperty(this, "branding", {
        set :function (prop) {
            tileBindingAttributes[0].setAttribute("branding", prop);
        }
    });

    Object.defineProperty(this, "templateContent", {
        get :function () {
            return tileXml;
        }
    });

    Object.defineProperty(this, "firstBindingItem", {
        get :function () {
            return tileBindingAttributes.item(0);
        }
    });

    Object.defineProperty(this, "firstVisualChild", {
        set: function (bindingItem) {

            tileXml.getElementsByTagName("visual").item(0)
                .appendChild(tileXml.importNode(bindingItem, true));
        }
    });
    
});