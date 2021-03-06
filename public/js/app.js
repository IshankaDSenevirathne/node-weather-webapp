const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
messageOne.textContent=''
weatherForm.addEventListener('submit',(e)=>{
   e.preventDefault()
   const location=search.value

   messageOne.textContent='Loading...'
   fetch('/weather?address='+location).then((response)=>{
      response.json().then((data)=>{
         if(data.error){
            messageOne.textContent='Error: '+data.error
         }else{
            messageOne.textContent=data.location+'   :   '+data.forcast
         }
      })
   })
 })