var DBCommunicator = {
    getProjectData: function (projectId) {
        console.log('AJAX call to get Project data here')
            //get the data from db

        //on success change view
        //setActiveProject
        ProjectManager.setActiveProject(projectId)
            //change to project view -- move this to AJAX success call back
        PageNavigator.changePage('projectPage', $(this));
        //reset sub nav in project page to colections view
        View.controller.changeView('collectionsSection', $('a[data-view=collectionsSection]'));


    }
}
