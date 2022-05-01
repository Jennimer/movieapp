let addButton = document.querySelector("#sbutton");
let array = []; //array for checking movie id

function loadInfo() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        // If we are still loading...
        if (xmlhttp.readyState === 1) {
            document.getElementById("myDiv").innerHTML = "Loading";
        }
        // If everything is ok
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            // Instead of just placing the RAW XML content we need to parse it
            //document.getElementById("myDiv").innerHTML = xmlhttp.responseText;

            //
            //  document.getElementById("myDiv").innerHTML = txt;
            var xmlDoc = xmlhttp.responseXML;
            // finding some tags from our variable containing XML
            console.log(xmlDoc);



            var theather = xmlDoc.getElementsByTagName("Name");
            var id = xmlDoc.getElementsByTagName("ID");

            var txt = "";

            for (let i = 0; i < theather.length; i++) {
                var theat = theather[i].childNodes[0].nodeValue
                var tid = id[i].childNodes[0].nodeValue
                txt += "<option>" + theat + "</option>" //dropdown menu list is greated
                array.push({ theat: theat, tid: tid }); //and push it in the array

            }
            document.getElementById("area").innerHTML = txt; // we insert theather list in the dropdown
            //console.log(array);



            var date = new Date();
            var today = date.toLocaleDateString();
            var tomorrow = date.toLocaleDateString(date.setDate(date.getDate() + 1));// Dates of this week
            var third = date.toLocaleDateString(date.setDate(date.getDate() + 1));
            var fourth = date.toLocaleDateString(date.setDate(date.getDate() + 1));
            var fifth = date.toLocaleDateString(date.setDate(date.getDate() + 1));
            var sixth = date.toLocaleDateString(date.setDate(date.getDate() + 1));
            var seventh = date.toLocaleDateString(date.setDate(date.getDate() + 1));
            var menu = "";
            menu += `<option> Tänään  ${today} </option>"` // dates dropdown
            menu += `<option> Huomenna  ${tomorrow} </option>"`
            menu += `<option>  ${third} </option>"`
            menu += `<option>  ${fourth} </option>"`
            menu += `<option>  ${fifth} </option>"`
            menu += `<option>  ${sixth} </option>"`
            menu += `<option>  ${seventh} </option>"`

            document.getElementById("day").innerHTML = menu;
            //console.log(today)

        }

    }
}









function movieSearch() {


    var place = document.querySelector("#area").value;

    document.querySelector(".place").innerText = place;
    for (let i = 0; i < array.length; i++) {
        if (place === array[i].theat) {
            var theatherId = array[i].tid; //We check the right movie id
            if (theatherId === "1029") {
                return;
            }
            console.log(theatherId);
            loadMovieInfo(theatherId);
            return;
        }
    }




    function loadMovieInfo() {

        var date = document.querySelector("#day").value;

        console.log(date[0]);
        if (date[0] === "T" || date[0] === "H") {
            dateArray = date.split(" ");
            date = dateArray[1];
            console.log(date);
        }

        if (date[1] == ".") {
            date = 0 + date
        }
        if (date.lenght = 9) {
            date = date.slice(0, 3) + "0" + date.slice(3, 9);

            console.log(date);
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + theatherId + "&=" + date, true);
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
                for (let i = 0; i < movie.length; i++) { // We create movie info text 

                    list += `<div class="movieInfo"> `
                    list += `<div class="picture"><img src= ${image[i].childNodes[0].nodeValue} alt="movie image"></div>`
                    list += `<div class="movieInfoText">`
                    list += `<div class="room"> ${room[i].childNodes[0].nodeValue} </div>`
                    list += `<div class="movien"> ${movie[i].childNodes[0].nodeValue} </div>`
                    list += `<div class="times"> ${times[i].childNodes[0].nodeValue.slice(11, 16)} </div>`
                    list += `<div class="language"> ${language[i].childNodes[0].nodeValue} </div>`
                    list += `</div></div> `

                    document.getElementById("movies").innerHTML = list; // and put it in the div
                }
            }
        }

    }

}



loadInfo(); //We Call the function which load the theatherlist
addButton.addEventListener("click", movieSearch);




