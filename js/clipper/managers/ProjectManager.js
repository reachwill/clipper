ProjectManager = {

    activeProject: null,

    existingProjects: [
        {
            projectTitle: 'Default Project',
            projectId: '1349308800000',
            projectDesc: 'As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.',
            projectResourceCount: 0,
            projectCliplistCount: 0,
            projectClipsCount: 0,
            resources: [],
            clips: [],
            cliplists: []
        }

    ],

    createNewProject: function (form) {
        var self = ProjectManager;
        var d = new Date();

        self.existingProjects.push({
            projectTitle: form.find('#newProjectTitle').val(),
            projectId: d.getTime(),
            projectDesc: 'Click to add description.',
            projectResourceCount: 0,
            projectCliplistCount: 0,
            projectClipsCount: 0,
            resources: [],
            clips: [],
            cliplists: []
        });
        View.updateExistingProjectsList();
    },

    setActiveProject: function (projectId) {
        var self = ProjectManager;
        var numProjects = self.existingProjects.length;
        for (var i = 0; i < numProjects; i++) {
            if (self.existingProjects[i].projectId == projectId) {
                self.activeProject = self.existingProjects[i];
                break;
            }
        }

        //update the view based on project change
        View.updateResourceList();



    },

    updateProjectProp: function (prop, value) {
        var self = ProjectManager;
        //check if prop to be updated is array or string
        //if prop is array push value
        if (Object.prototype.toString.call(self.activeProject[prop]) === '[object Array]') {
            self.activeProject[prop].push(value);
        } else //if not array set value
        {
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
            $('#projectPage>header nav a').removeClass('active');
            clicked.addClass('active');
            $('#projectPage>section').hide();
            $('#' + view).fadeIn(500);
        }
    }

}

ProjectManager.controller.changeView('collectionsSection', $('a[data-view=collectionsSection]'));
