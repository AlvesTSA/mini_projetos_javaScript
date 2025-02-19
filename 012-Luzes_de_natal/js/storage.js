"use strict";

const Storage = {
    getProjects() {
        return JSON.parse(localStorage.getItem('dbLightProject')) ?? [];
    },

    saveProjects(dbLightProject) {
        localStorage.setItem('dbLightProject', JSON.stringify(dbLightProject));
    },

    addProject(project) {
        const projects = this.getProjects();
        projects.push(project);
        this.saveProjects(projects);
    },

    updateDbProject(index, project) {
        const projects = this.getProjects();
        projects[index] = project;
        this.saveProjects(projects);
    },

    deleteDbProject(index) {
        const projects = this.getProjects();
        projects.splice(index, 1);
        this.saveProjects(projects);
    }
};

export default Storage;
