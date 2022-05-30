// 変数定義
var dispWeekBase = 0;		// 日の表示開始位置
var dispDayBase = 0;		// 日の表示開始位置
var dispMonBase = 0;		// 月の表示開始位置
var dispYerBase = 0;		// 年の表示開始位置
var dispMon = dispMonBase;	// 画面表示用の月
var dispDay = dispDayBase;	// 画面表示用の日
var dispYer = dispYerBase;	// 画面表示用の年

// クエリ文字を取得
var queries = getUrlQueries();

// 必須項目が入力されているかチェックする
if( queries.dep_cd == "" || queries.dep_cd == undefined 
	|| queries.ptId == "" || queries.ptId == undefined
	|| queries.btday == "" || queries.btday == undefined ) {
	document.write( announceText + '<br>');
} else {
	document.write("Please select your preferred date and time.<BR>");
	if( queries.move == "" || queries.move == undefined || queries.moveBase == "" || queries.moveBase == undefined ) {
		make_cal( queries, 0, 0 );
	} else {
		make_cal( queries, queries.moveBase, queries.move );
	}
}

/*-----------------------------------------------------------*/
/* make_cal カレンダーを作成する関数
/*-----------------------------------------------------------*/
// 引数（IN）
//  queries：URLのクエリ文字
//  moveBase:当日からどのくらい「週」を移動したか（0が今週）
//  move:移動方向（-1：前週、0：移動なし、1：次週）
/*-----------------------------------------------------------*/
function make_cal( queries, moveBase, move ) {
	
	// 今日の日付を取得する
	var today = new Date();
	
	// 年・月・日・曜日を取得する
	var year = today.getFullYear();
	var month = today.getMonth() + 1;
	var week = today.getDay();
	var day = today.getDate();
	var time = today.getTime();
	
	
	// 起点に本日の年月日を設定する
	dispDayBase = day + 1;		// 当日は予約できない
	dispMonBase = month - 1;	// 配列に使用するため-1する
	dispYerBase = 0;			// 年は今年からの移動年で管理する
	dispWeekBase = week;
	
	// 週移動による表示開始位置の調整
	dispDayBase = dispDayBase + 7*(Number(moveBase) + Number(move));
	
	// 日付の月マタギを確認する
	let addMon = 0;
	let tmp = dispDayBase;
	let i = 0;
	for( i = 0 ;; i ++ ) {
		tmp = tmp - calMon[(dispMonBase + i)%12][1] ;
		if( tmp > 0 ) {
			addMon ++;
		} else {
			break;
		}
	}
	
	// 月の年マタギを確認する
	let addYer = Math.floor( (dispMonBase + addMon)/12 );
	
	// 跨いだ分を調整する
	for( i = 0 ; i < addMon ; i ++ ) {
		dispDayBase = dispDayBase - calMon[(dispMonBase + i)%12][1];
	}
	dispMonBase = ( dispMonBase + addMon )%12;
	dispYerBase = addYer;
	
	
	// 当日からの週移動を再設定する
	moveBase = Number(moveBase) + Number(move);
	
	
	// カレンダー表示のテキスト作成
	var calText = '';
	if( moveBase == 0 ) {
		calText = calText + '<input type="button" id="" value="PrevWeek" style="width:70px;height:30px" disabled>'
	} else {
		calText = calText + '<input type="button" id="" value="PrevWeek" style="width:70px;height:30px" onclick="refreshPage(' + moveBase + ', -1);">'
	}
	calText = calText + '<input type="button" id="" value="NextWeek" style="width:70px;height:30px" onclick="refreshPage(' + moveBase + ', 1);">'
	calText = calText + '<center><table border="1" bgcolor="#e3f0fb">';
	let j = 0;
	let k = 0;

	calText = calText + '<tr align="center">';
	calText = calText + '<th bgcolor="#004a71" width="60" height="40"></th>';
	
	// カレンダーの日付ヘッダー作成
	dispMon = dispMonBase;
	dispDay = dispDayBase;
	for( j = 0 ; j < 7 ; j ++ ) {
		k ++;
		// 月マタギでないか確認する
		if( ( dispDay/calMon[dispMonBase][1] ) > 1  ) {
			dispDay = dispDay - calMon[dispMonBase][1];	// 2ヵ月跨ぐことはないためdispMonBaseで計算する
			dispMon = ( dispMon + 1 )%12;	// 12月→1月の月マタギを考慮
		}
		calText = calText + '<th style="color:#ffffff" bgcolor="#004a71" width="85" >' + calMon[dispMon][0] + '/' + dispDay + '(' + yobi[ (dispWeekBase + k)%7 ] + ')</th>';
		dispDay ++;
	}
	calText = calText + '</tr>';
	
	
	// カレンダーの中身作成
	let selId = '';
	if( queries.selId == "" || queries.selId == undefined ) {
		 selId = '';
	} else {
		 selId = queries.selId;
	}
	
	// ドロップボックスの選択内容によって予約状況を変化さる
	let revstArrey;
	// 選択肢を5で割ったあまりで計算
	switch ( Number( queries.dep_cd )%5 ) {
		case 1:
			revstArrey = revstArrey1;
			break;
		case 2:
			revstArrey = revstArrey2;
			break;
		case 3:
			revstArrey = revstArrey3;
			break;
		case 4:
			revstArrey = revstArrey4;
			break;
		case 0:
			revstArrey = revstArrey0;
			break;
		default:
			revstArrey = revstArrey0;
			break;
	}
	
	let m = 0;
	let n = 0;
	let count = 0;
	for( m = 0 ; m < revTime.length ; m ++ ) {
		calText = calText + '<tr align="center">';
		calText = calText + '<td  height="30">' + revTime[m] + '</td>';
		dispMon = dispMonBase;
		dispDay = dispDayBase;
		dispYer = dispYerBase;
		for( n = 0 ; n < 7 ; n ++ ) {
			// 月マタギでないか確認する
			if( ( dispDay/calMon[dispMonBase][1] ) > 1  ) {
				dispDay = dispDay - calMon[dispMonBase][1];	// 2月跨ぐことはないためdispMonBaseで計算する
				// 年マタギでないか確認する
				if( ( dispMon + 1 ) == 12 ) {
					dispMon = 0;	// 12月→1月の月マタギ
					dispYer ++;		// 1年進める
				}
			}
			var id = ( year + dispYer ) + zeroPad( ( dispMon + 1 ) , 2 ) + zeroPad( dispDay , 2 ) + zeroPad( revTime[m].replace( ':', '' ) , 4 );
			
			// 背景色設定
			var bgcolor = '#ffffff';
			if ( id == selId ) {
				// 選択されている場合
				bgcolor = '#77ccff';
			} else {
				// 選択されていない場合
				bgcolor = '#ccffff';
			}
			
			// 土日は予約できない
			if( yobi[ (dispWeekBase + ( n + 1 ) )%7 ] == '土' || yobi[ ( dispWeekBase + ( n + 1 ) )%7 ] == '日' ) {
				calText = calText + '<td bgcolor="#cccccc">' + '-' + '</th>';
			} else {
				let l = 0;
				let revstatus = 0;	// 1：空き枠あり
				for( l = 0 ; l < revstArrey.length ; l ++ ) {
					if( revstArrey[l][1] == id.substr( 6, 6 ) ) {
						if( revstArrey[l][3] < revstArrey[l][2]) {
							revstatus = 1 ;
						}
						break;
					}
				}
				if( revstatus == 1 ) {
					// 空き枠あり
					calText = calText + '<td bgcolor="' + bgcolor + '">' + '<a href = "#"  id="' + id + '" onclick="getId(this , ' + moveBase + ');">○</a></th>';
				} else {
					// 空き枠なし
					calText = calText + '<td bgcolor="#cccccc">' + '×' + '</th>';
				}
			}
			dispDay ++;
		}
		calText = calText + '</tr>';
	}
	calText = calText + '</table></center>';
	
	// 凡例テキスト表示
	calText = calText + '※　○：Available、×：Not Available、-：Outside business hours<br>';
	
	// 予約枠が選択されていたら「予約」ボタンを表示する
	if( selId != '' ) {
		var text = '\'' + selId  + '-' + queries.dep_cd + '-' + queries.ptId + '-' + queries.btday + '\'';
		calText = calText + '<div class="confirm"><a href="#" class="btn-box" id="fetchLGSbtn" onclick="getReservation(' + text + ');">Book</a></div>';
		calText = calText + '<div class="flex"><div id="LGSlink" class="center">Generate encrypted secure link.</div></div>';
	}
	
	calText = calText + '<br>';

	document.write(calText);
}

