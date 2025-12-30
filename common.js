var users = new Map();
users.set("endertul", "pass");

function hash(input) {
    return input;
}

function incorrect() {
    document.getElementById('incorrect').style.color = 'red';
}

function login(userIn = '', pwIn = '') {
    userIn = userIn == '' ? document.getElementById('inputUser').value : userIn;
    pwIn = pwIn == '' ? document.getElementById('inputPassword').value : pwIn;

    for (const user of users) {
        if (userIn == user[0]) { // Check username
            if (hash(pwIn) == user[1]) { // Check PW
                document.cookie = "currentUser=" + user[0] + "; SameSite=Lax";
                document.cookie = "passIn=" + user[1] + "; SameSite=Lax";
                console.log('User ', userIn, ' logged in.');

                return true;
            }
            incorrect();
            console.log("Bad PW");
            console.log("Expected " + user[1] + ", got " + hash(pwIn));
            return false;
        }
        incorrect();
        console.log("Bad UN");
        console.log("Expected " + user[0] + ", got " + userIn);
        return false;
    }
}



function checkCookies() {
    if (document.cookie.split("; ")
        .find((row) => row.startsWith("currentUser"))
    ) {
        var userNm = document.cookie.split("; ").find((row) => row.startsWith("currentUser"));
        userNm.replace("currentUser=", "");
        document.getElementById("inputUser").innerText = userNm;
        if (document.cookie.split("; ")
            .find((row2) => row2.startsWith("passIn"))
        ) {
            var passStr = document.cookie.split("; ").find((row) => row.startsWith("passIn"));;
            passStr.replace("passIn=", "");
            document.getElementById("inputPassword").innerText = passStr;
            login(userNm, passStr);
        }
    }
}

function cookiesAreValid() {
    if (document.cookie.split("; ")
        .find((row) => row.startsWith("currentUser"))
    ) {
        var userNm = document.cookie.split("; ").find((row) => row.startsWith("currentUser"));
        userNm.replace("currentUser=", "");
        document.getElementById("inputUser").innerText = userNm;
        if (document.cookie.split("; ")
            .find((row2) => row2.startsWith("passIn"))
        ) {
            var passStr = document.cookie.split("; ").find((row) => row.startsWith("passIn"));;
            passStr.replace("passIn=", "");
            document.getElementById("inputPassword").innerText = passStr;
            if (login(userNm, passStr)) {
                return true;
            }
        }
    }
}