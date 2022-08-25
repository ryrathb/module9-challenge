function readmeGenerator(answers, userInfo) {

    let draftTOC = `## Table of Contents`;

    if (answers.installation !== '') { draftTOC += `* [Contrinuting](#contributing)` };

    if (answers.usage !== '') { draftToC += `* [Usage](#usage)` };
  
    if (answers.contributing !== '') { draftToC += `* [Contributing](#contributing)` };
  
    if (answers.tests !== '') { draftToC += `* [Tests](#tests)` };



    let draftreadME = `# ${answers.title}
    
    ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${answers.username}/${answers.repo}?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${answers.username}/${answers.repo}?style=flat&logo=appveyor) 
    
    Check out the badges hosted by [sheilds.io](https://shields.io/).

    ## Description

    *What, why, and how:*

    ${answers.description}

    `

    draftreadME += draftTOC;

    draftreadME += `* [License](#license)`;

    if (answers.installation !== '') {

        draftreadME += 
        `
        ## Installation 

        *Steps required to install project and how to get the development environment running:*

        ${answers.installation}`
    };

    if (answers.usage !== '') {

        draftreadME += 

        `
        
        ## Contributing

        *If you would like to contribute it, you can follow these guidelines for how to do so.*

        ${answers.contributing}`
    };


    if (answers.tests !== '') {

        draftreadME +=

        `
        
        ## Tests

        *Tests for application and how to run them:*

        ${answers.tests}`
    };

    draftreadME +=
    `
    
    ## License

    ${answers.license}
    `;


    let draftDeveloper = 
    `
    ---

    ## Questions?

    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" width="40% />

    For any questions, please contact me with the information below:

    GitHub: [@${userInfo.login}](${userInfo.url})
    `;


    if (userInfo.email !== null) {

        draftDeveloper +=
        `
        
        Email: ${userInfo.email}
        
        `
    };

    draftreadME += draftDeveloper;

    return draftreadME;

}

module.exports = readmeGenerator;
