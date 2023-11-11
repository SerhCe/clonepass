const audioArray = [ //path, probability weight, length in ms or how long the audio is supposed to play
['assets/sounds/test.mp3', 1, 5000], 
];

const imageArray = [ //path, probability weight
["assets/img/images/test.jpg", 1],
]

function buttonClick() {
    PopUpImage();
    playSound();
    incrementOwnPlayed();
    //testrandomizePopUpImage();
    //testrandomizeAudio();
}

function playSound() {
    var audioData = randomizeAudio();
    var audio = new Audio(audioData[0]);
    var volume = document.querySelector("#volume-control");
    audio.volume = volume.value / 100;

    volume.addEventListener("change", function (e) {
        audio.volume = e.currentTarget.value / 100;
    })

    audio.play();

    setTimeout(function() {
        audio.pause();
    }, audioData[2]);
}

function PopUpImage() {
    var popUpImage = document.createElement("img");
    popUpImage.setAttribute('id', 'popUpImage')
    popUpName = 'popUpImage' + Math.floor(Math.random() * 100000);
    popUpImage.classList.add(popUpName);
    popUpImage.src = randomizePopUpImage();

    document.body.appendChild(popUpImage);

    randomizePopUpPlacement(popUpName);

    setTimeout(function () {
        document.body.removeChild(popUpImage);
    }, 5000);
}

function randomizeAudio() {

    var totalWeight = audioArray.reduce(function (prev, cur) {
        return prev + cur[1];
    }, 0);

    var randomNum = Math.random() * totalWeight;
    var index = 0;

    for (var i = 0; i < audioArray.length; i++) {
        randomNum -= audioArray[i][1];
        if (randomNum < 0) {
            index = i;
            break;
        }
    }

    return audioArray[index];
}

function randomizePopUpImage() {

    var totalWeight = imageArray.reduce(function (prev, cur) {
        return prev + cur[1];
    }, 0);

    var randomNum = Math.random() * totalWeight;
    var index = 0;

    for (var i = 0; i < imageArray.length; i++) {
        randomNum -= imageArray[i][1];
        if (randomNum < 0) {
            index = i;
            break;
        }
    }

    return imageArray[index][0];
}

function muteAudio() {
    var volumeElement = document.getElementById("volume-control");
    if (volumeElement.value != 0) {
        setAudio();
        volumeElement.value = 0;
    } else {
        volumeElement.value = getAudio();
    }
}

function setAudio() {
    var volumeElement = document.getElementById("volume-control");
    localStorage.setItem("previousAudioLevel", volumeElement.value);
}

function getAudio() {
    return localStorage.getItem("previousAudioLevel");
}

function getOwnPlayed() {
    return parseInt(localStorage.getItem("OwnPlayed"));
}

function setOwnPlayed(ownPlayedValue) {
    localStorage.setItem("OwnPlayed", ownPlayedValue);
    newValue = document.getElementById("numberOwnPlayed");
    newValue.innerText = ownPlayedValue;
}

function incrementOwnPlayed() {
    i = getOwnPlayed();
    j = i + 1;
    setOwnPlayed(parseInt(j));
}

function toggleInfoMenu(menu) {
    var menuDocument = document.getElementById(menu);
    var mainBodyDocument = document.getElementById("MainBody");
    if(menuDocument.style.display == 'block') {
        menuDocument.style.display = 'none';
        mainBodyDocument.style.display = 'block';
    } else {
        menuDocument.style.display = 'block';
        mainBodyDocument.style.display = 'none';
    }
}

function createAndGetOnLoad() {
    //creates own Played counter if it doesnt exist, or gets it
    if (parseInt(localStorage.getItem("OwnPlayed")) > 0) {
        // pass
    } else {
        localStorage.setItem("OwnPlayed", 0);
    }

    setOwnPlayed(getOwnPlayed());

    //Get and set sound from last session
    if (parseInt(getAudio()) >= 0) {
        var volumeElement = document.getElementById("volume-control");
        volumeElement.value = getAudio();
    } else {
        localStorage.setItem("previousAudioLevel", 50);
    }

}

function randomizePopUpPlacement(classOfImage) {
    // randomizes css variables for the placement of the popup image
    var popUpImage = document.querySelector('.' + classOfImage);
    popUpImage.style.setProperty('--placement-top', Math.floor(Math.random() * 75) + 'vh');
    popUpImage.style.setProperty('--placement-left', Math.floor(Math.random() * 75) + 'vw');
    popUpImage.style.setProperty('--transform-scale', Math.floor(Math.random() * (100 - 33) + 33) / 100); // The maximum is exclusive and the minimum is inclusive
    popUpImage.style.setProperty('--transform-defaultrotation', Math.floor(Math.random() * 1080) + 'deg'); // 1080 because we can :WICKED:
}

function testrandomizePopUpImage() {
    var results = {};
    var totalTests = 1000;
    for (var i = 0; i < totalTests; i++) {
        var result = randomizePopUpImage();
        if (results[result]) {
            results[result] += 1;
        } else {
            results[result] = 1;
        }
    }

    console.log("Results:");
    Object.keys(results).forEach(function (key) {
        console.log(key + ": " + results[key]);
    });
    console.log("Total tests:" + totalTests)
}

function testrandomizeAudio() {
    var results = {};
    var totalTests = 1000;
    for (var i = 0; i < totalTests; i++) {
        var result = randomizeAudio();
        if (results[result]) {
            results[result] += 1;
        } else {
            results[result] = 1;
        }
    }

    console.log("Results:");
    Object.keys(results).forEach(function (key) {
        console.log(key + ": " + results[key]);
    });
    console.log("Total tests:" + totalTests)
}