const sellersDiv=document.querySelector("#getSellers");
const chatDiv=document.querySelector("#chat");
const getSellerAPI="http://localhost/backend/getSellers.php";
const getMessagesAPI="http://localhost/backend/getMessages.php";
const addMessageAPI="http://localhost/backend/addMessage.php";
let inputValue;

const getSellers=()=>{//get sellers and show them in sellers div
    axios.get(getSellerAPI)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        console.log(response.data)
        //Loop over the response
        response.data.forEach(element => {
            const seller=document.createElement("div");
            sellersDiv.appendChild(seller);
            seller.innerText=element.username;
            seller.style.backgroundColor="#1F7A8C";
            seller.style.margin="1px";
            seller.classList.add("seller-row");
            seller.addEventListener("click",function(){//on clicking on seller row, client is able to start chat
                startChat(element.id);

            });
        });
        });
           
    }      

const startChat=(sellerid)=>{
    
    const btmDiv=document.createElement("div");
    btmDiv.classList.add("input-msg")
    const inputMessage=document.createElement("INPUT");
    inputMessage.setAttribute("type", "text");
    inputMessage.classList.add("message-input");
    inputMessage.placeholder="Type Your Message Here..";
    inputValue=inputMessage.value;
    console.log(inputValue)
    btmDiv.appendChild(inputMessage);
    
    const sendBtn=document.createElement("button");
    sendBtn.classList.add("send-btn");
    sendBtn.innerText="Send";
    sendBtn.id=sellerid;
    sendBtn.addEventListener("click",function(){//on clicking on send button, sendMessage function will be executed
        sendMessage(sellerid)
       })
    btmDiv.appendChild(sendBtn);
    const data = new FormData();
    data.append("seller_id", sellerid);
    data.append("user_id", 41)
    
    axios.post(getMessagesAPI,data)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        
        if(response.data.length==0){//if no old messages found, display No Messages
            chatDiv.innerText=" "
            chatDiv.innerText="No messages"
            chatDiv.style.color="white"
            chatDiv.appendChild(btmDiv)
    }
        //if there are old messages,display them
        else{
            chatDiv.innerText=" ";
            for(let i = 0; i < response.data.length; i++){
                const message=document.createElement("div");
                message.classList.add("message");
                if((response.data[i].sender_id==sellerid && response.data[i].reciever_id==41) || (response.data[i].sender_id==41 && response.data[i].reciever_id==sellerid)){
                     message.innerText=response.data[i].message;
                    chatDiv.appendChild(message)
                }
                
            } 
            chatDiv.appendChild(btmDiv)
      }
    });

}

const sendMessage=(id)=>{//post input data and user ids to database
    alert(inputValue)
    const data = new FormData();
   data.append("sender_id",1)
    data.append("reciever_id", id);
    data.append("message", value);
    axios.post(addMessageAPI,data)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
        else{
            alert("sent")
        }
        
    });
}
window.addEventListener("load",getSellers)