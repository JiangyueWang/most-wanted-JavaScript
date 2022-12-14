/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            // alert(searchResults);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    // console.log(person)
    let personInfos = "";
    // let personInfo = `First Name: ${person.firstName}\n`;
    // personInfo += `Last Name: ${person.lastName}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    for (const key in person) {
        personInfos += `${key}: ${person[key]}\n`;
    }
    //console.log(personInfos);
    return personInfos;

}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????
/**
 * This function's purpose is to find selected person's Spouse information
 */
function findPersonSpouse(person, people) {
    const personSpouseId = person.currentSpouse;
    let personSpouseFullName = "";
    if (person.currentSpouse === null || person.currentSpouse === undefined) {
        personSpouseFullName = `${person.firstName} ${person.lastName} does have a Spouse`;
    } else {
        const personSpouseInfo = people.filter(function(person) {
            if(person.id === personSpouseId) {
                return true
            }
        })
        personSpouseFullName = `${person.firstName} ${person.lastName} currnet spouse: ${personSpouseInfo[0].firstName} ${personSpouseInfo[0].lastName}`
    }
    return personSpouseFullName;
}
/**
 * This function's purpose is to find selected person's parents information
 */
function findPersonParents(person, people) {
    const personParentsIds = person.parents;
    let personParentsFullNames = "";
    let personParentsInfo = [];
    
    if(personParentsIds[0] === undefined) {
        personParentsFullNames = "\nNo record of parents information"
    } else {
        for (let i = 0; i < personParentsIds.length; i++) {
            let personParent = people.filter(function(person) {
                if(person.id === personParentsIds[i]) {
                    return true;
                }
            })
            personParentsInfo = [...personParentsInfo, ...personParent];
        }
        for (let i = 0; i < personParentsInfo.length; i++) {
            personParentsFullNames += `${person.firstName} ${person.lastName} parenet ${i+1} full name: ${personParentsInfo[i].firstName} ${personParentsInfo[i].lastName} \n` 
        }
    }
    return personParentsFullNames;
}
/**
 * This function's purpose is to find selected person's siblings information
 */
function findPersonSiblings(person, people) {
    const personParents = person.parents;
    const personId = person.id;
    let personSiblingsInfo = [];
    let personSiblingsFullNames = "";
    if (personParents[0] === undefined) {
        personSiblingsFullNames = `${person.firstName} ${person.lastName} doesnt have any siblings`
    } else {
        for (let i = 0; i < personParents.length; i++) {
            let peopleWithSameParents = people.filter(function(person) {
                if(person.parents[i] === personParents[i] && person.id !== personId) {
                    return true;
                }
            })
            personSiblingsInfo = [...peopleWithSameParents];
        }
    }
    if(personSiblingsInfo[0] === undefined) {
        personSiblingsFullNames = `${person.firstName} ${person.lastName} doesnt have any siblings`
    } else {
        for (let i = 0; i < personSiblingsInfo.length; i++) {
        personSiblingsFullNames += `${person.firstName} ${person.lastName} sibling ${i+1} is ${personSiblingsInfo[i].firstName} ${personSiblingsInfo[i].lastName} \n`
        }
    }
    
    return personSiblingsFullNames;

}
/**
 * This function's purpose is to find selected person's family information, including the results from findPersonSpouse, findPersonParents and findPersonSiblings functions
 */
function findPersonFamily(person, people) {
    const personSpouse = findPersonSpouse(person, people);
    const personParent = findPersonParents(person, people);
    const personSibling = findPersonSiblings(person, people);
    const personFamily = personSpouse + "\n" + personParent + "\n" + personSibling;
    return personFamily;
}
/**
 * This function's purpose is to find selected person's Descendatns information
 */
