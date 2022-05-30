// 診療科情報
const department = [
			['001', '東棟-2階'],
			['002', '東棟-3階'],
			['003', '北棟-2階'],
			['004', '北棟-3階'],
			['005', '南棟-2階'],
			['006', '南棟-3階']
		];

// ファイル名
const fileName = 'visiting';

const announceText = '診察券番号、生年月日を入力してから病棟を選択してください。';

// 情報をファイル出力するか（1:する））
const makeFike = 0;

const roomId = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vOWIxNTViYTAtOTYyNC0xMWVjLTkzMDItNjNmNWM4Y2UxMTE3';

// 予約結果表示用の情報
// 病棟：x
// 予約日時：yyyy年mm月dd日 hh時mm分
// 
// ご予約の日時になりましたら、
// 以下のリンクをクリックし、
// オンライン面会室にご入室ください。
// 
// オンライン面会室
// 
// ゲスト用リンク
// 
// 先生用リンク（ゲスト）
// 
// 先生用リンク（ユーザー）
// 
// 先生
const dispRevText = ['病棟', '面会室', '先生'];
