/**
 *   @author Bates, Howard (hbates@northmen.org)
 *   @version 0.0.1
 *   @summary Code demonstration: Selection logic  :: created: 05.10.2017
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');

let continueResponse;
let custID, dogAge, dogWeight, serviceType, totalBill;
let dogName, dogBreed;

/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() {
    if (continueResponse !== 0 && continueResponse !== 1) {
        setContinueResponse();
    }
    if (continueResponse === 1) {
        setCustID();
        setDogName();
        setDogBreed();
        setDogAge();
        setDogWeight();
        setServiceType();
        setTotalBill();
        printTotalBill();
        setContinueResponse();
        return main(); //recursion
    }
    printGoodbye();
}

main();

/**
 * @method
 * @desc continueResponse mutator
 * @returns {method}
 */
function setContinueResponse() {
    if (continueResponse === 1 || continueResponse === 0) {
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        if (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = 1;
            return setContinueResponse();
        }
    } else {
        continueResponse = 1;
    }
}

/**
 * @method
 * @desc custID mutator
 * @returns {null}
 */
function setCustID() {
    custID = Math.floor((Math.random() * 20) + 1);  //Random number 1 - 20
}

/**
 * @method
 * @desc dogName mutator
 * @returns {null}
 */
function setDogName() {
    dogName = PROMPT.question(`\nPlease enter dog's name: `);
}

/**
 * @method
 * @desc dogBreed mutator
 * @returns {null}
 */
function setDogBreed() {
    dogBreed = PROMPT.question(`\nPlease enter dog's breed: `);
}

/**
 * @method
 * @desc dogAge mutator
 * @returns {method}
 */
function setDogAge() {
    const MAX_AGE = 30;
    dogAge = Number(PROMPT.question(`\nPlease enter dog's age: `));
    if (dogAge < 1 || dogAge > MAX_AGE) {
        console.log(`I'm sorry, that is an incorrect age. Please try again.`);
        return setDogAge();
    }
}

/**
 * @method
 * @desc dogWeight mutator
 * @returns {method}
 */
function setDogWeight() {
    const MAX_WEIGHT = 300;
    const MIN_WEIGHT = 3;
    dogWeight = Number(PROMPT.question(`\nPlease enter dog's weight: `));
    if (dogWeight < MIN_WEIGHT || dogWeight > MAX_WEIGHT) {
        console.log(`I'm sorry, that is an incorrect weight. Please try again.`);
        return setDogWeight();
    }
}

/**
 * @method
 * @desc serviceType mutator
 * @returns {method}
 */
function setServiceType() {
    const SERVICE_MULTIPLIER = 10;
    serviceType = Number(PROMPT.question(`\nPlease choose service type: 1 = Basic Groom, 2 = Deluxe Groom, 3 = Turbo Groom: `));
    serviceType *= SERVICE_MULTIPLIER;
    switch (serviceType) {
        case 10: console.log(`Wash & clip, got it!`);
            break;
        case 20: console.log(`Wash, clip, & nails, got it!`);
            break;
        case 30: console.log(`Wash, clip, nails, & flea/tick treatment, got it!`);
            break;
        default: console.log(`Incorrect choice, please try again!`);
            return setServiceType();
    }
}

/**
 * @method
 * @desc totalBill mutator
 * @returns {null}
 */
function setTotalBill() {
    totalBill = 0;
    const SMALL_DOG_FEE = 55,
        MEDIUM_DOG_FEE = 75,
        LARGE_DOG_FEE = 105,
        JUMBO_DOG_FEE = 125,
        SMALL_DOG_WEIGHT = 15,
        MEDIUM_DOG_WEIGHT = 30,
        LARGE_DOG_WEIGHT = 80;
    if (dogWeight > 0) {
        if (dogWeight > 0 && dogWeight < SMALL_DOG_WEIGHT) {
            totalBill = SMALL_DOG_FEE + dogAge + serviceType;
        } else if (dogWeight < MEDIUM_DOG_WEIGHT) {
            totalBill = MEDIUM_DOG_FEE + dogAge + serviceType;
        } else if (dogWeight < LARGE_DOG_WEIGHT) {
            totalBill = LARGE_DOG_FEE + dogAge + serviceType;
        } else {
            totalBill = JUMBO_DOG_FEE + dogAge + serviceType;
        }
    }
}

/**
 * @method
 * @desc Utility: Output results
 * @returns {null}
 */
function printTotalBill() {
    console.log(`\n\t${dogName}'s bill: \$${totalBill}. Customer#: ${custID}`);
}

/**
 * @method
 * @desc Utility: Output goodbye
 * @returns {null}
 */
function printGoodbye() {
    console.log(`\n\tGoodbye.`);
}

/*
 The 'Barksalona' pet grooming shop is in need of some new software. They have hired you to design a program to prompt
  customers for basic information about their dog (name, age, weight, breed) & service requested. It should auto-generate
  a random customer ID, calculate the grooming cost, then output the total bill. Additionally, it should prompt user to
  continue. The pricing structure is as follows:
  Base prices (dog age +):
    * Small dogs (3-15 pounds) = $55
    * Medium dogs (16-30 pounds) = $75
    * Large dogs (31-80 pounds) = $105
    * Jumbo dogs (> 80 pounds) = $125
  Service type added cost:
    * Basic = $10
    * Deluxe = $20
    * Turbo = $30

 Topics:  Selection logic ('if'/ 'else if' /'else', switch/case), recursion, Boolean, return, random, validation
 */