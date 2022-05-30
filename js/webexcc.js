// 変数定義
// なし

/*-----------------------------------------------------------*/
/* getReservation 予約ボタン選択時処理
/*-----------------------------------------------------------*/
// 引数（IN）
//  bodyText:予約情報
/*-----------------------------------------------------------*/
function getReservation() {
	
	var bodyText = "consultation";
	
	// webex会議URL作成
	const links = fetchLinkData(bodyText);
}

/*-----------------------------------------------------------*/
/* fetchLinkData webex会議URL作成
/*-----------------------------------------------------------*/
// 引数（IN）
//  bodyText:予約情報
// 戻り値（OUT）
//  作成リンク情報
/*-----------------------------------------------------------*/
async function fetchLinkData(bodyText) {
	
	// JSON形式のリクエストにセット
	var raw = JSON.stringify({
		"aud": "a4d886b0-979f-4e2c-a958-3e8c14605e51",
		"jwt": {
			"sub": bodyText		// スペースの名称
		}
	});
	
	// リクエスト作成
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", "Bearer " + accessToken );
	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};
	
	// リクエスト送信
	const response = await fetch("https://mtg-broker-a.wbx2.com/api/v1/joseencrypt", requestOptions);
	const links = await response.json();
	console.log(links);
	

	// 画面作成
	var LGSguest = "https://instant.webex.com/hc/v1/talk?int=jose&data=" + links.guest;
	var LGShost = "https://instant.webex.com/hc/v1/login?int=jose&data=" + links.host;
	var linkInfo = '';
	
	// 短縮URL作成リクエスト
	var longurl = "https://instant.webex.com/hc/v1/talk?int=jose&data="+links.guest;
	var raw2 = JSON.stringify({
		"long_url": longurl,
		"domain": "bit.ly",
		"group_guid": "Bj786kBp5OY"
	});

	var myHeaders2 = new Headers();
	myHeaders2.append("Content-Type", "application/json");
	myHeaders2.append("Authorization", "Bearer 8c0dab57c7686256e018b964b81883d62095ef18");
	var requestOptions2 = {
		method: 'POST',
		headers: myHeaders2,
		body: raw2,
		redirect: 'follow'
	};

	const response2 = await fetch("https://api-ssl.bitly.com/v4/shorten", requestOptions2);
	const links2 = await response2.json();
	console.log(links2);  
	
	// 表示内容作成
	linkInfo = linkInfo + '<br><br><hr width="50%"><br>';
	linkInfo = linkInfo + '<div class=\"button14\"><a href=\"' + LGShost + '\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"participantlink\">オンライン相談開始' + '</a></div>';
	linkInfo = linkInfo + '<br><br>';
	linkInfo = linkInfo + '<div class=\"button15\">';
	linkInfo = linkInfo + 	'<a href=\"#\" onclick=\"copyToClipBoard( \'' + LGSguest + '\' )\">ゲスト用リンクをコピー</a>';
	linkInfo = linkInfo + 	'　';
	linkInfo = linkInfo + 	'<a href=\"#\" onclick=\"copyToClipBoard( \'' + links2.link + '\' )\">ゲスト用リンクをコピー<br>(短縮版)</a>';
	linkInfo = linkInfo + '</div>';
	
	// id「LGSlink」を置き換える
	const LGSlink = document.querySelector('#LGSlink');
	LGSlink.innerHTML = ( linkInfo );
	
	// クリップボードにコピー
	copyToClipBoard( LGSguest );
	
	// メッセージ送信
	sendMessage( accessToken, LGShost+links.host );
	
	return links;
}

/*-----------------------------------------------------------*/
/* sendMessage Webex Messasingにメッセージ送信
/*-----------------------------------------------------------*/
// 引数（IN）
//  :予約情報
/*-----------------------------------------------------------*/
function sendMessage( accessToken, meetingLink ) {
	
	var roomId = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vOWIxNTViYTAtOTYyNC0xMWVjLTkzMDItNjNmNWM4Y2UxMTE3';

	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer " + accessToken );
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		"roomId": roomId,
		"text": "meeting link",
		"attachments": [
		{
			"contentType": "application/vnd.microsoft.card.adaptive",
			"content": {
				"type": "AdaptiveCard",
				"body": [
				{
					"type": "ColumnSet",
					"columns": [
					{
						"type": "Column",
						"items": [
						 {
							"type": "Image",
							"style": "Person",
							"url": "https://developer.webex.com/images/webex-teams-logo.png",
							"size": "Medium",
							"height": "50px"
						}
						],
						"width": "auto"
					},
					{
						"type": "Column",
						"items": [
						{
							"type": "TextBlock",
							"weight": "Bolder",
							"text": "オンライン相談",
							"wrap": true,
							"color": "Light",
							"size": "Large",
							"spacing": "Small"
						}
						],
						"width": "stretch"
					}
					]
				},
				{
					"type": "ColumnSet",
					"columns": [
					{
						"type": "Column",
						"width": 35,
						"items": [
						{
							"type": "TextBlock",
							"text": "日時:",
							"color": "Light"
						},
						{
							"type": "TextBlock",
							"text": "要件:",
							"weight": "Lighter",
							"color": "Light",
							"spacing": "Small"
						}
						]
					},
					{
						"type": "Column",
						"width": 65,
						"items": [
						{
							"type": "TextBlock",
							"text": "即時",
							"color": "Light"
						},
						{
							"type": "TextBlock",
							"text": " ",
							"color": "Light",
							"weight": "Lighter",
							"spacing": "Small"
						}
						]
					}
					],
					"spacing": "Padding",
					"horizontalAlignment": "Center"
				},
				{
					"type": "TextBlock",
					"text": "時間になりましたら会議に参加してください。",
					"wrap": true
				},
				{
					"type": "ColumnSet",
					"columns": [
					{
						"type": "Column",
						"width": "auto",
						"items": [
						{
							"type": "Image",
							"altText": "",
							"url": "https://developer.webex.com/images/link-icon.png",
							"size": "Small",
							"width": "30px"
						}
						],
						"spacing": "Small"
					},
					{
						"type": "Column",
						"width": "auto",
						"items": [
						{
							"type": "TextBlock",
							"text": "[会議開始](" + meetingLink + ")",
							"size": "Medium"
						}
						],
						"verticalContentAlignment": "Center",
						"spacing": "Small"
					}
					]
				}
				],
				"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
				"version": "1.2"
			}
		}
		]
	});

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};

	fetch("https://webexapis.com/v1/messages", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}

/*-----------------------------------------------------------*/
/* copyToClipBoard クリップボードへコピーする
/*-----------------------------------------------------------*/
// 引数（IN）
//  text:コピーする文字列
/*-----------------------------------------------------------*/
function copyToClipBoard( text ) {

	return navigator.clipboard.writeText(text).then(function() {
		alert('ゲスト参加用リンクをコピーしました')
	}).catch(function(error) {
		alert('ゲスト参加用リンクのコピーに失敗しました。\n「ゲスト用リンク」ボタンを選択してリンクをコピーしてください。')
	})
}
