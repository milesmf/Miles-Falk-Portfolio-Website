//CORE
const { readFile } = require('fs/promises');

//
class ProjectsSingleton {

    //Hold all projects
    projects;

    constructor() {
        (async () => {
            try {
                //Parse projects
                this.projects = JSON.parse(await readFile(`${__dirname}/../../db/projects.json`, "utf8"));
            } catch (error) {
                throw new Error(error);
            }
        })();
    }

    get getProjects() {
        return this.projects;
    }
}

module.exports = new ProjectsSingleton();