﻿function Successful_SidekickOnline_GetKnownLevels()
{
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);

        $('#existinglevels').append($('<option>', {
            value: "FULL GAME",
            text: "FULL GAME"
        }));

        // Populate new level if the reocrd isnt finalised (i.e set levels on track and field)
        if (response.Finalised === null || response.Finalised === false) {            
            $('#existinglevels').append($('<option>', {
                value: "NEW LEVEL",
                text: "NEW LEVEL"
            }));
        }

        for (var i = 0; i < response.Levels.length; i++) {
            var newSetting = response.Levels[i];
            if (newSetting !== "FULL GAME")
            {
                $('#existinglevels').append($('<option>', {
                    value: newSetting,
                    text: newSetting
                }));
            }
        }
        Hide('#levelnamediv');
    }
    else {
        multiCallHasFailed = true;
    }
}

function Successful_SidekickOnline_GetExistingSettings()
{
    if (latestXHTTP.status === 200) {
        var response = JSON.parse(latestXHTTP.responseText);

        //We want to add a setting for those users who dont/want need a set up settings information
        $('#existingsetting').append($('<option>', {
            value: "I dont know",
            text: "I dont know"
        }));

        $('#existingsetting').append($('<option>', {
            value: "New Setting",
            text: "New Setting"
        }));

        for (var i = 0; i < response.length; i++) {
            var newSetting = ToSettingString(response[i]);
            $('#existingsetting').append($('<option>', {
                value: newSetting,
                text: newSetting
            }));
        }

        //Assign it to i don't know by default
        Hide('#SettingsGroup');
    }
    else {
        multiCallHasFailed = true;
    }
}

function DoPresentationChange() {   
    $('#score').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
    $('#difficulty').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
    $('#lives').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
    $('#extralives').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
    $('#levelname').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
    $('#credits').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');
    $('#mameorpcbinput').parent().addClass('ui-corner-bottom').removeClass('ui-corner-all');

    $('#existinglevels-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
    $('#location-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
    $('#mameorpcb-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
    $('#clubsevents-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
    $('#clubsSelect-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');
    $('#existingsetting-button').removeClass('ui-corner-all').addClass('ui-corner-bottom');

    $('#existingsetting').selectmenu('refresh', true);
    $('#existinglevels').selectmenu('refresh', true);
    $('#location').selectmenu('refresh', true);

    $('#existingsetting-listbox-popup').find('a').addClass('multilineLi');    
}