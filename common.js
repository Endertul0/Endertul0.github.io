var users = new Map();
//         Username    Password hashes
users.set("endertul", "de0b3501af0c4f54a1709b42568d1792e6ed7f78f35fff1398eff82318b89564");
users.set("mendrel", "1fc37413f61afab7f775de38291fe1406f1061ab5436d7ac87ad9f6e75f6174d");
users.set("pixel", "74f58b117e4d6dc0a85464aaa884d144201c55e87b980673c573dca5bf1d2241")

function incorrect() {
    document.getElementById('incorrect').style.color = 'red';
}

async function login(userIn = '', pwIn = '') {
    userIn = userIn == '' ? document.getElementById('inputUser').value : userIn;
    pwIn = pwIn == '' ? document.getElementById('inputPassword').value : pwIn;
    var pwInHash = await hash(pwIn);

    for (const user of users) {
        if (userIn == user[0]) { // Check username
            if (pwInHash == user[1]) { // Check PW
                document.cookie = "currentUser=" + user[0] + "; SameSite=Lax";
                document.cookie = "passIn=" + user[1] + "; SameSite=Lax";
                console.log('User ', userIn, ' logged in.');

                return true;
            } else {
                incorrect();
                console.log("Bad PW for user " + user[0]);
                console.log("Expected " + user[1] + ", got " + pwInHash);
            }
        } else {
            incorrect();
            console.log("No matching UN");
            console.log("Expected " + user[0] + ", got " + userIn);
        }
    }
}



async function checkCookies() {
    for (const user of users) {
        console.log(await hash(user[1]))
    }

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

async function hash(message) {
    // As UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // Hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // ArrayBuffer -> Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // Bytes -> hex               
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Return
    return hashHex;
}