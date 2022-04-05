let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {title, link, description} = result;
    // creating result element
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    // creating title element
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);

    // creating title break element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    // creating URL element
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    resultItemEl.appendChild(urlEl);

    // creating break element
    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl);

    // creating description element
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("line-description");
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    // let result = searchResults[0];
    spinnerEl.classList.toggle("d-none");
    for ( let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        console.log(searchInput);
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            console.log(jsonData);
            let {search_results} = jsonData;
            displayResults(search_results);
        });
    }
}

searchInputEl.addEventListener("keydown", searchWiki);