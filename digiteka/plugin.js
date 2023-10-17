( function() {
    CKEDITOR.plugins.add( "digiteka", {
        requires: "dialog,fakeobjects",
        lang: ["en", "fr"],
        icons: "digiteka",
        onLoad: function() {
            CKEDITOR.addCss( "div.digiteka" +
                "{" +
                    "position: relative;" +
                    "width: 100%;" +
                "}"
            );
            CKEDITOR.addCss( "div.digiteka > div.video-height" +
                "{" +
                    "display: block;" +
                    "padding-top: 56.75%;" +
                "}"
            );
            CKEDITOR.addCss( "iframe.digiteka-embed" +
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
            let pluginName = "digiteka",
                lang = editor.lang.digiteka,
                allowed = "div(!digiteka)[data-digiteka*];div(!video-height);iframe(!digiteka-embed)[width,height,!src,allow,allowfullscreen,referrerpolicy]";

            editor.widgets.add( pluginName, {
                button: lang.toolbar,
                allowedContent: allowed,
                requiredContent: "iframe",
                template:
                    "<div class=\"digiteka\" data-digiteka_id=\"\" data-digiteka_mdtk=\"\" data-digiteka_zone=\"\">"+
                        "<div class=\"video-height\"></div>"+
                        "<iframe class=\"digiteka-embed\" src=\"\" frameborder=\"0\" allow=\"autoplay; encrypted-media; picture-in-picture\" allowfullscreen referrerpolicy=\"no-referrer-when-downgrade\" ></iframe>"+
                    "</div>",
                dialog: pluginName,

                upcast: function( element ) {
                    return element.name === "div" && element.hasClass( pluginName );
                },

                init: function() {
                    let digitekaId = this.element.getAttribute("data-digiteka_id");
                    if (digitekaId) {
                        this.setData("digiteka_id", digitekaId);
                    }
                    let digitekaMdtk = this.element.getAttribute("data-digiteka_mdtk");
                    if (digitekaMdtk) {
                        this.setData("digiteka_mdtk", digitekaMdtk);
                    } else if (editor.config?.extraConfig?.digiteka?.mdtk) {
                        this.setData("digiteka_mdtk", editor.config.extraConfig.digiteka.mdtk);
                    }
                    let digitekaZone = this.element.getAttribute("data-digiteka_zone");
                    if (digitekaZone) {
                        this.setData("digiteka_zone", digitekaZone);
                    } else if (editor.config?.extraConfig?.digiteka?.zone) {
                        this.setData("digiteka_zone", editor.config.extraConfig.digiteka.zone);
                    }
                },

                data: function() {
                    this.element.setAttribute("data-digiteka_id", this.data.digiteka_id);
                    this.element.setAttribute("data-digiteka_mdtk", this.data.digiteka_mdtk);
                    this.element.setAttribute("data-digiteka_zone", this.data.digiteka_zone);
                    let digitekaElt = this.element.findOne("iframe.digiteka-embed");
                    digitekaElt.setAttribute("src", "//www.ultimedia.com/deliver/generic/iframe/mdtk/" + this.data.mdtk + "/zone/" + this.data.zone + "/showtitle/0/src/" + this.data.digiteka_id);
                },

            } );

            CKEDITOR.dialog.add( pluginName, this.path + "dialogs/digiteka.js" );

            editor.on( "doubleclick", function( evt ) {
                let element = evt.data.element;
                if ( element.is( "div" ) && element.hasClass( "digiteka" ) ) {
                    evt.data.dialog = pluginName;
                }
            } );
        }
    } );
})();
