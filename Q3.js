function f() {
    var sel = document.getElementById("country").value;
    var ans = "Capital: ";

    document.getElementById("output").innerHTML = "";
    document.getElementById("data1").innerHTML = "";
    document.getElementById("data2").innerHTML = "";
    document.getElementById("data3").innerHTML = "";
    document.getElementById("data4").innerHTML = "";
    document.getElementById("data5").innerHTML = "";

    var URLs = {
        "NGDP_RPCH": "https://www.imf.org/external/datamapper/api/v1/NGDP_RPCH/",
        "NGDPDPC": "https://www.imf.org/external/datamapper/api/v1/NGDPDPC/",
        "PCPIPCH": "https://www.imf.org/external/datamapper/api/v1/PCPIPCH/",
        "LP": "https://www.imf.org/external/datamapper/api/v1/LP/",
        "BCA": "https://www.imf.org/external/datamapper/api/v1/BCA/"
        
    };

    var code;
    if (sel === "India") {
        ans += "Delhi";
        document.body.style.backgroundImage = 'url("delhi.jpg")';
        code = "IND";
    } 
    else if (sel === "Morocco") {
        ans += "Rabat";
        document.body.style.backgroundImage = 'url("rabat.jpg")';
        code = "MAR";
    } 
    else if (sel === "Philippines") {
        ans += "Manila";
        document.body.style.backgroundImage = 'url("manila.jpg")';
        code = "PHL";
    } 
    else if (sel === "China") {
        ans += "Beijing";
        document.body.style.backgroundImage = 'url("beijing.jpg")';
        code = "CHN";
    } 
    else if (sel === "Japan") {
        ans += "Tokyo";
        document.body.style.backgroundImage = 'url("tokyo.jpg")';
        code = "JPN";
    }

    fetchGDP(URLs["NGDP_RPCH"] + code, code);
    fetchPerCapitaGDP(URLs["NGDPDPC"] + code, code);
    fetchInflation(URLs["PCPIPCH"] + code, code);
    fetchPopulation(URLs["LP"] + code, code);
    fetchDebt(URLs["BCA"] + code, code);

    document.getElementById("output").innerHTML = ans;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.transition = 'background-image 0.2s';

}

function fetchGDP(url, code) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                const valueGDP = data.values["NGDP_RPCH"] && data.values["NGDP_RPCH"][code];
                document.getElementById("data1").innerHTML = valueGDP ? "Current GDP: " + valueGDP["2024"] : "GDP data not available";
            } 
            else {
                console.error('Error fetching GDP data:', xhr.status, xhr.statusText);
                document.getElementById("data1").innerHTML = "Error fetching GDP data.";
            }
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
        document.getElementById("data1").innerHTML = "Request failed.";
    };

    xhr.send();
}

function fetchPerCapitaGDP(url, code) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                const percapitaGDP = data.values["NGDPDPC"] && data.values["NGDPDPC"][code];
                document.getElementById("data2").innerHTML = percapitaGDP ? "Current Per Capita GDP: " + percapitaGDP["2024"] : "Per Capita GDP data not available";
            } else {
                console.error('Error fetching Per Capita GDP data:', xhr.status, xhr.statusText);
                document.getElementById("data2").innerHTML = "Error fetching Per Capita GDP data.";
            }
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
        document.getElementById("data2").innerHTML = "Request failed.";
    };

    xhr.send();
}

function fetchInflation(url, code) {
    var xhr = new XMLHttpRequest();
    console.log(url);
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                const inflation = data.values["PCPIPCH"] && data.values["PCPIPCH"][code];
                document.getElementById("data3").innerHTML = inflation ? "Current Inflation(avg consumer prices): " + inflation["2024"] : "Inflation data not available";
            } else {
                console.error('Error fetching Inflation data:', xhr.status, xhr.statusText);
                document.getElementById("data3").innerHTML = "Error fetching Inflation data.";
            }
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
        document.getElementById("data3").innerHTML = "Request failed.";
    };

    xhr.send();
}

function fetchPopulation(url, code) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                const population = data.values["LP"] && data.values["LP"][code];
                document.getElementById("data4").innerHTML = population ? "Current Population: " + population["2024"] : "Population data not available";
            } else {
                console.error('Error fetching Population data:', xhr.status, xhr.statusText);
                document.getElementById("data4").innerHTML = "Error fetching Population data.";
            }
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
        document.getElementById("data4").innerHTML = "Request failed.";
    };

    xhr.send();
}

function fetchDebt(url, code) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                const debt = data.values["BCA"] && data.values["BCA"][code];
                //(Export-Import) earnings
                document.getElementById("data5").innerHTML = debt ? "Current account balance($): " + debt["2024"] : "Population data not available";
            } else {
                console.error('Error fetching Debt data:', xhr.status, xhr.statusText);
                document.getElementById("data5").innerHTML = "Error fetching Debt data.";
            }
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
        document.getElementById("data4").innerHTML = "Request failed.";
    };

    xhr.send();
}
