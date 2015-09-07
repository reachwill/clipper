var YoutubeSearchRenderer = {
    //returns html to the View for display in interface
    getPropsArray: function (results) {
        var arrayToRender = {
            items: []
        };

        var numItems = results.items.length;
        for (var i = 0; i < numItems; i++) {
            var item = results.items[i]
                //console.log(thumbnail);
            arrayToRender.items.push({
                title: item.snippet.title,
                videoId: item.id.videoId,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.default.url,
                sourcetype: 'youtube'
            });
        }
        return arrayToRender;
    }
}
