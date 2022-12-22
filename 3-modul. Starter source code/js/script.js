window.addEventListener('DOMContentLoaded',()=>{
    const tabsParent=document.querySelector('.tabheader__items'),
    tabs=document.querySelectorAll('.tabheader__item'),
    tabsContent=document.querySelectorAll('.tabcontent'),
    loader=document.querySelector('.loader')

  // Loader
  setTimeout(() => {
    loader.style.opacity = '0'
    setTimeout(() => {
      loader.style.display = 'none'
    }, 500)
  }, 2000)

    //tabs
    function hideTabs(){
        tabsContent.forEach((item)=>{
            // item.style.display='none';
            item.classList.add('hide')
            item.classList.remove('show','fade')
        })

        tabs.forEach((item)=>{
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabs(i=0){
        // tabsContent[i].style.display='block';
        tabsContent[i].classList.add('show','fade')
        tabsContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabs()
    showTabs()


    tabsParent.addEventListener('click',(event)=>{
        const target=event.target
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item,idx)=>{
                if(target==item){
                    hideTabs();
                    showTabs(idx);
                    
            }
        })
    }
})

//deadline

const deadline='2022-12-31'

function getTimeRemaining(endTime) {
    let days,hours,minutes,seconds
    const time=Date.parse(endTime)-Date.parse(new Date())
    if(time<=0){
        days=0
        hours=0
        minutes=0
        seconds=0
    }
    else{
        days=Math.floor(time/(1000*60*60*24))
        hours=(Math.floor(time/(1000*60*60))%24)
        minutes=(Math.floor(time/(1000*60))%60)
        seconds=(Math.floor(time/(1000))%60)
    }

    return{time,days,hours,minutes,seconds}
    
}

function getZero(num){
    if(num>=0&&num<10){
        return `0${num}`
    }

    else{return num}
}

function setClock(selector,endTime) {
    const time=document.querySelector(selector),
    days=document.querySelector('#days'),
    hours=document.querySelector('#hours'),
    minutes=document.querySelector('#minutes'),
    seconds=document.querySelector('#seconds'),
    timeInterval=setInterval(upDate,1000)

    upDate()

    function upDate(){
        const t=getTimeRemaining(endTime)

        days.innerHTML=getZero(t.days)
        hours.innerHTML=getZero(t.hours)
        minutes.innerHTML=getZero(t.minutes)
        seconds.innerHTML=getZero(t.seconds)

        if(t.time<=0){
            clearInterval(timeInterval)
        }
    }
    
}
setClock('.timer',deadline)

//modal
const dataTrigger=document.querySelectorAll('[data-modal]'),
modal=document.querySelector('.modal'),
modalCloseBtn=document.querySelector('[data-close]');
console.log(modal);

function openModal(){
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow='hidden'
    clearInterval(modalTimerId)
}

dataTrigger.forEach((item) => {
    item.addEventListener('click',openModal)
})


modalCloseBtn.addEventListener('click',()=>{
    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow=''
})

modal.addEventListener('click',(e)=>{
    if(e.target==modal){
        modal.classList.remove('show')
        modal.classList.add('hide')
        document.body.style.overflow=''
    }
})

document.addEventListener('keydown',(e)=>{
    if(e.code=='Escape'&& modal.classList.contains('show')){
        modal.classList.remove('show')
        modal.classList.add('hide')
        document.body.style.overflow=''
    }
})



const modalTimerId = setTimeout(openModal,3000)

function showModalScrol(){
    if(
        window.pageYOffset+document.documentElement.clientHeight>=document.body.scrollHeight
    ){
        openModal()
        window.removeEventListener('scroll',showModalScrol)
    }
}
window.addEventListener("scroll",showModalScrol)
})