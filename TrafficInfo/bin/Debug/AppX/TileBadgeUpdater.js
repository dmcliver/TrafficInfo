var TileBadgeUpdater = function () {
    "use strict";

    this.update = function(numberOfNotifications) {
        var badgeType = Windows.UI.Notifications.BadgeTemplateType.badgeGlyph;
        var badgeXml = Windows.UI.Notifications.BadgeUpdateManager.getTemplateContent(badgeType);
        var badgeAttributes = badgeXml.getElementsByTagName("badge");
        badgeAttributes[0].setAttribute("value", numberOfNotifications + "");
    };
}