var firebaseConfig = {
    apiKey: "AIzaSyDHoLqT861IAbslxH06NRmW-ADXT_y7XxM",
    authDomain: "school-chat-app-843c7.firebaseapp.com",
    projectId: "school-chat-app-843c7",
    storageBucket: "school-chat-app-843c7.appspot.com",
    messagingSenderId: "577748439910",
    appId: "1:577748439910:web:d91af8601e413a05b16ea7",
    measurementId: "G-P6F2QP5ESK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "WELCOME " + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "add_room_name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "room.html";

}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}


function redirectToRoomName(name) {
    localStorage.setItem("room_name", name);
    window.location = "room.html";
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}