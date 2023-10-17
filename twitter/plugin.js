(function() {
    CKEDITOR.plugins.add( "twitter", {
        requires: "dialog,fakeobjects",
        lang: ["en", "fr"],
        icons: "twitter",
        init: function( editor ) {
            let pluginName = "twitter",
                lang = editor.lang.twitter,
                allowed = "div(!tweet)[data-twitter*,class];blockquote(!twitter-tweet)[class];img[!src];a[!href];p[lang,dir]";

            editor.widgets.add( pluginName, {
                button: lang.toolbar,
                allowedContent: allowed,
                requiredContent: "blockquote",
                template: "<div class=\"tweet\" data-twitter_url=\"\"></div>",
                dialog: pluginName,

                upcast: function( element ) {
                    return element.name == "div" && element.hasClass( "tweet" );
                },

                init: function() {
                    let twitterUrl = this.element.getAttribute("data-twitter_url");
                    if (twitterUrl) {
                        this.setData("twitter_url", twitterUrl);
                    }
                },

                data: function() {
                    const element = this.element;
                    element.setAttribute("data-twitter_url", this.data.twitter_url);
                    const previousUrl = this.element.getAttribute('data-twitter_loaded_url');
                    if (previousUrl !== this.data.twitter_url) {
                        element.setAttribute('data-twitter_loaded_url', this.data.twitter_url);
                        if (this.data.twitter_url) {
                            jQuery.ajax({
                                url: 'https://publish.twitter.com/oembed?url=' + this.data.twitter_url,
                                type: 'GET',
                                dataType: 'jsonp',
                            }).done(function (data) {
                                element.setHtml(data.html);
                            }).error(function (jqXHR, textStatus, errorThrown) {
                                element.setHtml(
                                    "<div class=\"twitter\">" + lang.cannotLoadFrom +
                                        "<a href=\"" + this.data.twitter_url + "\">" + this.data.twitter_url + "</a>" +
                                    "</div>"
                                );
                                console.log("Loading the tweet failed with status: " + textStatus + " (" + errorThrown + ")");
                            });
                        }
                    }
                },

            } );

            CKEDITOR.dialog.add( pluginName, this.path + "dialogs/twitter.js" );

            editor.on( "doubleclick", function( evt ) {
                let element = evt.data.element;
                if ( element.is( "div" ) && element.hasClass( "twitter" ) ) {
                    evt.data.dialog = pluginName;
                }
            } );
        }
    } );
})();
