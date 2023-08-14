// collecting all div and li object

let main_div = document.getElementById("card");
let resp_div_1 = document.getElementById("resp_div_1");
let resp_div_2 = document.getElementById("resp_div_2");
let resp_div_3 = document.getElementById("resp_div_3");
let resp_div_4 = document.getElementById("resp_div_4");
let div_1 = document.getElementById("div_1");
let div_2 = document.getElementById("div_2");
let div_3 = document.getElementById("div_3");
let div_4 = document.getElementById("div_4");

function get_date(date){
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let formattedDate = dd + '-' + mm + '-' + yyyy
    return formattedDate;
}

function splittor(value, sign) {
    return value.split(sign)
}

async function fetchData(division){
    let response = await fetch("https://codeforces.com/api/contest.list")
    let data = await response.json();
    const today = new Date();
    let formatted_todate = get_date(today);
    let result = data["result"]
    let htmlStr = '<ul style="background-color:aliceblue;">'
    let count = 1;
    for(let res = 0; res < result.length; res++){
        let name = result[res]["name"];
        let divStr = "Div. " + division;
        if (name.includes(divStr)){
            let startDate = new Date(result[res]["startTimeSeconds"] * 1000);
            let name = "(" + count + ") " + result[res]["name"]; 
            let formatted_date = get_date(startDate);
            if (formatted_date === formatted_todate){
                htmlStr += '<li style="padding:10px 10px 10px 10px; width:800px;display:flex;"><a href="https://codeforces.com/contest/' + result[res]["id"] + '" id="contest_' + result[res]["id"] + '" target="_blank" rel="noopener noreferrer">' + name + "</a></li>";
                count ++;
            }
        }
    }
    
    if (count === 1) htmlStr += '<h2 style="diplay:flex; width:300px;">No Contest Found!</h2>'
    htmlStr += '</ul>'
    return htmlStr

}

document.addEventListener("click", function(e){

    let idx = e.target.id;
    let division = splittor(idx, "_")[1];
    let idPrefix = splittor(idx, "_")[0];
    if (idPrefix !== "contest" && typeof division !== "undefined" && division !== null){
        main_div.style.display = "none";
        let newStr = fetchData(division);
        newStr.then((value) => {
            if (division === 1){
                resp_div_1.style.display = "block";
                resp_div_1.hidden = false;
                resp_div_1.innerHTML += value; 
            } else if(division === 2){
                resp_div_2.style.display = "block";
                resp_div_2.hidden = false;
                resp_div_2.innerHTML += value;
            } else if(division === 3){
                resp_div_3.style.display = "block";
                resp_div_3.hidden = false;
                resp_div_3.innerHTML += value;
            } else {
                resp_div_4.style.display = "block";
                resp_div_4.hidden = false;
                resp_div_4.innerHTML += value;
            }
        });
    }
});