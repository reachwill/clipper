var View = {

    //called from any location in the application when an element is to be enabled for user interaction.
    //param id String - value of the html element's id attribute
    enableElement: function (id) {
        $('#' + id).attr('disabled', false);
    },
    //called when a search request has returned search results and are ready to be displayed to the user.
    //param results Object - contains an array of results
    //param type String - eg youtube , vimeo etc
    renderSearchResults: function (results, type) {
        var preparedResults;

        //pass results off to be prepared by relevant utility based on collection type
        switch (type) {
            case 'youtube':
                preparedResults = YoutubeSearchRenderer.getPropsArray(results);
                break; // js/clipper/renderers/YoutubeSearchRenderer.js
        }

        // render results using Handlebars templating API
        var source = document.getElementById("searchResultsTemplate").innerHTML; //the template structure to be used by handlebars <script id="searchResultsTemplate"...
        var template = Handlebars.compile(source); //compile the template structure
        var output = template(preparedResults); //generate the actual HTML to be displayed
        $("#searchResults").html(output); //display the HTML
    }
}
