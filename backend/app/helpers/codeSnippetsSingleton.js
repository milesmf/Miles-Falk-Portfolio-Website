//CORE
const { readFile } = require('fs/promises');

//
class CodeSnippetSingleton {

    //Hold all code snippets
    code_snippets;

    constructor() {
        (async () => {
            try {
                //Parse code snippets
                this.code_snippets = JSON.parse(await readFile(`${__dirname}/../consts/codeSnippets.json`, "utf8"));
            } catch (error) {
                throw new Error(error);
            }
        })();
    }

    getCodeSnippetsByPage(category, page) {
        //Parse from string to number
        page = +page;

        if (!!(category in this.code_snippets)) {
            const totalPages = Math.ceil(this.code_snippets[category]['links'].length / 4);

            return {
                title: this.code_snippets[category]['title'],
                links: this.code_snippets[category]['links'].slice(page - 1, 4),
                currentPage: page,
                totalPages,
                previousPage: page > 1 ? page - 1 : 1,
                nextPage: page < totalPages ? page + 1 : page
            };
        } else {
            throw new Error("Key doesn't exist in code snippets!");
        }
    }

}

module.exports = new CodeSnippetSingleton();