(function() {
    CKEDITOR.dialog.add( "twitter", function( editor ) {
        let twitterLang = editor.lang.twitter;
        return {
            title: twitterLang.title,
            minWidth: 200,
            minHeight: 100,
            contents: [
                {
                    id: "twitter-config",
                    elements: [
                        {
                            type: "vbox",
                            padding: 0,
                            children: [ {
                                id: "twitter_url",
                                label: twitterLang.url,
                                validate: CKEDITOR.dialog.validate.notEmpty(
                                    twitterLang.noUrl
                                ),
                                type: "text",

                                required: true,
                                setup: function (widget) {
                                    this.setValue(widget.data.twitter_url);
                                },
                                commit: function (widget) {
                                    widget.setData(
                                        "twitter_url",
                                        this.getValue()
                                    );
                                }
                            } ]
                        }
                    ]
                }
            ],
        };
    } );
})();
