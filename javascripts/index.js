/** Global Variables **/

/** Node Getters */
const mainDiv = () => document.getElementById('main');
const HomeLink = () => document.getElementById('home-link')
/** Event Listeners */
const attachHomePageLinkEvent = () => {
    HomeLink().addEventListener('click', loadHome)
}

/** Event Handlers */
const loadHome = () => {
    resetMainDiv();
    const h1 = document.createElement("h1")
    const p = document.createElement("p")

    h1.className = 'center-align'
    p.className = 'center-align'

    h1.innerText = 'Welcome to Terraforge'
    p.innerText = 'Terraforge is helping people find ways to recycle their old electronics and connect users with like minded people along the way.'
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
}
/** MISC */
const resetMainDiv = () => {
    mainDiv().innerHTML = ""
}

/** Startup */

document.addEventListener('DOMContentLoaded', () => {

})
loadHome();
attachHomePageLinkEvent();