/*-----------------------------------------------------------*/
/* getId 選択した予約枠のID情報を取得する
/*-----------------------------------------------------------*/
// 引数（IN）
//  element:選択された予約枠の情報
//  moveBase:当日からどのくらい「週」を移動したか（0が今週）
/*-----------------------------------------------------------*/
function getId( element, moveBase ) {
	var id_value = element.id;	// elementのプロパティとしてidを取得
	
	refreshBackground( moveBase, id_value );
}

/*-----------------------------------------------------------*/
/* getUrlQueries URLからクエリ文字を取得する
/*-----------------------------------------------------------*/
// 引数（IN）
//  なし
// 戻り値（OUT）
//  クエリ文字の配列
/*-----------------------------------------------------------*/
function getUrlQueries() {
	var queryStr = window.location.search.slice(1);  // 文頭?を除外
	queries = {};
	
	// クエリがない場合は空のオブジェクトを返す
	if (!queryStr) {
	return queries;
	}
	
	// クエリ文字列を & で分割して処理
	queryStr.split('&').forEach(function(queryStr) {
		// = で分割してkey,valueをオブジェクトに格納
		var queryArr = queryStr.split('=');
		queries[queryArr[0]] = queryArr[1];
	});
	return queries;
}

/*-----------------------------------------------------------*/
/* refreshPage カレンダーページを更新する
/*-----------------------------------------------------------*/
// 引数（IN）
//  moveBase:当日からどのくらい「週」を移動したか（0が今週）
//  move:移動方向（-1：前週、0：移動なし、1：次週）
/*-----------------------------------------------------------*/
function refreshPage( moveBase, move ) {
	parent.frames[1].location.href = ( fileName + "2.html?ptId=" + queries.ptId + "&btday=" + queries.btday + "&dep_cd=" + queries.dep_cd + "&moveBase=" + moveBase + "&move=" + move );
}

