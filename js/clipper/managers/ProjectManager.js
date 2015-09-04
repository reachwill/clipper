ProjectManager = {

    activeProject: {
        resources: [],
        cliplists: [],
        members: [],
        description: '',
        title: 'Untitled Project',
        id: null
    },

    setActiveProject: function (resources, cliplists, members, description, title, id) {
        var self = ProjectManager;
        //set default values for parameters
        resources = typeof resources !== 'undefined' ? resources : [];
        cliplists = typeof cliplists !== 'undefined' ? cliplists : [];
        members = typeof members !== 'undefined' ? members : [];
        description = typeof description !== 'undefined' ? description : '';
        title = typeof title !== 'undefined' ? title : 'Untitled Project';
        id = typeof id !== 'undefined' ? id : null;


        //apply project parameters to active project
        self.activeProject.resources = resources;
        self.activeProject.cliplists = cliplists;
        self.activeProject.members = members;
        self.activeProject.description = description;
        self.activeProject.title = title;
        self.activeProject.id = id;
    },

    updateProjectProp: function (prop, value) {
        var self = ProjectManager;
        if (Object.prototype.toString.call(self.activeProject[prop]) === '[object Array]') {
            self.activeProject[prop].push(value);
        } else {
            self.activeProject[prop] = value;
        }
        switch (prop) {
        case 'resources':
            View.updateResourceList();
            break;
        }
    },
    controller: {
        changeView: function (view, clicked) {
            $('#projectPage>header nav a').parent().removeClass('active');
            clicked.parent().addClass('active');
            $('#projectPage>section').hide();
            $('#' + view).fadeIn(500);
        }
    }

}

ProjectManager.setActiveProject();
ProjectManager.controller.changeView('collectionsSection');
//ProjectManager.updateProjectProp('resources', ['yehah']);
