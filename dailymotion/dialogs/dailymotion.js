(function() {
    CKEDITOR.dialog.add( "dailymotion", function( editor ) {
        let dailymotionLang = editor.lang.dailymotion;
        return {
            title: dailymotionLang.title,
            minWidth: 200,
            minHeight: 100,
            contents: [
                {
                    id: "dailymotion-config",
                    elements: [
                        {
                            type: "vbox",
                            padding: 0,
                            children: [ {
                                id: "dailymotion_id",
                                label: dailymotionLang.label,
                                validate: CKEDITOR.dialog.validate.notEmpty(
                                    dailymotionLang.noUrl
                                ),
                                type: "text",
                                width: "100px",

                                required: true,
                                setup: function (widget) {
                                    this.setValue(widget.data.dailymotion_id);
                                },
                                commit: function (widget) {
                                    widget.setData(
                                        "dailymotion_id",
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
