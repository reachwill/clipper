function googleApiClientReady() {

}

function search() {
    gapi.client.setApiKey('AIzaSyBbeuQDIFpMxnDNxPWhXOEVMpaBzgyMBjY');
    gapi.client.load('youtube', 'v3', function () {
        makeRequest();
    });
}

function makeRequest() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });
    request.execute(function (response) {
        var str = JSON.stringify(response.result);
        console.log(response.result);
        $('#search-container').html('<pre>' + str + '</pre>');
    });
}
