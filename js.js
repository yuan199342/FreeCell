// JavaScript Document

//剛開始1-52張牌
var PokerCards = [];

//下方發牌用 8個牌區的數字
var BottomDeck = [[],[],[],[],[],[],[],[]]

//一次最多可以移動的牌 5張
var CardsCanMove = 5 ;


//1-52張牌依順序放入PokerCards
for (var i= 0;i<52 ;i++){
	PokerCards.push(i+1)
}

//將PokerCards內依順序的1-52隨機打亂
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(PokerCards);

//將52張牌發入BottomDeck arr1是打亂後的PokerCards牌組 
//arr2 是內有8個小陣列的BottomDeck
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




//將1-52的數字轉換成1-10或字母
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


//將BottomDeck物件創造出來(下方牌區BottomArea)(上方牌區TopArea)
const BottomArea = document.querySelector(".BottomArea")
const TopArea = document.querySelector(".TopArea")
BottomArea.style.display = 'flex'

//製造每張花色與牌 並套入圖片
function createCard() {
	BottomDeck.forEach((decks,index) => {
		const bottomDeckElem = document.createElement('div')
		bottomDeckElem.id =`bottom-deck-elem-${index}`
		bottomDeckElem.style.position = 'relative'
		bottomDeckElem.style.height = '600px'
		bottomDeckElem.style.width = '172px'
		bottomDeckElem.style.fontSize = '16px'
		bottomDeckElem.style.userSelect = 'none'
		bottomDeckElem.style.display = "flex"
		bottomDeckElem.style.alignItems = "center"
		bottomDeckElem.style.justifyContent = "center"
		
		
		decks.forEach((card,cardindex) => {
			const cardElem = document.createElement('img')
			cardElem.draggable = false
			//用position=absolute來製造每張牌堆疊的感覺
			cardElem.style.position = 'absolute'
			cardElem.style.color = transformNumberToBackgroundColor(card)
			//將每張牌套上圖片
			cardElem.src = `ui/${card}.svg`
			cardElem.style.padding = '0px'
			
			//先將牌放在視窗外
			cardElem.style.top ='-300px'
			cardElem.style.left = '-2000px'
			
			//設定特效
			cardElem.style.transitionProperty = 'all'
			cardElem.style.transitionDuration = '0.3s' 
			cardElem.id = card
			cardElem.cardNumber = card
			cardElem.deckIndex = index
	
			if(cardindex === decks.length -1){
				cardElem.draggable = true
			}
			//發牌的 牌飛入的特效
			setTimeout(()=>{
				cardElem.style.top =cardindex * 30 +'px'
				cardElem.style.left = '0px'
			},(cardindex +1) * (index +1) * 30)
			
			//刪除LEFT屬性 避免將牌放到上方會發生bug
				setTimeout(()=>{
					cardElem.style.left = ''
				},2000)
			
			bottomDeckElem.appendChild(cardElem)
		})
		BottomArea.appendChild(bottomDeckElem)
	})
	
}
createCard()


//創造上方兩個牌區
const LeftTopArea = document.querySelector('.LeftTopArea')
LeftTopArea.style.display = 'flex'
const RightTopArea = document.querySelector('.RightTopArea')
RightTopArea.style.display = 'flex'
function createTopArea(){

for(i=0;i<4;i++){
	const LeftTopElem = document.createElement('div')
			LeftTopElem.style.width = '100%'
			LeftTopElem.style.height = '240px'
			LeftTopElem.style.border ='1px solid #A3A3A3'
			LeftTopElem.style.borderRadius = "10px"
			LeftTopElem.style.display = "flex"
			LeftTopElem.style.alignItems = "center"
			LeftTopElem.style.justifyContent = "center"
			LeftTopArea.appendChild(LeftTopElem)
}

for(i=0;i<4;i++){
	const RightTopElem = document.createElement('div')
			RightTopElem.style.width = '100%'
			RightTopElem.style.height = '240px'
			RightTopElem.style.border ='1px solid #A3A3A3'
			RightTopElem.style.borderRadius = "10px"
			RightTopElem.style.display = "flex"
			RightTopElem.style.alignItems = "center"
			RightTopElem.style.justifyContent = "center"
			RightTopElem.style.backgroundImage = `url(ui/0${i}.svg)`
			RightTopElem.style.backgroundRepeat = 'no-repeat'
			RightTopElem.style.backgroundPosition = 'center'
			RightTopArea.appendChild(RightTopElem)
}
}
createTopArea()


//如果是bottomDeck內的最下面的牌 就加上draggable 讓牌可以拖動
function checkLastCard(){
	var deck  = BottomArea.firstElementChild
	for(i=0;i<BottomArea.childElementCount;i++){
		if(deck.lastElementChild){deck.lastElementChild.draggable = true}
		deck = deck.nextElementSibling
	}
}

