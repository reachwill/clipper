$(document).ready(function () {



    View.init();
    View.updateExistingProjectsList();


    //collapse the collections panels
    $('#collectionsSection .panel .content').hide();
    $('#collectionsSection .panel h2').click(function () {
        var content = $(this).parent().find('.content');
        content.toggle();
    });


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
        ProjectManager.ejectActiveClip();
    });

    //when user clicks preview link in a search result or project resources
    $('#searchResults,#projectResourcesPanel').on('click', '.previewLnk', function (e) {
        e.preventDefault();
        var sourcetype = ($(this).data('sourcetype'))
        ClipperPlayer.play(sourcetype, $(this)); //do this media check at play()//
        ProjectManager.ejectActiveClip();
    });

    //when user clicks preview link in a search result or project resources
    $('#cliplistsSection').on('click', '.previewLnk', function (e) {
        e.preventDefault();
        var sourcetype = ($(this).data('sourcetype'));
        ProjectManager.setActiveClip($(this).data('clipid'));
        ClipperPlayer.play(sourcetype, $(this), true); //3rd param boolean clip = true

    });

    //when user clicks add to project link anywhere in interface
    $('#searchResults,#localFileSearch,#wellcomeFileSearch').on('click', '.addToProjectLnk', function (e) {
        e.preventDefault();
        //add the video to the project resources
        ProjectManager.updateProjectProp('resources', $(this).context.dataset);
        $(this).text('Added to Project Resources');
    });

    //when user clicks a section link in Project Page
    $('#projectPage>header nav a').click(function (e) {
        e.preventDefault();
        View.controller.changeView($(this).data('view'), $(this));
    });

    //when user clicks to preview a Wellcome video
    $('.wellcomeLink').click(function (e) {
        e.preventDefault();
        ClipperPlayer.play('remote', $(this));
        ProjectManager.ejectActiveClip();
    });

    //when user clicks to open clip props editor controls
    $('#createClipLnk').click(function (e) {
        e.preventDefault();
        View.showThing($('#clipPropsEditor'), 'slideDown');
        View.hideThing($('#createClipLnk'), 'sudden');
        ProjectManager.setActiveClip();
    });


    //when user clicks to open annotation editor
    $('#openAnnoEditorLnk').click(function (e) {
        e.preventDefault();
        View.showThing($('#annotationEditor'), 'fade');
        View.updateAnnoPane();
    });

    //when user clicks to save clip properties
    $('#saveClipLnk').click(function (e) {
        e.preventDefault();
        ProjectManager.updateClipProps();
        View.updateAnnoPane();
    });


    //when user clicks to close clip props editor controls (done button)
    $('#closeClipPropsLnk').click(function (e) {
        e.preventDefault();
        //clear ProjectManager.activeClip and clear form fields ready for another new clip
        ProjectManager.ejectActiveClip();
        ProjectManager.ejectActiveAnno();
    });

    //when user clicks to view saved annotations or create a new annotation in the annotation editor
    $('#showSavedAnnosLnk,#createAnnosLnk').click(function (e) {
        e.preventDefault();
        ProjectManager.ejectActiveAnno();
        View.controller.changeAnnoEditorView($(this).data('view'), $(this));
    });

    //when user clicks to view saved annotations in the annotation editor
    $('#showSavedAnnosLnk').click(function (e) {
        e.preventDefault();
        //clear current activeAnno in ProjectManager
        ProjectManager.ejectActiveAnno();
    });

    //when user clicks to create an annotation in the annotation editor
    $('#createAnnosLnk').click(function (e) {
        e.preventDefault();
        //ProjectManager.setActiveAnno();
    });

    $('#newAnnoLink').click(function (e) {
        e.preventDefault();
        //save text, time and anno id
        ProjectManager.ejectActiveAnno();
    });

    $('#saveAnnoLink').click(function (e) {
        e.preventDefault();
        View.setAnnoDefaultTime(); //default time displayed in annotation editor unless user sets it
        //save text, time and anno id
        ProjectManager.updateAnnoProps();

    });

    $('#setAnnoTimeLink').click(function (e) {
        e.preventDefault();
        //save text, time and anno id
        View.updateAnnoStartField();
        ProjectManager.updateAnnoTime();
    });

    //when user clicks add to project link anywhere in interface
    $('#savedAnnosPane').on('click', '.quickEditLnk', function (e) {
        e.preventDefault();
        var annoText = $(this).parent().find('.annoText');
        //check editMode of button
        //if !hasClass('editMode')
        if ($(this).hasClass('editMode')) {
            //set annotation to be editable and focus
            annoText.attr('contenteditable', 'false').focus();

            ProjectManager.setActiveAnno($(this).data('id'));
            ProjectManager.updateAnnoProps(annoText.text(), $(this).data('start'));

            //revert button to quick edit mode
            $(this).removeClass('editMode').text('Quick Edit');
        } else {
            //set annotation to be editable and focus
            annoText.attr('contenteditable', 'true').focus();
            //change button to saver
            $(this).addClass('editMode').text('Save Changes');
        }




    });




});