/*-----------------------------------------------------------*/
/* refreshBackground カレンダーページを更新する（日付選択時背景色の変更）
/*-----------------------------------------------------------*/
// 引数（IN）
//  moveBase:当日からどのくらい「週」を移動したか（0が今週）
//  selId:選択された予約枠のid
/*-----------------------------------------------------------*/
function refreshBackground( moveBase, selId ) {
	parent.frames[1].location.href = ( fileName + "2.html?ptId=" + queries.ptId + "&btday=" + queries.btday + "&dep_cd=" + queries.dep_cd + "&moveBase=" + moveBase + "&move=0&selId=" + selId );
}

/*-----------------------------------------------------------*/
/* getReservation 予約ボタン選択時処理
/*-----------------------------------------------------------*/
// 引数（IN）
//  bodyText:予約情報
/*-----------------------------------------------------------*/
function getReservation(bodyText) {
	// webex会議URL作成
	const links = fetchLinkData(bodyText);
	
	// ファイル出力する場合
	if( makeFike == 1 ) {
		makeFile( bodyText );
	}
	
//	createGoogleCarender();
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
	
	// 必要なデータを作成する
	var revdate = bodyText.substr( 0, 12 );	// 予約年月日時
	var dep_cd = bodyText.substr( 13, 3 );	// 予約対象のコード
	
	// 予約年月日時をデータ型に変換
	var revdt = new Date(revdate.substr( 0, 4 ), (revdate.substr( 4, 2 ) - 1 ), revdate.substr( 6, 2 ), revdate.substr( 8, 2 ), revdate.substr( 10, 2 ));
	 
	//12時間後
    revdt.setHours(revdt.getHours() + 12);
    
	var timeUTC = revdt.getTime();
	
	// Teamsスペースのタイトル作成【年/月/日 時間（要件）】
	var dev_name = '';
	let i = 0;
	for( i = 0 ; i < department.length ; i ++ ) {
		if( department[i][0] == dep_cd ) {
			dev_name = department[i][1];
			break;
		}
	}
	var subName = revdate.substr( 0, 4 ) + '/' + revdate.substr( 4, 2 ) + '/' + revdate.substr( 6, 2 ) + ' ' + revdate.substr( 8, 2 ) + ':' + revdate.substr( 10, 2 ) + '(' + dev_name + ')';
	
	// JSON形式のリクエストにセット
	var raw = JSON.stringify({
		"aud": "a4d886b0-979f-4e2c-a958-3e8c14605e51",
		"jwt": {
			"sub": subName,			// スペースの名称
			"exp": timeUTC
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

	// 画面作成
	var LGSguest = "https://instant.webex.com/hc/v1/talk?int=jose&data=";
	var LGShost = "https://instant.webex.com/hc/v1/login?int=jose&data=";
	var LGSsubject = dev_name;
	var LGSyear = revdate.substr( 0, 4 );
	var LGSmonth = revdate.substr( 4, 2 );
	var LGSday = revdate.substr( 6, 2 );
	var LGShour = revdate.substr( 8, 2 );
	var LGSmin = revdate.substr( 10, 2 );
	var revTime = LGSmonth + "/" + LGSday + "/"+ + LGSyear + " " + LGShour + ":" + LGSmin;
	const LGSlink = document.querySelector('#LGSlink');
	LGSlink.innerHTML = ("<h2>" + "<b>" + dispRevText[0] + "</b>："+LGSsubject+"<br>"+"<b>Date&Time</b>："+ revTime +"<br><br>"+"When it's time for your appointment,"+"<br>"+"please click on the link below to enter."+"<br><br>"+'<a href="'+LGSguest+links.guest+'" target="_blank" rel="noopener noreferrer" class="participantlink">【Online ' + dispRevText[1] + "】" +'</a>'+"<br><br>"+'<div class="copy_btn" data-clipboard-text="'+LGSguest+links.guest+'">Link for Guest</div>'+"<br>"+'<div class="copy_btn" data-clipboard-text="'+links2.link+'">Link for Guest(Short)</div>'+"<br>"+'<div class="copy_btn" data-clipboard-text="'+LGSguest+links.host+'">' + dispRevText[2] + ' Link（as a Guest）</div>'+"<br>"+'<div class="copy_btn" data-clipboard-text="'+LGShost+links.host+'">' + dispRevText[2] + ' Link（as a User）</div>'+"<br>"+'<a href="'+LGShost+links.host+'" target="_blank" rel="noopener noreferrer" class="participantlink_hide">' + dispRevText[2] + '</a>');

	// メッセージ送信
	sendMessage( accessToken, dispRevText[0], LGSsubject , revTime, dispRevText[1] , LGShost+links.host);
		
	return links;
}

/*-----------------------------------------------------------*/
/* makeFile 予約情報をテキストファイルに出力する
/*-----------------------------------------------------------*/
// 引数（IN）
//  bodyText:ファイルの内容
/*-----------------------------------------------------------*/
function makeFile( bodyText ) {
	var dt = new Date();
	var year = dt.getFullYear();	//年
	var month = dt.getMonth() + 1;	//月
	var day = dt.getDate();			//日
	var hour = dt.getHours();		//時
	var minute = dt.getMinutes();	//分
	var second = dt.getSeconds();	//秒
	var millisecond = dt.getMilliseconds();		//ミリ秒
	
	var uniTime = '' + zeroPad( year, 4 ) + zeroPad( month, 2 )  + zeroPad( day, 2 ) + zeroPad( hour, 2 ) + zeroPad( minute, 2 ) + zeroPad( second, 2 ) + millisecond;
	
	// ファイルへ出力
	var blob = new Blob([bodyText],{type:"text/plan"});
	var filename = uniTime + '.txt';
	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveOrOpenBlob(blob, filename);
	} else {
		var link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.click();
	}
}

/*-----------------------------------------------------------*/
/* sendMessage Webex Messasingにメッセージ送信
/*-----------------------------------------------------------*/
// 引数（IN）
//  :予約情報
/*-----------------------------------------------------------*/
function sendMessage( accessToken, meetingPurposeTitle, meetingPurpose , revTime, meetingTitle, meetingLink ) {
	
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
							"text": "Online Appointment Notification",
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
							"text": "Date&Time:",
							"color": "Light"
						},
						{
							"type": "TextBlock",
							"text": meetingPurposeTitle + ":",
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
							"text": revTime ,
							"color": "Light"
						},
						{
							"type": "TextBlock",
							"text": meetingPurpose,
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
					"text": "Please click on the link below to enter.",
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
							"text": "[Online " + meetingTitle + " Start](" + meetingLink + ")",
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
/* zeroPad 指定文字数まで先頭0埋め
/*-----------------------------------------------------------*/
// 引数（IN）
//  moveBase:当日からどのくらい「週」を移動したか（0が今週）
//  selId:選択された予約枠のid
// 戻り値（OUT）
//  0埋め成形済数値列
/*-----------------------------------------------------------*/
function zeroPad( num , keta ) {
	var pad0 = '';
	let i = 0;
	for( i = 0 ; i < keta ; i ++) {
		pad0 = pad0 + '0';
	}
	
	return ( pad0 + num ).slice( -1 * keta );
}

