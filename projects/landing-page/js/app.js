/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sectionList = document.querySelectorAll('section');
const mainElement = document.querySelector('main');
const observerConfig = { attributes: false, childList: true, subtree: false };

/**
 * End Global Variables
 * Start Main Functions
 * 
*/

const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
            fillUnorderedList();
        }
    }
};

const observer = new MutationObserver(callback);

observer.observe(mainElement, observerConfig);

function elementClosestToTheTop(){
    let smallestDistance = null;
    let closestSection;
    for(const sect of sectionList){
        let distance = sect.getBoundingClientRect().top;
        if(smallestDistance == null){
            smallestDistance = distance;
            closestSection = sect;
        } 
        else if(Math.abs(distance) < Math.abs(smallestDistance)){
            smallestDistance = distance;
            closestSection = sect;
        } 
    }
    return closestSection;
}

function addSection(){
    const section = document.createElement('section');
    const sectionNumber = sectionList.length + 1;
    section.id = `section${sectionNumber}`;
    section.setAttribute('data-nav', `Section ${sectionNumber}`);
    mainElement.appendChild(section);
}

function removeSection(){
    mainElement.removeChild(mainElement.lastElementChild);
}

function fillUnorderedList(){
    sectionList = document.querySelectorAll('section');
    const navList = document.querySelector('#navbar__list');
    navList.innerHTML = '';
    for(const sect of sectionList){
        let listItem = document.createElement('li');
        listItem.textContent = sect.dataset.nav;
        listItem.className = 'menu__link';
        navList.appendChild(listItem);
        listItem.addEventListener('click', function(){
            sect.scrollIntoView({behavior: 'smooth'});
        });
    }
}

function toggleActiveSection(){
    for(const sect of sectionList){
        sect.classList.remove('active-section');
    }
    const activeSection = elementClosestToTheTop();
    activeSection.classList.add('active-section');
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
document.addEventListener('scroll', toggleActiveSection);

document.addEventListener('DOMContentLoaded', fillUnorderedList);
