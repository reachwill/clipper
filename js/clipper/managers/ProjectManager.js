ProjectManager = {

    activeProject: null,

    activeClip: null,

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
        //set up uniqueId
        var d = new Date();
        var uniqueId = d.getTime();

        //prepare sourcetype (set to blob if its a local file)
        var sourceType = ClipperPlayer.currentVideo.sourceType;
        if (sourceType == 'local') {
            sourceType = 'blob';
        }

        //create a new clip object
        var clip = {
            id: uniqueId,
            title: 'Untitled Clip',
            description: '',
            authors: [],
            parentProject: self.activeProject.projectId,
            parentCliplist: 0,
            clips: [],
            dateCreated: d,
            lastModified: d,
            resource: ClipperPlayer.getCurrentVideo().videoURL,
            sourceType: sourceType,
            start: ClipperPlayer.getClipStart(),
            end: ClipperPlayer.getClipEnd(),
            thumbnail: ClipperPlayer.getCurrentVideo().thumbnail,
            annotations: []
        };
        //add new clip to top of cliplist
        self.activeProject.cliplists[cliplistIndex].clips.unshift(clip);
        //update user view
        View.updateClipsInClipList(cliplistIndex);
        //register new clip as current active clip for editing
        self.activeClip = clip;
    },

    createNewProject: function (form) {
        var self = ProjectManager;
        var d = new Date();
        var uniqueId = d.getTime();
        self.existingProjects.unshift({
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

    setActiveClip: function (clipId) {
        var self = ProjectManager;
        if (clipId == null || clipId == undefined) {
            self.createNewClip(0);
        } else {
            //find the clip in cliplists
            var found = false;
            var numCliplists = self.activeProject.cliplists.length;
            for (var i = 0; i < numCliplists; i++) {
                var numClips = self.activeProject.cliplists[i].clips.length;
                for (var z = 0; z < numClips; z++) {
                    if (self.activeProject.cliplists[i].clips[z].id == clipId) {
                        found = true;
                        self.activeClip = self.activeProject.cliplists[i].clips[z];
                        break;
                    }
                }
            }
        }

    },

    ejectActiveClip: function () {
        var self = ProjectManager;
        self.activeClip = null;
        //hide clipProps
        View.hideThing($('#clipPropsEditor'), 'slideUp');
        //hide annotationProps
        View.hideThing($('#annotationEditor'), 'fade');
        //show create clip button
        View.showThing($('#createClipLnk'), 'fade');
        //empty clip editor fields
        View.clearFields($('#clipPropsEditor'));
    },

    updateClipProps: function () {
        var self = ProjectManager;
        var clip = self.activeClip;
        clip.title = $('#clipTitleTxt').val();
        clip.description = $('#clipDescTxt').val();
        clip.start = ClipperPlayer.getClipStart();
        clip.end = ClipperPlayer.getClipEnd();
        clip.lastModified = new Date();
        //update cliplists user view
        View.updateClipsInClipList(0);
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
    }

}
