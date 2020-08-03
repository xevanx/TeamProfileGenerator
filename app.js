const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
​
const teamMembers = [];
const idArray = [];

function menu() {
    function createManager() {
        console.log("Put together your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Enter at least one character";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                validate: answer => {
                    const AnswerCor = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (AnswerCor) {
                        return true;
                    }
                    return "Enter a number greater than 0";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    const AnswerCor = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (AnswerCor) {
                        return true;
                    }
                    return "Enter a valid email address";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                validate: answer => {
                    const AnswerCor = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (AnswerCor) {
                        return true;
                    }
                    return "Enter a number greater than 0";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            newTeam();
        });
    }

    function newTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which profession would you like to add to your team?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memeberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Enter at least one character";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's id?",
                validate: answer => {
                    const AnswerCor = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (AnswerCor) {
                        if (idArray.includes(answer)) {
                            return "This id has already been taken. Please enter a different id";
                        } else {
                            return true;
                        }
                    }
                    return "Enter a number greater than 0";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
                validate: answer => {
                    const AnswerCor = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (AnswerCor) {
                        return true;
                    }
                    return "Enter a valid email address";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's Github username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Enter at least one character";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answer.engineerEmail, answer.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            fs.createReadStream();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Enter at least one character";
                }
            },
            {
                type: "input",
                name: "internid",
                message: "What is the intern's id?",
                validate: answer => {
                    const AnswerCor = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (AnswerCor) {
                        if (idArray.includes(answer)) {
                            return "This id is already taken. Please enter a different id";
                        } else {
                            return true;
                        }
                    }
                    return "Enter a number greater than 0";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
                validate: answer => {
                    const AnswerCor = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (AnswerCor) {
                        return true;
                    }
                    return "Enter a valid email address";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Enter at least one character";
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            newTeam();
        });
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    createManager();
}

menu();