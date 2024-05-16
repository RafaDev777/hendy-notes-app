function getNotes () {

    fetch("https://notes-api.dicoding.dev/v2/")
    .then((response) => {
        return response.json();
    })
    .then((responseJson) => {
        console.log(responseJson);
    })
    .catch((error) => {
        console.log(error);
    });
}
