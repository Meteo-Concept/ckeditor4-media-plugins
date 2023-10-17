( function() {
    CKEDITOR.plugins.add( "dailymotion", {
        requires: "dialog,fakeobjects",
        lang: ["en", "fr"],
        icons: "dailymotion",
        onLoad: function() {
            CKEDITOR.addCss( "div.dailymotion" +
                "{" +
                    "position: relative;" +
                    "width: 100%;" +
                "}"
            );
            CKEDITOR.addCss( "div.dailymotion > div.video-height" +
                "{" +
                    "display: block;" +
                    "padding-top: 56.75%;" +
                "}"
            );
            CKEDITOR.addCss( "iframe.dailymotion-embed" +
                "{" +
                    "position: absolute;" +
                    "top: 0;" +
                    "left: 0;" +
                    "width: 100%;" +
                    "height: 100%;" +
                "}"
            );
        },
        init: function( editor ) {
            let pluginName = "dailymotion",
                lang = editor.lang.dailymotion,
                allowed = "div(!dailymotion)[data-dailymotion*];div(!video-height);iframe(!dailymotion-embed)[width,height,!src,allow,allowfullscreen]";

            editor.widgets.add( pluginName, {
                button: lang.toolbar,
                allowedContent: allowed,
                requiredContent: "iframe",
                template:
                    "<div class=\"dailymotion\" data-dailymotion_id=\"\">"+
                        "<div class=\"video-height\"></div>"+
                        "<iframe class=\"dailymotion-embed\" src=\"\" frameborder=\"0\" type=\"text/html\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen></iframe>"+
                    "</div>",
                dialog: pluginName,

                upcast: function( element ) {
                    return element.name == "div" && element.hasClass( pluginName );
                },

                init: function() {
                    let dailymotionId = this.element.getAttribute("data-dailymotion_id");
                    if (dailymotionId) {
                        this.setData("dailymotion_id", dailymotionId);
                    }
                },

                data: function() {
                    this.element.setAttribute("data-dailymotion_id", this.data.dailymotion_id);
                    let dailymotionElt = this.element.findOne("iframe.dailymotion-embed");
                    dailymotionElt.setAttribute("src", "https://www.dailymotion.com/embed/video/" + this.data.dailymotion_id);
                },

            } );

            CKEDITOR.dialog.add( pluginName, this.path + "dialogs/dailymotion.js" );

            editor.on( "doubleclick", function( evt ) {
                let element = evt.data.element;
                if ( element.is( "div" ) && element.hasClass( "dailymotion" ) ) {
                    evt.data.dialog = pluginName;
                }
            } );
        }
    } );
})();
