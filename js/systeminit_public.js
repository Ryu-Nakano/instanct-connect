// 診療科情報
const department = [
			['001', '国保年金課'],
			['002', '市民課'],
			['003', '市民税課'],
			['004', '福祉医療課'],
			['005', '介護福祉課'],
			['006', '健康増進課']
		];

// ファイル名
const fileName = 'public';

const announceText = '担当者の氏名、所属先を入力してから対応窓口を選択してください。';

// 情報をファイル出力するか（1:する））
const makeFike = 0;

const roomId = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vOWIxNTViYTAtOTYyNC0xMWVjLTkzMDItNjNmNWM4Y2UxMTE3';

// 予約結果表示用の情報
// 対応窓口：x
// 予約日時：yyyy年mm月dd日 hh時mm分
// 
// ご予約の日時になりましたら、
// 以下のリンクをクリックし、
// オンライン相談室にご入室ください。
// 
// オンライン相談室
// 
// ゲスト用リンク
// 
// 相談員用リンク（ゲスト）
// 
// 相談員リンク（ユーザー）
// 
// 相談員
const dispRevText = ['対応窓口', '相談室', '相談員'];
