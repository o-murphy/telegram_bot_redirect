function wln_auth (url, key) {
    s = wialon.core.Session.getInstance()
    s.getAccountData(
        s.__currUser.$$user_accountId, 
        function(code, data) {
            if (code) console.log(wialon.core.Errors.getErrorText(code))
            else if (data.dealerRights === 1) {
                s.createAuthHash(function(code, data) {
                    if (code) console.log(wialon.core.Errors.getErrorText(code))
                    else {
                        window.open(encodeURI(`${url}?baseurl=${s.__appDns}&${key}=${data.authHash}`))
                    }
                })
            }
        }
    )
}
