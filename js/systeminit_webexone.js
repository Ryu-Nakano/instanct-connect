// 診療科情報
const department = [
			['001', '障害者相談に伴う面談'],
			['002', '意思疎通支援（手話通訳支援）'],
			['003', '住民税の課税内容の説明'],
			['004', '建造物の新改築等の届出'],
			['005', '児童手当・児童扶養手当に関する説明'],
			['006', '国民健康保険、国民年金の手続きに関する説明']
		];

// ファイル名
const fileName = 'webexone';

const announceText = '氏名とメールアドレスを入力してから相談内容を選択してください。';

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
const dispRevText = ['相談内容', '相談室', '相談員'];