//用檢查是否BottomDeck全部的牌都能拖動 來確認遊戲是否結束 
function checkGameEnd() {
	var deck  = BottomArea.firstElementChild
	for(i=0;i<BottomArea.childElementCount;i++){
		if(!deck.firstElementChild.draggable){break}
		deck = deck.nextElementSibling
		if(!deck){endGame()}
	}
}
//遊戲結束動畫
function endGame(){
	
	//結束計時
	window.clearInterval(mytimer)
	
	//用計時器設定 將牌疊到右上牌區
	for(let i=0;i<13;i++){
		(function(i){
	window.setTimeout(function(){
		let card1 = document.getElementById(`${i+1}`)
		let card2 = document.getElementById(`${i+14}`)
		let card3 = document.getElementById(`${i+27}`)
		let card4 = document.getElementById(`${i+40}`)
		RightTopArea.firstElementChild.appendChild(card1)
		RightTopArea.firstElementChild.nextElementSibling.appendChild(card2)
		RightTopArea.lastElementChild.previousElementSibling.appendChild(card3)
		RightTopArea.lastElementChild.appendChild(card4)
		card1.style.top = '79px'
		card2.style.top = '79px'
		card3.style.top = '79px'
		card4.style.top = '79px'},500*i)})(i)
	}
	
	//you win 的彈出視窗
	let windowWin = document.createElement('div')
	windowWin.style.width = '450px'
	windowWin.style.height = '300px'
	windowWin.style.opacity = 0
	windowWin.style.backgroundColor = '#FFFFFF'
	windowWin.style.position = 'absolute'
	windowWin.style.top = '50%'
	windowWin.style.left = '50%'
	windowWin.style.transform = 'translate(-50%, -50%)'
	windowWin.style.transition = 'opacity 1s'
	windowWin.style.display = 'flex'
	windowWin.style.flexDirection = 'column'
	windowWin.style.justifyContent = 'center'
	windowWin.innerHTML = `<h2>You Win !</h2><h2>使用了${mins.innerHTML}</h2>`
	
	container.appendChild(windowWin)
	
	//3秒後彈出 you win 視窗
	setTimeout(()=>{
		windowWin.style.opacity = 1
	},3000)
}


//測試遊戲結束的作弊代碼
function cheat() {
		var deck  = BottomArea.firstElementChild
	for(i=0;i<BottomArea.childElementCount;i++){
		deck.firstElementChild.draggable = true
		deck = deck.nextElementSibling
	}
}

//算出拖拉的牌 下方連著幾張牌
function cardStackedDown(data){
	var StackedNumber = 1;
	var countData = data
	while(countData.nextElementSibling){
	StackedNumber ++
	countData = countData.nextElementSibling
	}
	return StackedNumber
}


//拖拉功能
let data 
let dataParent 
let dataCopy
function dragCard(e){
	e.preventDefault()

	data = e.target

}
function dropCard(e){
	e.preventDefault()
	

	//下方牌區堆疊
	if(e.target.parentElement == BottomArea && e.target.childElementCount == 0){
		//undo功能的變數
	undoRecord()
	
		
		//如果是從左上到下方 CardsCanMove ++
		if(LeftTopArea.contains(data)){CardsCanMove ++}
		
		
		if(cardStackedDown(data) <= CardsCanMove){
		var data2 = data.nextElementSibling
		e.target.appendChild(data)
		data.style.top ='0px'
		data = data2
		while(data != null){
		data2 = data.nextElementSibling
		e.target.appendChild(data)
		data.style.top = (parseInt(data.previousElementSibling.style.top)+30) + "px"
		data = data2
		}
		console.log('下方牌區堆疊')
			}
		checkLastCard()
	checkGameEnd()
	}
	if(((data.cardNumber+1) % 13  == e.target.cardNumber % 13) && (data.style.color != e.target.style.color) && (e.target.parentElement.parentElement == BottomArea) && (e.target.nextElementSibling == null)){
		
		//undo功能的變數
	undoRecord()
	
		
		//如果是從左上到下方 CardsCanMove ++
		if(LeftTopArea.contains(data)){CardsCanMove ++}
		
		
		
		if(cardStackedDown(data) <= CardsCanMove){
		do{
		var data2 = data.nextElementSibling
		e.target.parentNode.appendChild(data)
		data.style.top = (parseInt(data.previousElementSibling.style.top)+30) + "px"
		data = data2
		}while(data != null)
		console.log('下方牌區堆疊')
			}
		checkLastCard()
	checkGameEnd()
	}
	//放到左上牌區
	if((e.target.parentElement == LeftTopArea) && !data.nextElementSibling){
		
		//undo功能的變數
	undoRecord()
	
		data.style.top = '79px'
		e.target.appendChild(data)
		CardsCanMove --
		console.log('放到左上牌區')
		checkLastCard()
	checkGameEnd()
	}
	//四種 A 放到右上牌區
	if(e.target.parentElement == RightTopArea){
		
		//undo功能的變數
	undoRecord()
	
		
		switch(data.cardNumber){
			case 1:
				RightTopArea.firstElementChild.appendChild(data)
				data.style.top = '79px'
				break
			case 14:
				RightTopArea.firstElementChild.nextElementSibling.appendChild(data)
				data.style.top = '79px'
				break
			case 27:
				RightTopArea.lastElementChild.previousElementSibling.appendChild(data)
				data.style.top = '79px'
				break
			case 40:
				RightTopArea.lastElementChild.appendChild(data)
				data.style.top = '79px'
				break
		}
		console.log('四種 A 放到右上牌區')
		checkLastCard()
	checkGameEnd()
	}
	//放完 A 後 其他牌放上右上牌區
	if((e.target.cardNumber == (data.cardNumber -1)) && e.target.parentElement.parentElement == RightTopArea){
		
		//undo功能的變數
	undoRecord()
		
		
		e.target.parentElement.appendChild(data)
		data.style.top = '79px'
		console.log('放完 A 後 其他牌放上右上牌區')
		
		checkLastCard()
	checkGameEnd()
	}
	
}
function allowDrop(e){
	e.preventDefault()
}


