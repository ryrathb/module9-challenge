const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const getapi = require('./utilities/getapi.js');
const readmeGenerator = require('./utilities/readmeGenerator.js');

const questions = [
    {
        type: 'input',
        message: "What is your username on GitHub? (no @)",
        name: 'username',
        default: 'ryanrathbun-dev',
        validate: function (ans) {
            if (ans.length < 1) {
                return console.log('A valid GitHub username is needed');
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repository?",
        name: 'repository',
        default: 'README-generator',
        validate: function (ans) {
            if (ans.length < 1) {
                return console.log("A valid GitHub repository is required for a badge.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'description',
        default: 'Project Description',
        validate: function (ans) {
            if (ans.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "If applicable, describe the steps necessary to install your project for the Installation section.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Give instructions and examples of your project in use for the Usage section,",
        name: 'usage'
    },
    {
        type: 'input',
        message: "If applicable, provide guidelines so that other developers can add to your project,",
        name: 'guidelines'
    },
    {
        type: 'input',
        message: "If applicable, provides tests and instructions on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }
];

function writeFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err);
        }

        console.log("Success! You have generated a README.md file.")
    });
}

const wrfileAsync = util.promisify(writeFile);


async function init() {
    try {

        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("We appreciate your responses! Fetching your GitHub data next...");

        const userInfo = await getapi.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);

        console.log("Creating your README now...");
        const mockup = readmeGenerator(userResponses, userInfo);
        console.log(mockup);

        await wrfileAsync('ExampleREADME.md', mockup);
    }
    catch (error) {
        console.log(error);
    }
};

init();