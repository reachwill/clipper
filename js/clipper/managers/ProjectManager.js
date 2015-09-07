ProjectManager = {

    activeProject: null,

    existingProjects: [
        {
            projectTitle: 'Ferraris',
            projectId: '1349308800000',
            projectDesc: 'As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.',
            projectResourceCount: 0,
            projectCliplistCount: 0,
            projectClipsCount: 0,
            resources: [],
            clips: [],
            cliplists: [{
                id: 1349308800000,
                title: 'Ferraris default cliplist',
                description: '',
                authors: [],
                parentProject: 1349308800000,
                clips: [],
                dateCreated: 'Mon Sep 07 2015 13:19:25 GMT+0100 (BST)',
                lastModified: 'Mon Sep 07 2015 13:19:25 GMT+0100 (BST)'
            }],
            authors: [], //list of wp user names
            owner: [],
            dateCreated: null,
            lastModified: null,
            tags: []
        }

    ],

    createNewClip: function (cliplistIndex) {

        var self = ProjectManager;
        var d = new Date();
        var uniqueId = d.getTime();
        self.activeProject.cliplists[cliplistIndex].clips.push({
            id: uniqueId,
            title: 'Untitled Clip',
            description: '',
            authors: [],
            parentProject: uniqueId,
            clips: [],
            dateCreated: d,
            lastModified: d,
            resource: ClipperPlayer.getCurrentVideo().videoURL,
            start: ClipperPlayer.getClipStart(),
            end: ClipperPlayer.getClipEnd(),
            thumbnail: ClipperPlayer.getCurrentVideo().thumbnail
        });
        View.updateClipsInClipList(cliplistIndex);
    },

    createNewProject: function (form) {
        var self = ProjectManager;
        var d = new Date();
        var uniqueId = d.getTime();
        self.existingProjects.push({
            projectTitle: form.find('#newProjectTitle').val(),
            projectId: uniqueId,
            projectDesc: 'Click to add description.',
            projectResourceCount: 0,
            projectCliplistCount: 0,
            projectClipsCount: 0,
            resources: [],
            clips: [],
            cliplists: [{
                id: uniqueId,
                title: form.find('#newProjectTitle').val() + ' default cliplist',
                description: '',
                authors: [],
                parentProject: uniqueId,
                clips: [],
                dateCreated: d,
                lastModified: d
            }],
            authors: [], //list of wp user names
            owner: [],
            dateCreated: null,
            lastModified: null,
            tags: []
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
        View.updateCliplistList();



    },

    updateProjectProp: function (prop, value) {
        var self = ProjectManager;
        //check if prop to be updated is array or string
        //if prop is array push value
        if (Object.prototype.toString.call(self.activeProject[prop]) === '[object Array]') {
            //console.log(value)
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
