( function() {
    CKEDITOR.plugins.add( "youtube", {
        requires: "dialog,fakeobjects",
        lang: "en",
        icons: "youtube",
        onLoad: function() {
            CKEDITOR.addCss( "div.youtube" +
                "{" +
                    "position: relative;" +
                    "width: 100%;" +
                "}"
            );
            CKEDITOR.addCss( "div.youtube > div.video-height" +
                "{" +
                    "display: block;" +
                    "padding-top: 56.75%;" +
                "}"
            );
            CKEDITOR.addCss( "iframe.youtube-embed" +
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
            let pluginName = "youtube",
                lang = editor.lang.youtube,
                allowed = "div(!youtube)[data-youtube*];div(!video-height);iframe(!youtube-embed)[width,height,!src,allow,allowfullscreen]";

            editor.widgets.add( pluginName, {
                button: lang.toolbar,
                allowedContent: allowed,
                requiredContent: "iframe",
                template:
                    "<div class=\"youtube\" data-youtube_id=\"\">"+
                        "<div class=\"video-height\"></div>"+
                        "<iframe class=\"youtube-embed\" src=\"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"+
                    "</div>",
                dialog: pluginName,

                upcast: function( element ) {
                    return element.name == "div" && element.hasClass( pluginName );
                },

                init: function() {
                    let youtubeId = this.element.getAttribute("data-youtube_id");
                    if (youtubeId) {
                        this.setData("youtube_id", youtubeId);
                    }
                },

                data: function() {
                    this.element.setAttribute("data-youtube_id", this.data.youtube_id);
                    let youtubeElt = this.element.findOne("iframe.youtube-embed");
                    youtubeElt.setAttribute("src", "https://www.youtube.com/embed/" + this.data.youtube_id);
                },

            } );

            CKEDITOR.dialog.add( pluginName, this.path + "dialogs/youtube.js" );

            editor.on( "doubleclick", function( evt ) {
                let element = evt.data.element;
                if ( element.is( "div" ) && element.hasClass( "youtube" ) ) {
                    evt.data.dialog = pluginName;
                }
            } );
        }
    } );
})();
