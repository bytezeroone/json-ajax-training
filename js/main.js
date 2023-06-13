let animalContainer = document.getElementById('animal-info');
let btn = document.getElementById('btn');
let ourData = ''
let pageCounter = 1;

btn.addEventListener('click', function() {
    let ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', `https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`);
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            ourData = JSON.parse(ourRequest.responseText);
            renderHTML();
        } else {
            console.log("We connected to the server, but it returned an error")
        }
        
    };
    
    ourRequest.onerror = function () {
        console.log("Connection error");
    }
    
    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3) {
        document.querySelector('#btn')
            .classList.add('hide');
    }
    
});

function renderHTML(data) {

    let htmlString = '';
    ourData.forEach((data) => {
        htmlString += `
        <p>${data.name} is a ${data.species} that likes to eat 
            `;
        data.foods.likes.forEach((like, index, i) => {
            if (index === i.length -1) {
                htmlString += `and ${like} `;
            } else {
                htmlString += `${like} `;
                
            }
        });
        data.foods.dislikes.forEach((dislike, index, i) => {
            if (index === i.length -1 && i.length -1 > 0) {
                htmlString += ` ${dislike}`;
            } else if (index !== i.length -1 && i.length -1 > 0) {
                htmlString += `and dislikes ${dislike} and `;
            } else {
                htmlString += `and dislikes ${dislike}`;
            }
        });
        `</p>
              
    `;
        
    });
    
    // for (i = 0; i < data.length; i++) {
    //     htmlString += "<p>" + data[i].name + " is a " + data[i].species + ".</p>"
    // }
    
    animalContainer.insertAdjacentHTML('beforeend', htmlString);
};
