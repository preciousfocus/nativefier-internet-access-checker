
var innerdiv = document.createElement('div');
innerdiv.style.textAlign = "right";
innerdiv.style.cursor = "pointer";
innerdiv.style.fontSize = "22px";
innerdiv.style.paddingRight = "10px";
innerdiv.id = "close-network-error-notification";
innerdiv.innerHTML = "&times;";

var errorText = document.createElement('div');
errorText.innerHTML = " <div style='margin-bottom:10px;' > Unable to connect. </div> <div style='margin-bottom:10px;'> Please check your Internet connection. </div> ";

var newdiv = document.createElement('div');
newdiv.id = "network-error-notification-area";
newdiv.style.background = "#D47979";
newdiv.style.width = "300px";
newdiv.style.position = "fixed";
newdiv.style.bottom = "50%";
newdiv.style.right = "50%";
newdiv.style.transform = "translateY(50%) translateX(50%)";
newdiv.style.color = "#ffffff";
newdiv.style.zIndex = "999999999999999";
newdiv.style.padding = "10px";
newdiv.style.fontSize = "18px";
newdiv.style.borderRadius = "10px";
newdiv.style.display = "none";

newdiv.appendChild(innerdiv);
newdiv.appendChild(errorText);
document.body.appendChild(newdiv);

var networkErrorDivElement = document.querySelector('#network-error-notification-area');

document.querySelector('#close-network-error-notification').onclick = function () {
    networkErrorDivElement.style.display = "none";
};

const checkOnlineStatus = async () => {
    /* 
    navigator.online not used as it could give false positives 
    when a computer is connected to any network at all (LAN, Wifi, etc.), 
    regardless of whether there is actually internet access or not.
    */
    try {
        const networtTestURL = "https://url_to_an_empty_page_on_your_website_with_CORS_header_set_to_*";
        const online = await fetch(networtTestURL);
        // alert(online.status);
        return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
        // alert(err);
        return false; // definitely offline, unless CORS is blocking the request
    }
};

const myNetworkTest = function () {

};

// Test network every n-Interval
var nInterval = 5000;
setInterval(async () => {
    const isOnline = await checkOnlineStatus();
    if (isOnline === true) {
        // alert('Good! You have Internet Connection');
        networkErrorDivElement.style.display = "none";
        /* 
        Check if no page from the target website is loaded (since app startup)
        then refresh window so as to trigger page load without restarting the app 
        */
        /* 
        The line below is only a valid check if you are sure that 
        an element with the class 'row' should be found in the DOM
        if the website is loaded.
        */
        let rowDivs = document.querySelectorAll('.row');
        if (!rowDivs.length) {
            location.reload();
        }
    } else {
        // alert('Unable to connect. Please check your Internet connection.');
        networkErrorDivElement.style.display = "block";
    }
}, nInterval);


// Test network immediately on script load
document.onload = function () {
    // await myNetworkTest();
};
