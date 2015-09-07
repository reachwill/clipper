$(document).ready(function () {

    View.updateExistingProjectsList();
    //set up user initiated event handlers for all view elements

    //when user clicks to create a new project
    $('#createProjectBtn').click(function (e) {
        ProjectManager.createNewProject($('#newProjectFrm'));
    });

    //when user clicks to peform a youtube search request
    $('#youtubeSearchBtn').click(function (e) {
        YoutubeSearch.makeRequest();
    });

    //when user has browsed to a file on local system
    $('#localSearchInput').change(function (e) {
        ClipperPlayer.play('local', $(this));
        View.enableAddToProjectLink($(this));
    });

    //when user clicks preview link in a search result
    $('#searchResults').on('click', '.previewLnk', function (e) {
        ClipperPlayer.play('youtube', $(this));
    });

    //when user clicks add to project link anywhere in interface
    $('#searchResults,#localFileSearch').on('click', '.addToProjectLnk', function (e) {
        //add the video to the project resources
        ProjectManager.updateProjectProp('resources', $(this).context.dataset);
        $(this).text('Added to Project Resources');
    });

    //when user clicks a section link in Project Page
    $('#projectPage>header nav a').click(function (e) {
        ProjectManager.controller.changeView($(this).data('view'), $(this));
    });
});
