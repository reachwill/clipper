$(document).ready(function () {


    //    $('#previewPane').css({
    //        position: 'absolute',
    //        maxWidth: '960px',
    //        width: '100%'
    //    });

    View.updateExistingProjectsList();
    //set up user initiated event handlers for all view elements

    //when user clicks to create a new project
    $('#createProjectBtn').click(function (e) {
        e.preventDefault();
        ProjectManager.createNewProject($('#newProjectFrm'));
    });

    //when user clicks to peform a youtube search request
    $('#youtubeSearchBtn').click(function (e) {
        e.preventDefault();
        YoutubeSearch.makeRequest();
    });

    //when user has browsed to a file on local system
    $('#localSearchInput').change(function (e) {
        e.preventDefault();
        ClipperPlayer.play('local', $(this));
        View.enableAddToProjectLink($(this));
    });

    //when user clicks preview link in a search result
    $('#searchResults,#projectResourcesPanel').on('click', '.previewLnk', function (e) {
        e.preventDefault();
        var sourcetype = ($(this).data('sourcetype'))
        ClipperPlayer.play(sourcetype, $(this)); //do this media check at play()//
    });

    //when user clicks add to project link anywhere in interface
    $('#searchResults,#localFileSearch').on('click', '.addToProjectLnk', function (e) {
        e.preventDefault();
        //add the video to the project resources
        ProjectManager.updateProjectProp('resources', $(this).context.dataset);
        $(this).text('Added to Project Resources');
    });

    //when user clicks a section link in Project Page
    $('#projectPage>header nav a').click(function (e) {
        e.preventDefault();
        ProjectManager.controller.changeView($(this).data('view'), $(this));
    });

    //when user clicks to preview a Wellcome video
    $('.wellcomeLink').click(function (e) {
        e.preventDefault();
        ClipperPlayer.play('remote', $(this));
    });

    //when user clicks to preview a Wellcome video
    $('#createClipLnk').click(function (e) {
        e.preventDefault();
        ProjectManager.createNewClip(0);
    });

});
