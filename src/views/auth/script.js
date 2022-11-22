// var htmlElem = document.querySelector("html");
// var pElem = document.querySelector("p");
// var imgElem = document.querySelector("img");

// var nama = document.getElementById("nama").value;
// var tmpt_lhr = document.getElementById("tmpt_lhr");
// var tgl_lhr = document.getElementById("tgl_lhr");

// if (!localStorage.getItem("nama")) {
//   populateStorage();
// } else {
//   setStyles();
// }

// function populateStorage() {
// localStorage.setItem("nama", document.getElementById("nama").value);
//   localStorage.setItem("font", document.getElementById("font").value);
//   localStorage.setItem("image", document.getElementById("image").value);

//   setStyles();
// }

// function setStyles() {
//   var currentNama = localStorage.getItem("nama");
// var currentTempat = localStorage.getItem("tmpt_lhr");
// var currentTgl = localStorage.getItem("tgl_lhr");

//   document.getElementById("nama").value = currentNama;
// document.getElementById("tmpt_lhr").value = currentTempat;
// document.getElementById("tgl_lhr").value = currentTgl;

//   htmlElem.style.backgroundColor = "#" + currentColor;
//   pElem.style.fontFamily = currentFont;
//   imgElem.setAttribute("src", currentImage);
// }

// nama.onchange = populateStorage;
// tmpt_lhr.onchange = populateStorage;
// tgl_lhr.onchange = populateStorage;
// window.addEventListener("load", function () {
//   try {
//     var storageData = localStorage.getItem("data");

//     if (storageData) {
//       var parsedData = JSON.parse(storageData);
//       if (parsedData.items && parsedData.items.length) {
//         var list = document.getElementById("list");
//         for (var i = 0; i < parsedData.items.length; i++) {
//           var li = document.createElement("li");
//           var t = document.createTextNode(parsedData.items[i].value);
//           li.appendChild(t);
//           list.appendChild(li);
//         }
//       } else {
//       }
//     }
//   } catch (e) {
//     console.err("Error while reading items from local storage: ", e);
//   }
// });

// Create a new list item when clicking on the "Add" button
// function addElement() {
//   var inputValue = document.getElementById("nama").value;
//   if (inputValue === "") {
//     alert("You must write something!");
//     return;
//   }

//   try {
//     var storageData = localStorage.getItem("data");
//     var dataToWriteToStorage = {};
//     if (storageData) {
//       var parsedData = JSON.parse(storageData);
//       if (parsedData.items && parsedData.items.length) {
//         parsedData.items.push({
//           id: new Date().getTime().toString(16),
//           value: inputValue,
//         });
//         dataToWriteToStorage = parsedData;
//       } else {
//         dataToWriteToStorage = {
//           items: [{ id: new Date().toString(16), value: inputValue }],
//         };
//       }
//     }
//     localStorage.setItem("data", JSON.stringify(dataToWriteToStorage));
//     // Only add item to list once it's saved to localStorage
//     var li = document.createElement("li");
//     var t = document.createTextNode(inputValue);
//     li.appendChild(t);
//     document.getElementById("list").appendChild(li);
//     // Reset the input
//     document.getElementById("nama").value = "";
//   } catch (e) {
//     console.err("Error while saving item to local storage: ", e);
//     alert("There was an error and the item could not be saved");
//   }
// }
