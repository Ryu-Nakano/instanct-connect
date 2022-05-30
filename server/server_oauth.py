# -*- coding:utf-8 -*-
import requests
import json


from flask import Flask, render_template, request


app = Flask(__name__)

clientID = "Ceeca6d80dc7090040954f391e8c83fc39c56f94a5b1c82d927d64694934bfc83"
secretID = "cfb0b00e4608afd0e19bb89cb6b9f6497d07625d0d6ddc547169fe9ea84b8370"
redirectURI = "" #This could be different if you publicly expose this endpoint.
print (redirectURI)


def get_tokens(code, mode):
    """Gets access token and refresh token"""
    url = "https://webexapis.com/v1/access_token"
    headers = {'accept':'application/json','content-type':'application/x-www-form-urlencoded'}
    payload = ''
    if mode == '0':
        payload = ("grant_type=refresh_token&client_id={0}&client_secret={1}&refresh_token={2}").format(clientID, secretID, code)
    else:
        payload = ("grant_type=authorization_code&client_id={0}&client_secret={1}&"
                        "code={2}&redirect_uri={3}").format(clientID, secretID, code, redirectURI)
    req = requests.post(url=url, data=payload, headers=headers)
    results = json.loads(req.text)
    access_token = results["access_token"]
    refresh_token = results["refresh_token"]
    return access_token, refresh_token

@app.route("/") 

def main_page():
    """Main Grant page"""
    return render_template("granted.html")


@app.route("/oauth") #Endpoint acting as Redirect URI.

def oauth():
    """Retrieves oauth code to generate tokens for users"""
    try:
        f = open('./RefreshToken.txt', 'r')
        code = f.read()
        f.close()

        access_token, refresh_token = get_tokens(code, '0')
        print ('access_token:', access_token)
        print ('refresh_token:', refresh_token)

        # access_tokenをファイルに書き込み
        text = 'const accessToken = \'' + access_token + '\';'
        f1 = open('../js/systeminit_token.js', 'w')
        f1.write(text)
        f1.close()
        
        # refresh_tokenをファイルに書き込み
        f2 = open('./RefreshToken.txt', 'w')
        f2.write(refresh_token)
        f2.close()

        return render_template("granted.html")
    except Exception as e:
        print (e)
        return render_template("granted.html")

if __name__ == '__main__':
    app.run("0.0.0.0", port=10060, debug=False)
