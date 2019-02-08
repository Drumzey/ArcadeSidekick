﻿function FindGameIndex(gameName)
{
    for (var i = 0; i < currentRecord.scores.length; i++)
    {
        if (currentRecord.scores[i].id === gameName) {
            return i;            
        }
    }

    return -1;
}

function ProcessMyGames()
{
    if (latestXHTTP.status === 200) {

        //Get games played from response
        var response = JSON.parse(latestXHTTP.responseText);
        var onlinePlayed = response.Users[0].Games;

        for (var i = 0; i < onlinePlayed.length; i++)
        {
            var gameName = Object.keys(response.Users[0].Games[i])[0];
            var new_score = response.Users[0].Games[i][gameName];
            var rating = response.Users[0].Ratings[i][gameName];

            var index = FindGameIndex(TransformGameName(gameName));

            if (index === -1)
            {
                var playedArray = currentRecord.played;
                playedArray.push(TransformGameName(gameName));
                playedArray.sort();

                var scoreArray = currentRecord.scores;
                var x = new Scores();
                x.id = TransformGameName(gameName);
                x.score = new_score;
                x.uploaded = true;
                scoreArray.push(x);

                var ratingsArray = currentRecord.ratings;
                var y = new Ratings();
                y.id = TransformGameName(gameName);
                y.rating = rating;
                ratingsArray.push(y);

                currentRecord.played = playedArray;
                currentRecord.scores = scoreArray;
                currentRecord.ratings = ratingsArray;
            }
            else
            {
                var existing_score = currentRecord.scores[index].score;

                if (parseInt(existing_score, 10) < parseInt(new_score,10)) {
                    currentRecord.scores[index].score = new_score;
                    currentRecord.scores[index].uploaded = true;
                }
                else
                {
                    //Do nothing, we should have the correct value 
                    //and should be marked as not uploaded
                }
            }
        }

        SetItemInStorage("my_record", currentRecord);
    }    
    else {
        UnsuccessfulOnlineCall();
    }
}