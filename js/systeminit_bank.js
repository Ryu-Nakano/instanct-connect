// 要件
const department = [
			['001', '住宅ローン'],
			['002', '投資信託'],
			['003', '外貨預金'],
			['004', 'NISA'],
			['005', 'iDeCo'],
			['006', 'その他']
		];
		
// ファイル名
const fileName = 'bank';

const announceText = '会員番号、生年月日を入力してからご用件を選択してください。';

// 情報をファイル出力するか（1:する））
const makeFike = 0;

const roomId = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vOWIxNTViYTAtOTYyNC0xMWVjLTkzMDItNjNmNWM4Y2UxMTE3';

// 予約結果表示用の情報
// ご相談内容：xx
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
// コンサルタント用リンク（ゲスト）
// 
// コンサルタント用リンク（ユーザー）
// 
// コンサルタント
const dispRevText = ['ご相談内容', '相談室', 'コンサルタント'];
