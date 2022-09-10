/** Global Variables **/
const baseUrl = 'http://localhost:3000'
let items = [];

/** Node Getters */
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const recycleLink = () => document.getElementById('recycle');
const saleLink = () => document.getElementById('for-sale');
const itemDescription = () => document.getElementById('item-description');
const recycleOption = () => document.getElementById('item-option');
const brandOption = () => document.getElementById('brand-option');
const workingOption = () => document.getElementById('item-working');
const weight = () => document.getElementById('weight');


/** Event Listeners */
const attachHomePageLinkEvent = () => {
    homeLink().addEventListener('click', loadHome)
}
const attachRecycleLinkEvent = () => {
    recycleLink().addEventListener('click', loadRecycle)
}
const attachSaleLinkEvent = () => {
    saleLink().addEventListener('click', loadSale)
}

/** Event Handlers */

 const submitForm = event => {
    event.preventDefault();
  
    const jsonObject = {
        description: itemDescription().value,
        item: recycleOption().value,
        brand: brandOption().value,
        working: workingOption().value,
        weight: weight().value,
    };
    fetch(baseUrl + '/items', {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonObject)
    })
        .then(response => response.json())
        .then(data => {
          items.push(data)
          loadSale()
        })
}


const loadHome = () => {
    resetMainDiv();
    const h1 = document.createElement("h1")
    const p = document.createElement("p")

    h1.className = 'center-align'
    p.className = 'center-align'

    h1.innerText = 'Welcome to Terraforge'
    p.innerText = 'Welcome to Terraforge! We are a platform designed for users to easily recycle, bid, and get paid out on Electronic waste. E-waste is a massive issue, with over 50 million tons of electronic waste generated annually. Terraforge creates a one-stop shop for users to recycle or sell their waste, and receive payouts for doing so.'
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
}

const loadRecycle = event => {
    event.preventDefault();
    resetMainDiv();
    const h1 = createH1('Recycle')
    const form = document.createElement('form')
    const row1 = createRow();
    const row2 = createRow();
    const row3 = createRow();

    const div1 = createTextField('item-description','Describe the item you want to recycle', 's6');
    const div2 = createSelectField('item-option','s6','I want to recycle...','Item',["Laptop", "Smartphone", "Tablet"]);
    const div3 = createSelectField('brand-option','s6','Choose','Brand',["Apple", "Samsung", "Other"]);
    const div4 = createSelectField('item-working','s6','Choose','Does this item work?',["Yes", "No"]);
    const div5 = createTextField('weight','Approx. weight', 's6');

    const submit = document.createElement('input');
    submit.setAttribute('type','submit');
    submit.setAttribute('id', 'submit-form');
    submit.className = 'btn black';

    row1.appendChild(div1);

    row2.appendChild(div2);
    row2.appendChild(div3);

    row3.appendChild(div4);
    row3.appendChild(div5);

    form.appendChild(row1);
    form.appendChild(row2);
    form.appendChild(row3);
    form.appendChild(submit);
    

    mainDiv().appendChild(h1);
    mainDiv().appendChild(form);

    form.addEventListener('submit', submitForm);

    $(document).ready(function(){
        $('select').formSelect();
    });
}

const loadSale = event => {
    if(event) {
        event.preventDefault();
    }
    resetMainDiv()
    const h1 = document.createElement('h1')
    const div = document.createElement('div')
    
    h1.textContent = 'For Sale';


    div.className = 'collection';

    items.forEach(itemObj => {
        const a = document.createElement('a');
        a.className = 'collection-item';
        a.innerText = itemObj.description

        div.appendChild(a);
    })


    mainDiv().appendChild(h1);
    mainDiv().appendChild(div);
}
/** REQUESTS */

const loadItems = () => {
    fetch(baseUrl + '/items')
        .then(resp => resp.json())
        .then(data => {
            console.log(data, "data")
            items = data;
        })
}

/** NODE Creators */

const createRow = () => {
    const div = document.createElement('div')
    div.className = "row"
    return div;
}

const createH1 = text => {
    const h1 = document.createElement('h1')
    h1.innerText = text;
    return h1;
}

const createFormCol = colSize => {
    const div = document.createElement('div')
    div.className = 'input-field col ' + colSize;
    return div
}

const createTextField = (id, labelText, colSize) => {
    const div = createFormCol(colSize)
    const label = document.createElement('label')
    const input = document.createElement('input')

    input.setAttribute('type', 'text');
    input.setAttribute('id' , id);

    label.setAttribute('for', id);
    label.innerText = labelText;

    div.appendChild(input);
    div.appendChild(label);

    return div;
}

const createSelectField = (id, colSize, placeholder, labelText, options=[]) => {
    const div = createFormCol(colSize)
    const select = document.createElement('select');
    const option = document.createElement('option');
    const label = document.createElement('label');

    select.setAttribute('id', id);
    option.setAttribute('disabled', true);
    option.setAttribute('selected', true);
    option.value = '';
    option.innerText = placeholder
    label.setAttribute('id', id)
    label.innerText = labelText;

    select.appendChild(option);

    options.forEach( optionText => {
        const option = document.createElement('option')
        option.innerText = optionText;
        option.value = optionText;
        select.appendChild(option);
    })

    div.appendChild(select);
    div.appendChild(label);

    return div;
}
/** MISC */
const resetMainDiv = () => {
    mainDiv().innerHTML = ""
}

/** Startup */

document.addEventListener('DOMContentLoaded', () => {

})
loadItems();
loadHome();
attachHomePageLinkEvent();
attachRecycleLinkEvent();
attachSaleLinkEvent();

