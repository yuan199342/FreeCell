// JavaScript Document
var PokerCards = [];
var BottomDeck = [[],[],[],[],[],[],[],[]]
var LeftTopDeck = [ , , , ]
var RightTopDeck = [ , , , ]

//充滿52張牌入牌組內
for (var i= 0;i<52 ;i++){
	PokerCards.push(i+1)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(PokerCards);

//將52張牌發入BottomDeck arr1是牌組 arr2 是BottomDeck
function dealCards(array1,array2){
for(let i=0;i<8;i++){
	for(let j=0;j<8;j++){
		if(array1.length == 0){return}
		array2[j].push(array1[0])
		array1.shift()
	}
}
}
dealCards(PokerCards,BottomDeck)

//判斷數字代表的花色
function transformNumberToColor(cardNumber) {
	if(cardNumber>0 && cardNumber <= 13)return ' ♠'
	if(cardNumber>=14 && cardNumber <= 26)return ' ♥'
	if(cardNumber>=27 && cardNumber <= 39)return ' ♦'
	if(cardNumber>= 40 && cardNumber <= 52)return ' ♣'
}
//判斷數字代表的顏色
function transformNumberToBackgroundColor(cardNumber) {
	if(cardNumber>0 && cardNumber <= 13)return 'white'
	if(cardNumber>=14 && cardNumber <= 26)return 'red'
	if(cardNumber>=27 && cardNumber <= 39)return 'red'
	if(cardNumber>= 40 && cardNumber <= 52)return 'white'
}




//將數字轉換成1-13或字母
function changeNumberToPoker(cardindex){ 
switch(cardindex % 13){
	case 0 :
		return 'K'
		break
	case 1 :
		return 'A' 
		break
	case 12 :
		return 'Q'
		break
	case 11 :
		return 'J' 
		break
	default :
		return cardindex % 13
		break
}
	}
//將BottomDeck物件創造出來
const BottomArea = document.querySelector(".BottomArea")
BottomArea.style.display = 'flex'

function createCard() {
	BottomDeck.forEach((decks,index) => {
		const bottomDeckElem = document.createElement('div')
		bottomDeckElem.id =`bottom-deck-elem-${index}`
		bottomDeckElem.style.position = 'relative'
		bottomDeckElem.style.height = '600px'
		bottomDeckElem.style.width = '152px'
		bottomDeckElem.style.fontSize = '16px'
		bottomDeckElem.style.userSelect = 'none'
		
		
		decks.forEach((card,cardindex) => {
			const cardElem = document.createElement('div')
			cardElem.style.position = 'absolute'
			cardElem.style.width = '90%'
			cardElem.style.height = '200px'
			cardElem.style.border ='1px solid #c9c9c9'
			cardElem.style.color = transformNumberToBackgroundColor(card)
			cardElem.style.backgroundColor = 'black'
			cardElem.style.padding = '5px'
			cardElem.style.borderRadius = '5px'
			cardElem.style.top = cardindex * 30 + 'px'
			cardElem.cardNumber = card
			cardElem.deckIndex = index
			cardElem.innerHTML = changeNumberToPoker(card) + transformNumberToColor(card)
			bottomDeckElem.appendChild(cardElem) 
		})
		BottomArea.appendChild(bottomDeckElem)
	})
	
}
createCard()





