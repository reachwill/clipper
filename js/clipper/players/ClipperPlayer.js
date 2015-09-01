var YOUTUBE_URL = 'https://www.youtube.com/watch?v=';
var ClipperPlayer = {

    previewPlayer: null,
    currentVideo: null,

    getCurrentVideo: function () {
        return ClipperPlayer.currentVideo;
    },


    play: function (sourceType, source) {
        var sourceObj;
        switch (sourceType) {
            case 'local':
                sourceObj = ClipperPlayer.prepareLocal(source);
                break;
            case 'youtube':
                sourceObj = ClipperPlayer.prepareYoutube(source);
                break;
        }
        ClipperPlayer.currentVideo = sourceObj;
        ClipperPlayer.previewPlayer.src({
            "type": sourceObj.type,
            "src": sourceObj.videoURL
        });
        ClipperPlayer.previewPlayer.play()

    },

    //returns object prepared for a locally sourced video
    prepareLocal: function (source) {
        var file = source.context.files[0];
        var type = file.type;
        //        var videoNode = document.querySelector('video');
        //        var canPlay = videoNode.canPlayType(type);
        var fileURL = URL.createObjectURL(file);

        return {
            sourceType: 'local',
            videoURL: fileURL,
            lastModified: file.lastModifiedDate,
            name: file.name,
            type: file.type,
            thumbnail: null,
            description: null,
            title: file.name

        };
    },

    //returns object prepared for a youtube sourced video
    prepareYoutube: function (source) {

        var formattedURL = YOUTUBE_URL + source.context.dataset.videoid;
        var title = source.context.dataset.title;
        var description = source.context.dataset.description;
        var thumbnail = source.context.dataset.thumbnail;

        return {
            sourceType: 'youtube',
            videoURL: formattedURL,
            lastModified: null,
            name: title,
            type: 'video/youtube',
            thumbnail: thumbnail,
            description: description,
            title: title

        };
    }
}


//instantiation of videojs player instance for previewing videos before adding to projects
videojs("previewer", {
    "techOrder": ["youtube", "html5"],
    "src": "http://www.youtube.com/watch?v=xjS6SftYQaQ"
}).ready(function () {
    ClipperPlayer.previewPlayer = this;
});
