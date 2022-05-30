// 診療科情報
const department = [
			['001', '血液内科'],
			['002', '循環器内科'],
			['003', '呼吸器内科'],
			['004', '免疫・膠原病内科'],
			['005', '腎臓内科'],
			['006', '腫瘍内科']
		];

// ファイル名
const fileName = 'telehealth';

const announceText = '診察券番号、生年月日を入力してから診療科を選択してください。';

// 情報をファイル出力するか（1:する））
const makeFike = 0;

const roomId = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vOWIxNTViYTAtOTYyNC0xMWVjLTkzMDItNjNmNWM4Y2UxMTE3';

// 予約結果表示用の情報
// 診療科：x
// 予約日時：yyyy年mm月dd日 hh時mm分
// 
// ご予約の日時になりましたら、
// 以下のリンクをクリックし、
// オンライン診療室にご入室ください。
// 
// オンライン診療室
// 
// ゲスト用リンク
// 
// 先生用リンク（ゲスト）
// 
// 先生用リンク（ユーザー）
// 
// 先生
const dispRevText = ['診療科', '診療室', '先生'];
