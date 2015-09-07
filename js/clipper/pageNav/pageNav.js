$(document).ready(function () {
    //hide all pages except dashboardPage at start up
    $('section.page').not('#dashboardPage').hide();

    //nav element event handlers

    //when user clicks to open a project in the projects dashboard
    $('#existingProjectsPane').on('click', '.openProjectLnk', function (e) {

        var projectId = ($(this).data('projectid'));
        //invoke call to go get the project data from the database
        DBCommunicator.getProjectData(projectId);

    });

    //when user clicks dashboard link in main page header
    $('.projectDashboardLnk').click(function (e) {
        PageNavigator.changePage('dashboardPage', $(this));

    });


});

var PageNavigator = {
    changePage: function (pageTitle, linkClicked) {
        var projectId = (linkClicked.data('projectid'))
        $('section.page').hide();
        $('#' + pageTitle).fadeIn(500);
        if (pageTitle == 'projectPage') {
            $('#projectTitle').text(ProjectManager.activeProject.projectTitle);
        }
    }
}
