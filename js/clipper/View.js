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
    },
    //called when a local file has been selected enabling the button and updating the data attributes
    enableAddToProjectLink: function (fileObj) {
        var file = fileObj.context.files[0];
        var fileURL = URL.createObjectURL(file);
        var link = fileObj.parent().find('.addToProjectLnk');
        link.attr('data-title', file.name);
        link.attr('data-description', 'Local');
        link.attr('data-thumbnail', 'Default');
        link.attr('url', fileURL);
    },
    //called when resource is added to a project's resource list
    updateResourceList: function () {

        var arrayToRender = {
            items: []
        };

        if (ProjectManager.activeProject.resources != undefined) {
            var numItems = ProjectManager.activeProject.resources.length;
            for (var i = 0; i < numItems; i++) {
                var item = ProjectManager.activeProject.resources[i];
                arrayToRender.items.push({
                    title: item.title,
                    videoId: item.videoId,
                    description: item.description,
                    thumbnail: item.thumbnail
                });
            }
        }
        // render results using Handlebars templating API
        var source = document.getElementById("projectResourcesTemplate").innerHTML; //the template structure to be used by handlebars <script id="projectResourcesTemplate"...

        var template = Handlebars.compile(source); //compile the template structure
        var output = template(arrayToRender); //generate the actual HTML to be displayed

        $("#projectResourcesPanel").html(output); //display the HTML
    },


    //called when project is created and also on first load
    updateExistingProjectsList: function () {

        var arrayToRender = {
            items: []
        };

        var numItems = ProjectManager.existingProjects.length;
        for (var i = 0; i < numItems; i++) {
            var item = ProjectManager.existingProjects[i];
            arrayToRender.items.push({
                projectTitle: item.projectTitle,
                projectId: item.projectId,
                projectDesc: item.projectDesc,
                projectResourceCount: item.projectResourceCount,
                projectCliplistCount: item.projectCliplistCount,
                projectClipsCount: item.projectClipsCount
            });
        }
        // render results using Handlebars templating API
        var source = document.getElementById("exisitngProjectsTemplate").innerHTML; //the template structure to be used by handlebars <script id="projectResourcesTemplate"...

        var template = Handlebars.compile(source); //compile the template structure
        var output = template(arrayToRender); //generate the actual HTML to be displayed

        $("#existingProjectsPane").html(output); //display the HTML
    }

}
