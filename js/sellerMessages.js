const sellersDiv=document.querySelector("#getSellers");
const chatDiv=document.querySelector("#chat");
const homeButton = document.querySelector(".navbar-item");
const getSellerAPI="http://localhost/backend/getClients.php";
const getMessagesAPI="http://localhost/backend/getMessages.php";
const addMessageAPI="http://localhost/backend/addMessage.php";
let inputValue;
const userID=localStorage.getItem("userID");
console.log(userID)
const getSellers=()=>{//get clients and show them in clients div
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
            console.log(element.id)
            const seller=document.createElement("div");
            sellersDiv.appendChild(seller);
            seller.innerText=element.username;
            seller.style.backgroundColor="#1F7A8C";
            seller.style.margin="1px";
            seller.classList.add("seller-row");
            seller.addEventListener("click",function(){//on clicking on client row, client is able to start chat
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

    btmDiv.appendChild(inputMessage);
    
    const sendBtn=document.createElement("button");
    sendBtn.classList.add("send-btn");
    sendBtn.innerText="Send";
    sendBtn.id=sellerid;
    sendBtn.addEventListener("click",function(){//on clicking on send button, sendMessage function will be executed
        inputValue=inputMessage.value;
        sendMessage(sellerid,inputValue)
       })
    btmDiv.appendChild(sendBtn);
    const data = new FormData();
    data.append("seller_id", sellerid);
    data.append("user_id", userID)
    
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
                if((response.data[i].sender_id==sellerid && response.data[i].reciever_id==userID) || (response.data[i].sender_id==userID && response.data[i].reciever_id==sellerid)){
                     message.innerText=response.data[i].message;
                    chatDiv.appendChild(message)
                }
                
            } 
            chatDiv.appendChild(btmDiv)
      }
    });

}

const sendMessage=(id,value)=>{//post input data and user ids to database
    const data = new FormData();
   data.append("sender_id",userID)
    data.append("reciever_id", id);
    data.append("message", value);
    axios.post(addMessageAPI,data)
    .then(response =>  {
        //Show error
        if (response.error != null) {
            console.log("error")
            return
        }
       
        
    });
}

homeButton.onclick = function() {
    window.location.replace("add-product.html");
}

window.addEventListener("load",getSellers)