function findPersonDescendants(person, people) {
    let personId = person.id;
    let personDescendantsFullNames = ""
    let personDescendant = people.filter(function(person) {
        if(person.parents.includes(personId)) {
            return true;
        }
    })
    if(personDescendant[0] === undefined) {
        personDescendantsFullNames = `${person.firstName} ${person.lastName} doesnt have any descendants`
    } else {
        for (let i = 0; i < personDescendant.length; i++) {
            personDescendantsFullNames += `${person.firstName} ${person.lastName} ${i+1} descendant: ${personDescendant[i].firstName} ${personDescendant[i].lastName} \n`
        }
    }
    return personDescendantsFullNames;    
}

function searchByTraits(people) {
    const searchType = promptFor(
        "enter 's' for single trait search or enter 'm' for multiple traits selection: ", singleOrMultiSearch
        ).toLocaleLowerCase()
    
    let searchResults = [];
    switch(searchType) {
        case "s":
            let singleTraitAndValueForSearch = prompt("Please enter the trait and value for search\ne.g., gender: female\nheight: 76")
            searchResults = searchBySingleTrait(singleTraitAndValueForSearch, people);
            break;
        case "m":
            let multiTraitsValueForSearch = prompt("Please enter multiple traits and associated value for search with 'and' between traits,\ne.g., gender: female and eyeColor: brown\nheight: 76 and gender: male\nup to a amximum of five criteria at once:");
            searchResults = searchByMultiTraits(multiTraitsValueForSearch, people);
            break;
        default:
            searchByTraits(people);
            break;

    }
    return searchResults;
}
function singleOrMultiSearch(input) {
    return input.toLowerCase() === "s" || input.toLowerCase() === "m";
}

function searchBySingleTrait(trait, people) {
    const traitForSearch = trait.split(": ")[0];
    let valueForTrait = ""
    if (traitForSearch === "id" || traitForSearch === "height" || traitForSearch === "weight" || traitForSearch === "currentSpouse") {
        valueForTrait = parseInt(trait.split(": ")[1]);
    } else {
        valueForTrait = trait.split(": ")[1];
    }
    const resultsArray = people.filter((people) => people[traitForSearch] === valueForTrait)

    let results = ""
    for (let i = 0; i < resultsArray.length; i++) {
        results += `press ${i} to view details of ${resultsArray[i].firstName} ${resultsArray[i].lastName}\n`
    }

    const userSelectedNum = parseInt(prompt(results));
    const userSelectPerson = people.filter((people) => people.id === resultsArray[userSelectedNum].id);
    return userSelectPerson;
    
}

function searchByMultiTraits(traits, people) {
    
    const traitAndValuePairs = traits.split(" and ");
    // console.log(traitAndValuePairs) //['gender: female', 'eyeColor: brown', 'occupation: programmer']
    let results = "";
    let resultsArray = people;
    let valueOfTraitSearch = "";

    if (traitAndValuePairs.length > 5) {
        results = "more than five criteria, failed search..."
    } else {
        for (let i = 0; i < traitAndValuePairs.length; i++) {
            const singleTraitForSearch = traitAndValuePairs[i].split(": ")[0];
            if (singleTraitForSearch === "id" || singleTraitForSearch === "height" || singleTraitForSearch === "weight" || singleTraitForSearch === "currentSpouse") {
                valueOfTraitSearch = parseInt(traitAndValuePairs[i].split(": ")[1]);
            } else {
                valueOfTraitSearch = traitAndValuePairs[i].split(": ")[1];
            }
            resultsArray = searchResultArray(resultsArray, singleTraitForSearch, valueOfTraitSearch);
        }
    }

    for (let i = 0; i < resultsArray.length; i++) {
        results += `press ${i} to view details of ${resultsArray[i].firstName} ${resultsArray[i].lastName}\n`
    }

    const userSelectedNum = parseInt(prompt(results));
    const userSelectPerson = people.filter((people) => people.id === resultsArray[userSelectedNum].id);
    return userSelectPerson;
}

function searchResultArray(array, trait, value) {
    const searchResult = array.filter(item =>  item[trait] === value)
    return searchResult;
}
