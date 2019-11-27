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
const TopArea = document.querySelector(".TopArea")
BottomArea.style.display = 'flex'

function createCard() {
	BottomDeck.forEach((decks,index) => {
		const bottomDeckElem = document.createElement('div')
		bottomDeckElem.id =`bottom-deck-elem-${index}`
		bottomDeckElem.style.position = 'relative'
		bottomDeckElem.style.height = '600px'
		bottomDeckElem.style.width = '172px'
		bottomDeckElem.style.fontSize = '16px'
		bottomDeckElem.style.userSelect = 'none'
		
		
		decks.forEach((card,cardindex) => {
			const cardElem = document.createElement('img')
			cardElem.style.position = 'absolute'
			cardElem.style.width = '172px'
			cardElem.style.height = '240px'
			cardElem.style.border ='1px solid white'
			cardElem.style.color = transformNumberToBackgroundColor(card)
			cardElem.src = `ui/${card}.svg`
			cardElem.style.padding = '0px'
			cardElem.style.borderRadius = '0px'
			cardElem.style.top =cardindex * 30 +'px'
			cardElem.cardNumber = card
			cardElem.deckIndex = index
			if(cardindex === decks.length -1){
				cardElem.draggable = true
			}
			bottomDeckElem.appendChild(cardElem) 
		})
		BottomArea.appendChild(bottomDeckElem)
	})
	
}
createCard()

//創造上方兩個牌區
const LeftTopArea = document.querySelector('.LeftTopArea')
LeftTopArea.style.display = 'flex'
for(i=0;i<4;i++){
	const LeftTopElem = document.createElement('div')
			LeftTopElem.style.width = '100%'
			LeftTopElem.style.height = '200px'
			LeftTopElem.style.border ='1px solid black'
			LeftTopArea.appendChild(LeftTopElem)
}

const RightTopArea = document.querySelector('.RightTopArea')
RightTopArea.style.display = 'flex'
for(i=0;i<4;i++){
	const RightTopElem = document.createElement('div')
			RightTopElem.style.width = '100%'
			RightTopElem.style.height = '200px'
			RightTopElem.style.border ='1px solid black'
			RightTopArea.appendChild(RightTopElem)
}

//如果是最後一張牌 就加上draggable
function checkLastCard(){
	var deck  = BottomArea.firstChild
	for(i=0;i<BottomArea.childElementCount;i++){
		deck.lastElementChild.draggable = true
		deck = deck.nextElementSibling
	}
}

//拖拉功能
let data 
function dragCard(e){
	e.preventDefault()
	data = e.target
}
function dropCard(e){
	e.preventDefault()
	
	//下方牌區堆疊
	if(((data.cardNumber+1) % 13  == e.target.cardNumber % 13) && (data.style.color != e.target.style.color) && (e.target.parentElement.parentElement == BottomArea) && (e.target.nextElementSibling == null)){
		do{
		var data2 = data.nextElementSibling
		e.target.parentNode.appendChild(data)
		data.style.top = (parseInt(data.previousElementSibling.style.top)+30) + "px"
		data = data2
		console.log(data)
		}while(data != null)
		console.log('下方牌區堆疊')
	}
	//放到左上牌區
	//bug 放到牌與牌區旁的縫隙 依然可以堆疊
	if((e.target.parentElement == LeftTopArea) && !data.nextElementSibling){
		console.log(e.target)
		data.style.top = '0px'
		e.target.appendChild(data)
		console.log('放到左上牌區')
	}
	//四種 A 放到右上牌區
	if(e.target.parentElement == RightTopArea){
		switch(data.cardNumber){
			case 1:
				RightTopArea.firstElementChild.appendChild(data)
				data.style.top = '0px'
				break
			case 14:
				RightTopArea.firstElementChild.nextElementSibling.appendChild(data)
				data.style.top = '0px'
				break
			case 27:
				RightTopArea.lastElementChild.previousElementSibling.appendChild(data)
				data.style.top = '0px'
				break
			case 40:
				RightTopArea.lastElementChild.appendChild(data)
				data.style.top = '0px'
				break
		}
		console.log('四種 A 放到右上牌區')
	}
	//放完 A 後 其他牌放上右上牌區
	if((e.target.cardNumber == (data.cardNumber -1)) && e.target.parentElement.parentElement == RightTopArea){
		e.target.parentElement.appendChild(data)
		data.styldie.top = '0px'
		console.log('放完 A 後 其他牌放上右上牌區')
	}
	
	
	checkLastCard()
}
function allowDrop(e){
	e.preventDefault()
}


//事件監聽拖拉功能
const container = document.querySelector('.container')
container.addEventListener('drag' ,dragCard)
container.addEventListener('drop' ,dropCard)
container.addEventListener('dragover' ,allowDrop)

function pause(){
	container.removeEventListener('drag' ,dragCard)
}

function continueTime(){
	container.addEventListener('drag' ,dragCard)
}


