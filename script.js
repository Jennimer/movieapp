let addButton = document.querySelector("#sbutton");
let array = []; //array for checking movie id

function loadAndDisplayTheaterList() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        // If we are still loading...
        if (xmlhttp.readyState === 1) {
            document.getElementById("myDiv").innerHTML = "Wait while Im loading...";
        }
        // If everything is ok
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            // Instead of just placing the RAW XML content we need to parse it
            //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;

            //
            //  document.getElementById("myDiv").innerHTML = txt;
            var xmlDoc = xmlhttp.responseXML;
            // finding some tags from our variable containing XML

            var theather = xmlDoc.getElementsByTagName("Name");
            var id = xmlDoc.getElementsByTagName("ID");
            
            var txt = "";

            for (let i = 0; i < theather.length; i++) {
                var theat = theather[i].childNodes[0].nodeValue
                var tid = id[i].childNodes[0].nodeValue
                txt += "<option>" + theat + "</option>" //dropdown menu list is greated
                array.push({ theat: theat, tid: tid }); //and array

            }
            document.getElementById("area").innerHTML = txt; // we insert theather list in the dropdown
            //console.log(array);
        }
    }
}
function movieId() {

    var place = document.querySelector("#area").value;
    document.querySelector(".place").innerText = place;
    for (let i = 0; i < array.length; i++) {
        if (place === array[i].theat) {
            var theatherId = array[i].tid; //We look for the right movie id
            if (theatherId === "1029"){
                
                return;}
            console.log(theatherId);
            loadMovieInfo(theatherId);
            return;
        }

    }


    function loadMovieInfo() {
        var date = new Date();
        var month = date.getMonth() // Getting date for the request and firming it for right form
        if (month.length = 1) {
            month = "0" + month; 
        }
        var today = date.getDate() + "." + month + "." + date.getFullYear();
        //console.log(today)

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + theatherId + "&=" + today, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () { //request and searching a movies 
            // If we are still loading...
            if (xmlhttp.readyState === 1) {
                document.getElementById("myDiv").innerHTML = "Wait while Im loading...";
            }
            // If everything is ok
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
 
                var xmlDoc = xmlhttp.responseXML;
                //console.log(xmlDoc);
                // We find some tags from our variable containing XML
                var list = "";
                var image = xmlDoc.getElementsByTagName("EventSmallImagePortrait");
                var room = xmlDoc.getElementsByTagName("TheatreAndAuditorium");
                var movie = xmlDoc.getElementsByTagName("Title");
                var times = xmlDoc.getElementsByTagName("dttmShowStart");
                var language = xmlDoc.getElementsByTagName("PresentationMethodAndLanguage");
                for (let i = 0; i < movie.length; i++) { // Greating movie info div

                    list += `<div class="movieInfo"> `
                    list += `<div class="picture"><img src= ${image[i].childNodes[0].nodeValue} alt="movie image"></div>`
                    list += `<div class="movieInfoText">`
                    list += `<div class="room"> ${room[i].childNodes[0].nodeValue} </div>`
                    list += `<div class="movien"> ${movie[i].childNodes[0].nodeValue} </div>`
                    list += `<div class="times"> ${times[i].childNodes[0].nodeValue.slice(11,16)} </div>`
                    list += `<div class="language"> ${language[i].childNodes[0].nodeValue} </div>`
                    list += `</div></div> `

                    document.getElementById("movies").innerHTML = list; // and put it in the div
                }


            }


        }
    }
}

loadAndDisplayTheaterList(); //We Call the function which load the theatherlist
addButton.addEventListener("click", movieId); 



