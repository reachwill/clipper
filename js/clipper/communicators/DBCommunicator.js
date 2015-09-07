var DBCommunicator = {
    getProjectData: function (projectId) {
        console.log('AJAX call to get Project data here')
            //get the data from db

        //on success change view

        //change to project view -- move this to AJAX success call back
        PageNavigator.changePage('projectPage', $(this));
        //reset sub nav in project page to colections view
        ProjectManager.controller.changeView('collectionsSection', $('a[data-view=collectionsSection]'));

        //setActiveProject
        ProjectManager.setActiveProject(projectId)
    }
}
