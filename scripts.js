import{HOUSES_PER_PAGE, ownerS, availableHouses,  houses} from './data.js'


let matches = houses
let page = 1;

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}
const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector('[form="settings"]')
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector("[data-settings-overlay]").style.display = "none";
      }
} )


// Show more button
const showMoreButton = document.querySelector('[data-list-button]')
let numOfHouses = houses.length -36
showMoreButton.innerHTML =  `Show more (${numOfHouses})`
if(showMoreButton.innerHTML === `Show more (${-12})`){
showMoreButton.innerHTML =  `Show more (${0})`
showMoreButton.disabled = true
}
showMoreButton.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
    startIndex += 36;
    endIndex += 36;
    numOfHouses -= 36;
    let numOfHouses1 = numOfHouses
    showMoreButton.innerHTML =  `Show more (${numOfHouses1})`
    const startIndex1 = startIndex
    const endIndex1 = endIndex
    const extracted = houses.slice(startIndex1, endIndex1)
for (const {owner ,image, address, id , description, published} of extracted) {
     const preview = document.createElement('button')
     preview.className = 'preview'
     preview.dataset.id = id
     preview.dataset.address = address
     preview.dataset.image = image
     preview.dataset.subtitle = `${owners[owner]} (${(new Date(built)).getFullYear()})`
     preview.dataset.description = description
     // preview.dataset.genre = genres
     preview.innerHTML= /*html*/`
     <div class="child" >
     <image class='preview__image' src="${image}" alt="book pic"}/>
     </div>
     <div class='preview__info'>
     <dt class='preview__address]'>${address}<dt>
     <dt class='preview__owner'> By ${owners[owner]}</dt>
     </div>`
     fragment.appendChild(preview)
     }
 const booklist = document.querySelector('[data-list-items]')
 booklist.appendChild(fragment)
})
oooo
//Settings Button
const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})

//Search button
const searchbutton = document.querySelector("[data-header-search]");
searchbutton.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "block";
})
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "none";
})

//filtering books by author so that the user can find books to read by authors
const ownerFragment = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Land Owners';
ownerFragment.appendChild(element);
for (let [id, name] of Object.entries(owners)) {
  const element = document.createElement('option');
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  ownerFragment.appendChild(element);
}
document.querySelector('[data-search-owners]').appendChild(ownerFragment);

//filtering books by author so that the user can find books to read in genres
const houseTypesFragment = document.createDocumentFragment();
let secondElement = document.createElement('option');
secondElement.value = 'any';
secondElement.innerText = 'Types of Houses';
houseTypesFragment.appendChild(secondElement);
for (let [id, name] of Object.entries(houseType)) {
  const element = document.createElement('option');
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  houseTypesFragment.appendChild(element);
}
document.querySelector('[data-search-houseTypes]').appendChild(houseTypesFragment);

//filtering books by name so that the user can find a specific book
const searchFilter = document.querySelector('[data-search-form]')
searchFilter.addEventListener('subSt', (event)=>{
    event.preventDefault();
   document.querySelector('[data-list-items]').style.display = 'none'
   document.querySelector('[data-list-message]').innerHTML = ''
    const searchformData = new FormData(event.target)
    const searchAddress = searchformData.get('Address');
    const searchHouseType = searchformData.get('houseType');
    const searchowner = searchformData.get('owner');
const filteredHouses = [];
for (let i = 0; i < houses.length; i++) {
  const house = houses[i];
  if (searchHouseType === 'any' && searchOwner === 'any') {
   if (book.address.toLowerCase().includes(searchAddress.toLowerCase())){
    filteredHouses.push(house);
   }
  }
  if (searchHouseType === 'any') {
    if (house.address.toLowerCase().includes(searchAddress.toLowerCase()) && book.owner === searchOwner){
     filteredHouses.push(house);
    }
   }
   if (searchAddress === '') {
    if (house.owner === searchOwner && house.houseType.includes(searchHouseType)){
     filteredHouses.push(house);
    }
   }
   if (searchAddress === '' && searchOwner === 'any' ) {
    if (house.houseType.includes(searchHouseType)){
     filteredHouses.push(house);
    }
   }
   if (filteredHouses.length > 0){
    document.querySelector('[data-list-message]').innerText = ''
    document.querySelector('[data-list-button]').disabled = true
    document.querySelector('[data-list-message]').style.marginTop = '-125px';
   } else{
    document.querySelector('[data-list-message]').innerText = 'No results found. Your filters might be too narrow.'
    document.querySelector('[data-list-button]').disabled = true
   }
}

// Previewing the Houses

document.querySelector('[class="list__message"]').style.display = 'block'
console.log(filteredHousess);
const fragment2 = document.createDocumentFragment()
    for (const {owner ,image, address, id , description, built} of filteredHouses) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.address = address
        preview.dataset.image = image
        preview.dataset.subtitle = `${owners[owner]} (${(new Date(built)).getFullYear()})`
        preview.dataset.description = description
        // preview.dataset.houses = houses
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="house pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__adderess'>${address}<dt>
        <dt class='preview__owner'> By ${owners[owner]}</dt>
        </div>`
        fragment2.appendChild(preview)
        }
    const booklist2 = document.querySelector('[class="list__message"]')
    booklist2.append(fragment2)
        document.querySelector('[data-search-form]').reset()
        document.querySelector("[data-search-overlay]").style.display = "none";
    })
    

let startIndex = 0;
let endIndex = 36;
const secondFragment = document.createDocumentFragment()
const secondExtracted = houses.slice(startIndex, endIndex)
    for (const {owner ,image, address, id , description, built} of secondExtracted) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.address = address
        preview.dataset.image = image
        preview.dataset.subtitle = `${owners[owner]} (${(new Date(built)).getFullYear()})`
        preview.dataset.description = description

        // preview.dataset.genre = genres
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="house pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__address'>${address}<dt>
        <dt class='preview__owner'> By ${owners[owner]}</dt>
        </div>`
        secondFragment.appendChild(preview)
        }
const houselist = document.querySelector('[data-list-items]')
houselist.appendChild(secondFragment)


// when the user clicks on book details
const detailsToggle = (event) => {
    const overlay1 = document.querySelector('[data-list-active]');
    const address = document.querySelector('[data-list-address]')
    const subtitle = document.querySelector('[data-list-subtitle]')
 const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')
    event.target.dataset.id ? overlay1.style.display = "block" : undefined;
    event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.address ? title.innerHTML = event.target.dataset.address : undefined;
    event.target.dataset.image ? image1.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? imageblur.setAttribute ('src', event.target.dataset.image) : undefined;
};
const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})
const bookclick = document.querySelector('[data-list-items]')
bookclick.addEventListener('click', detailsToggle)