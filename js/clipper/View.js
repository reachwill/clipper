var View = {

    //called at page load to configure start interafce
    init: function () {
        View.hideThing($('#clipPropsEditor'), 'sudden');
        View.hideThing($('#annotationEditor'), 'sudden');
        View.controller.changeView('collectionsSection', $('a[data-view=collectionsSection]'));
        View.clearFields($('#clipPropsEditor'));
        $('.tabContent').hide();
    },

    shrinkHeader: function () {
        $('#projectTitle').css('font-size', '.9em')
    },

    hideThing: function (thing, how) {
        switch (how) {
        case 'sudden':
            thing.hide();
            break;
        case 'slideUp':
            thing.slideUp();
            break;
        }


    },

    showThing: function (thing, how) {
        switch (how) {
        case 'slideDown':
            thing.slideDown();
            break;
        case 'fade':
            thing.fadeIn();
            break;
        }
    },

    populateFields: function () {
        var activeClip = ProjectManager.activeClip;
        $('#clipTitleTxt').val(activeClip.title);
        $('#clipDescTxt').val(activeClip.description);
        View.populateAnnoFields();
    },

    populateAnnoFields: function () {
        var activeClip = ProjectManager.activeClip;
        $('.annosBelongTo').text(activeClip.title);
    },

    clearFields: function (container) {
        container.find('input,textarea').val('');
    },

    updateTimerDisplays: function () {
        $('.annotationTimeDisplay').text(ClipperPlayer.activePlayer.currentTime());
    },

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
        link.attr('data-thumbnail', 'css/icons/1441652014_film_clip_movie_timestamp.svg');
        link.attr('data-videoid', fileURL);
        link.attr('data-sourcetype', 'blob');

    },

    //called when a clip is added to a cliplist
    updateClipsInClipList: function (cliplistIndex) {

        var arrayToRender = {
            items: []
        };


        var numItems = ProjectManager.activeProject.cliplists[cliplistIndex].clips.length;
        for (var i = 0; i < numItems; i++) {
            var item = ProjectManager.activeProject.cliplists[cliplistIndex].clips[i];
            arrayToRender.items.push({
                title: item.title,
                id: item.id,
                description: item.description,
                start: item.start,
                end: item.end,
                thumbnail: item.thumbnail,
                sourcetype: item.sourceType,
                resource: item.resource
            });
        }


        // render results using Handlebars templating API
        var source = document.getElementById("cliplistsClipsTemplate").innerHTML; //the template structure to be used by handlebars <script id="projectResourcesTemplate"...

        var template = Handlebars.compile(source); //compile the template structure
        var output = template(arrayToRender); //generate the actual HTML to be displayed
        $(".clipsPane").html(output); //display the HTML
    },



    //called when project is loaded and when a new cliplist is defined
    updateCliplistList: function () {

        var arrayToRender = {
            items: []
        };

        if (ProjectManager.activeProject.cliplists != undefined) {
            var numItems = ProjectManager.activeProject.cliplists.length;
            for (var i = 0; i < numItems; i++) {
                var item = ProjectManager.activeProject.cliplists[i];
                arrayToRender.items.push({
                    title: item.title,
                    id: item.id,
                    description: item.description
                });
            }
        }

        // render results using Handlebars templating API
        var source = document.getElementById("projectCliplistsTemplate").innerHTML; //the template structure to be used by handlebars <script id="projectResourcesTemplate"...

        var template = Handlebars.compile(source); //compile the template structure
        var output = template(arrayToRender); //generate the actual HTML to be displayed
        $("#cliplistsPane").html(output); //display the HTML
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
                    videoid: item.videoid,
                    description: item.description,
                    thumbnail: item.thumbnail,
                    sourcetype: item.sourcetype
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
        var source = document.getElementById("existingProjectsTemplate").innerHTML; //the template structure to be used by handlebars <script id="projectResourcesTemplate"...

        var template = Handlebars.compile(source); //compile the template structure
        var output = template(arrayToRender); //generate the actual HTML to be displayed

        $("#existingProjectsPane").html(output); //display the HTML
    },
    controller: {
        changeView: function (view, clicked) {
            $('#projectPage>header nav a').removeClass('active');
            clicked.addClass('active');
            $('#projectPage>section').hide();
            $('#' + view).fadeIn(500);
            //hide the clipEditor controls

        },
        changeAnnoEditorView: function (view, clicked) {
            $('#annotationEditor .tabLink').removeClass('active');
            clicked.addClass('active');
            $('#annotationEditor .tabContent').hide();
            $('#' + view).fadeIn(500);
            //hide the clipEditor controls

        }
    }

}