//事件監聽拖拉功能
const container = document.querySelector('.container')
container.addEventListener('drag' ,dragCard)
container.addEventListener('drop' ,dropCard)
container.addEventListener('dragover' ,allowDrop)


//計時功能
const mins = document.querySelector('.mins')
let countTimeSec = 0
let countTimeMin = 0
function timer(){
	countTimeSec ++
	if(countTimeSec == 60){
		countTimeMin ++
		countTimeSec = 0
	}
	mins.innerHTML = ' ' + countTimeMin + ' : ' + countTimeSec
}
var mytimer = window.setInterval(timer,1000)


//暫停功能
var mask = document.querySelector('.mask')
var menu = document.querySelector('.menu')
var callMenu = document.querySelector('#callMenu')
var btnBack = document.querySelector('#btnBack')
var btnRestart = document.querySelector('#btnRestart')
var btnNewgame  =document.querySelector('#btnNewgame')
callMenu.addEventListener('click',pause)
btnBack.addEventListener('click',continueTime)
btnRestart.addEventListener('click',restartGame)
btnNewgame.addEventListener('click',newgame)
function pause(){
	mask.classList.add('maskactive')
	menu.classList.add('active')
	window.clearInterval(mytimer)
	
}

function continueTime(){
	mask.classList.remove('maskactive')
	menu.classList.remove('active')
	mytimer = window.setInterval(timer,1000)
}

//重新開始這局
function restartGame(){
	BottomArea.innerHTML = ''
	LeftTopArea.innerHTML = ''
	RightTopArea.innerHTML = ''
	createCard()
	createTopArea()
	mask.classList.remove('maskactive')
	menu.classList.remove('active')
	countTimeSec = 0
	countTimeMin = 0
	mytimer = window.setInterval(timer,1000)
}

//重新開始新的遊戲
function newgame(){
	window.location.reload()
}

//undo 功能
const undoBtn = document.querySelector('#undo')
	undoBtn.addEventListener('click',undoNow)

	//紀錄拖動之前的data和data.parentElement
function undoRecord(){
	dataCopy = data
	dataParent = data.parentElement
}

function undoNow(){
	//先判斷是不是下方牌區 如果是的話 原先data牌的上一張draggle先回復成false
		if(BottomArea.contains(dataParent)){
			dataParent.lastElementChild.draggable = false
		}
	//判斷先前是不是上方牌區的牌 如果是的話 回復後要設定TOP為79px
	if(TopArea.contains(dataParent)){
		dataParent.appendChild(dataCopy)
		dataCopy.style.top = '79px'
	}
	//判斷上一步是不是一次拖拉很多張 
	else if(!dataCopy.nextElementSibling){dataParent.appendChild(dataCopy)
	dataCopy.style.top = (parseInt(dataCopy.previousElementSibling.style.top)+30) + "px"								
									}
	//如果上一步一次拖拉很多張牌
	else{
		do{
		var data2 = dataCopy.nextElementSibling
		dataParent.appendChild(dataCopy)
		dataCopy.style.top = (parseInt(dataCopy.previousElementSibling.style.top)+30) + "px"
		dataCopy = data2
		}while(dataCopy != null)
			}
	}