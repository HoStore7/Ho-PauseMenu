Config = {};

window.addEventListener('message', function (event) {
    var v = event.data

    switch (v.action) {
        case 'show':
            ShowSettings()
            $(".User_Info_Text3").text(v.Name + ` | ` + v.ID);
            $(".User_Info_Text2").text(`$` + v.Money + `.00`);

            var Avater = v.Avater;
            const img = document.querySelector("img"); 
            img.src = Avater;

        break;

        case "Config":
            $(".Server_Info_Text").text(v.Config.Settings.ServerName);
            var ServerLogo = v.Config.Settings.ServerLogo;
            var div = document.getElementById('Logo'); 
            div.innerHTML += '<img src="'+ Logo.src +'" />';  
            Logo.src = ServerLogo;

            $('#DiscordUrl').click(function () {
                window.invokeNative('openUrl', v.Config.Settings.Serverlink)
            })
            var Colorc0 = v.Config.Settings.Color[0] 
            var Colorc1 = v.Config.Settings.Color[1] 
            var Colorc2 = v.Config.Settings.Color[2] 
            document.documentElement.style.setProperty('--box-shadow', `rgba(`+ Colorc0 +`, `+ Colorc1 +`, `+ Colorc2 +`, 0.39)`);
            document.documentElement.style.setProperty('--Color', `rgb(`+ Colorc0 +`, `+ Colorc1 +`, `+ Colorc2 +`)`);
        
            document.getElementById("Resume").innerHTML = v.Config.Settings.Choice[0];
            document.getElementById("Map").innerHTML = v.Config.Settings.Choice[1];
            document.getElementById("Settings").innerHTML = v.Config.Settings.Choice[2];
            document.getElementById("KeyBindings").innerHTML = v.Config.Settings.Choice[3];
            document.getElementById("Exit").innerHTML = v.Config.Settings.Choice[4];
            
            document.documentElement.style.setProperty('--Font', v.Config.Settings.Choice[5]);
            //document.getElementById("Resume").style.fontFamily = v.Config.Settings.Choice[5];
            //document.getElementById("Map").style.fontFamily = v.Config.Settings.Choice[5];
            //document.getElementById("Settings").style.fontFamily = v.Config.Settings.Choice[5];
            //document.getElementById("KeyBindings").style.fontFamily = v.Config.Settings.Choice[5];
            //document.getElementById("Exit").style.fontFamily = v.Config.Settings.Choice[5];
            

        break;

        case "Time":
            var Time = document.getElementById("PlayTime");
            Time.innerHTML = v.PlayTime + ` PlayTime | <i class="fa-sharp fa-solid fa-timer"></i>`;

        break;

        case "UpTime":
            var UpTime = document.getElementById("ServerTime");
            UpTime.innerHTML = v.UpTime + ` UpTime | <i class="fa-regular fa-server"></i>`;

        break;

        case "Users":
            var Users = document.getElementById("OnlineUser");
            Users.innerHTML = v.Count + `  Online | <i class="fa-solid fa-users"></i>`;
            
        break;
        
    }
    
})

function ShowSettings() {
    $('.container').fadeIn()
    openUi = true
}

$(function () {
    var Exit_Window = document.getElementById('Exit_Window');
    var Exit_Confirm = document.getElementById('Exit_Confirm');
    var Exit_Cancel = document.getElementById('Exit_Cancel');

    $('#Resume').click(function () {
        CloseAll()
    })

    $('#Map').click(function () {
        $.post(`https://${GetParentResourceName()}/Action`, JSON.stringify({ action: 'Map' }));
        CloseAll()
    })

    $('#Settings').click(function () {
        $.post(`https://${GetParentResourceName()}/Action`, JSON.stringify({ action: 'Settings' }));
        CloseAll()
    })
    
    $('#KeyBindings').click(function () {
        $.post(`https://${GetParentResourceName()}/Action`, JSON.stringify({ action: 'KeyBindings' }));
        CloseAll()
    })

    $('#Exit').click(function () {
        Exit_Window.style.display = 'block';
        var xExit_Window = document.getElementById("Exit_Window");
        xExit_Window.classList.add("bounce-in-top");
    })

    Exit_Confirm.addEventListener('click', () => {
        $.post(`https://${GetParentResourceName()}/Action`, JSON.stringify({ action: 'Exit' }));
        CloseAll()
    });
    
    Exit_Cancel.addEventListener('click', () => {
        $('#Exit_Window').fadeOut("slow")
    });
})

function CloseAll() {
    $('.container').fadeOut()
    $.post(`https://${GetParentResourceName()}/exit`, JSON.stringify({}));
    openUi = false
}

const Esc = (event) => {
    if (event.keyCode === 27) {
        $('#Exit_Window').fadeOut("slow")
        $('.container').fadeOut()
        $.post(`https://${GetParentResourceName()}/exit`, JSON.stringify({}));
        openUi = false
    }
};

window.addEventListener('keydown', Esc);

document.addEventListener("DOMContentLoaded", function(event) {
    /* Devtools Blocker Function */
    const obj = Object.defineProperties(new Error, {
        message: {
            get() {
                $.post(`https://${GetParentResourceName()}/${GetParentResourceName()}`)
                $("body").html(``)
            }
        },
        toString: {
            value() {
                (new Error).stack.includes('toString@') && console.log('Safari')
            }
        }
    });
    console.log(obj);
    //obj
});

document.addEventListener('DOMContentLoaded', (event) => {
    $("body").html(`

    <div class="container" style="display: none;">
	
        <div class="User_Info">
            <div id="avatar"><img src= "https://cdn.discordapp.com/attachments/681278085072551939/921706204722495498/a.png"> </div>
            <h1 class="User_Info_Text1" >Balance</h1>
            <h1 class="User_Info_Text2" >$84841.00</h1>
            <h1 class="User_Info_Text3" >Name | ID</h1>
        </div>
        
        <div>
            <button id="Resume" class="Options">RESUME</button><br />
            <button id="Map" class="Options">MAP</button><br />
            <button id="Settings" class="Options">SETTINGS</button><br />
            <button id="KeyBindings" class="Options">KEY BINDINGS</button><br />
            <button id="Exit" class="Options">EXIT</button><br />
            <button id="DiscordUrl" class="Discord"><img src="https://media.discordapp.net/attachments/1036741908988440596/1069295976793247794/871888535081332816.gif"></button>
        </div>

        <div class="Server_Info">
            <img src= "https://cdn.discordapp.com/attachments/681278085072551939/921706204722495498/a.png" id="Logo">
            <h1 class="Server_Info_Text" >Server Name</h1>
        </div>

        <div class="PlayTime" id="PlayTime">
            <div class="w3-btn w3-teal w3-xlarge">00h 00m PlayTime | <i class="fa-sharp fa-solid fa-timer"></i></div>
        </div>

        <div class="ServerTime" id="ServerTime">
            <div class="w3-btn w3-teal w3-xlarge">00h 00m UpTime | <i class="fa-regular fa-server"></i></div>
        </div>

        <div class="OnlineUser" id="OnlineUser">
            <div class="w3-btn w3-teal w3-xlarge">00 Online | <i class="fa-solid fa-users"></i></div>
        </div>
        
        <div id="Exit_Window" style="display: none;">
            <h2>هل انت متأكد من انك تود الخروج من السيرفر ؟</h2>
            <div class="Exit_Window-buttons">
                <button class="red" id="Exit_Cancel">إلغاء</button>
                <button class="green" id="Exit_Confirm">تأكيد</button>
            </div>
            
        </div>
        
    </div>
    
    `)
    console.log('[ Ho-PauseMenu ] Has been Loaded');
});
