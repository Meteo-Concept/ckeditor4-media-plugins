CKEditor4 Media Plugins
=======================

This modules allows you to add four (in the current version) media insertion
plugins in your [CKEditor v4](https://ckeditor.com/docs/ckeditor4/latest/guide/)
Javascript rich-text editor.

The plugins add plugins to insert: YouTube, Dailymotion and Digiteka videos as
well as Tweets/Xs. Each plugin comes with a toolbar button, a configuration
dialog and a mock object for the editor.

Compatibility with CKEditor v5 is unknown but presumably not a possibility.

Install
-----

### npm

    npm install @meteo-concept/ckeditor4-media-plugins

### yarn

    yarn add @meteo-concept/ckeditor4-media-plugins

### Manually

Download the [latest release](https://github.com/Meteo-Concept/ckeditor4-media-plugins) and include it in your app.


Usage
-----

You have to provide your own configuration to use the plugins in your specific
app. It's been tested and known to work in Symfony projects using the CKEditor
bundle.

The available plugins are "youtube", "twitter", "digiteka", and "dailymotion".
Their main file in `plugin.js`.
Their respective buttons to add in the toolbar are "Youtube", "Twitter",
"Digiteka", and "Dailymotion".

The video plugins use the video id to insert the video into the editor. For
YouTube, this is the identifier at the end of the URL.
For instance, for video
[https://www.youtube.com/watch?v=8cfbX4MJdEc](https://www.youtube.com/watch?v=8cfbX4MJdEc),
the identifier is `8cfbX4MJdEc`. Dailymotion works similarly. For Digiteka, two
other identifiers are necessary, one called "MDTK" and the other called "Zone".
Presumably, you'll get them from Digiteka if you use their services. To avoid
having to configure it for each video, you can add them to the editor
configuration at the `extraConfig.digiteka.mdtk' and `extraConfig.digiteka.zone`
paths. For Twitter/X, the plugin expects the entire URL of the tweet, for
instance [https://twitter.com/meteoconcept/status/1636729535579279362](https://twitter.com/meteoconcept/status/1636729535579279362).
Make sure to use `twitter.com` as the domain and not `x.com`, otherwise, it
won't get recognized by the plugin correctly.

Changelog
-----

### 1.0.1
- Initial release on npm

Authors
-------

[![Météo Concept](http://www.meteo-concept.fr/images/logo-meteo-concept.png)](https://www.meteo-concept.fr)
