(function() {
    CKEDITOR.dialog.add( "youtube", function( editor ) {
        let youtubeLang = editor.lang.youtube;
        return {
            title: youtubeLang.title,
            minWidth: 200,
            minHeight: 100,
            contents: [
                {
                    id: "youtube-config",
                    elements: [
                        {
                            type: "vbox",
                            padding: 0,
                            children: [ {
                                id: "youtube_id",
                                label: youtubeLang.label,
                                validate: CKEDITOR.dialog.validate.notEmpty(
                                    youtubeLang.noId
                                ),
                                type: "text",
                                width: "100px",

                                required: true,
                                setup: function (widget) {
                                    this.setValue(widget.data.youtube_id);
                                },
                                commit: function (widget) {
                                    widget.setData(
                                        "youtube_id",
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
