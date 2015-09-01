var YOUTUBE_URL = 'https://www.youtube.com/watch?v=';
var ClipperPlayer = {

    previewPlayer: null,


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

        console.log(sourceObj)
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
            type: file.type

        };
    },

    //returns object prepared for a youtube sourced video
    prepareYoutube: function (source) {

        var file = YOUTUBE_URL + source;

        return {
            sourceType: 'youtube',
            videoURL: YOUTUBE_URL + source,
            lastModified: null,
            name: null,
            type: 'video/youtube'

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
