(function() {
    CKEDITOR.dialog.add( "digiteka", function( editor ) {
        let digitekaLang = editor.lang.digiteka;
        return {
            title: digitekaLang.title,
            minWidth: 200,
            minHeight: 200,
            contents: [
                {
                    id: "digiteka-config",
                    elements: [
                        {
                            type: "vbox",
                            padding: 0,
                            children: [ {
                                id: "digiteka_id",
                                label: digitekaLang.label,
                                validate: CKEDITOR.dialog.validate.notEmpty(
                                    digitekaLang.noUrl
                                ),
                                type: "text",
                                width: "100px",

                                required: true,
                                setup: function (widget) {
                                    this.setValue(widget.data.digiteka_id);
                                },
                                commit: function (widget) {
                                    widget.setData(
                                        "digiteka_id",
                                        this.getValue()
                                    );
                                },
                            }, {
                                id: "digiteka_mdtk",
                                label: digitekaLang.labelMdtk,
                                validate: CKEDITOR.dialog.validate.notEmpty(
                                    digitekaLang.noMdtk
                                ),
                                type: "text",
                                width: "100px",

                                required: true,
                                setup: function (widget) {
                                    this.setValue(widget.data.digiteka_mdtk);
                                },
                                commit: function (widget) {
                                    widget.setData(
                                        "digiteka_mdtk",
                                        this.getValue()
                                    );
                                }
                            }, {
                                id: "digiteka_zone",
                                label: digitekaLang.labelZone,
                                validate: CKEDITOR.dialog.validate.notEmpty(
                                    digitekaLang.noZone
                                ),
                                type: "text",
                                width: "100px",

                                required: true,
                                setup: function (widget) {
                                    this.setValue(widget.data.digiteka_zone);
                                },
                                commit: function (widget) {
                                    widget.setData(
                                        "digiteka_zone",
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
