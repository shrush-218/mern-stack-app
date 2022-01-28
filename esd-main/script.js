api_url="https://esdsemviappnodejs.herokuapp.com/user"
function loadData(records){
    console.log(records.name);
    table_data=``;
    for(let i=0; i< records.length;i++){
        table_data+=`
        <tr>
            <td>${records[i].name}</td>
            <td>${records[i].age}</td>
            <td>${records[i].city}</td>
            <td>
                <button type="button" class="btn btn-info"><a href="edit.html?id=${records[i]._id}">Edit</a></button>
                <button type="button" class="btn btn-danger" onclick="deleteData('${records[i]._id}');">Delete</button>
            </td>
        </tr>
    `
    }
   
    document.getElementById("table_data").innerHTML=table_data;
}

function getData(){
    fetch(api_url)
    .then((response)=> response.json())
    .then((data)=>{
        // console.log(data);
        loadData(data);
    })
}

function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data[0]._id;
		document.getElementById("name").value = data[0].name;
		document.getElementById("age").value = data[0].age;
		document.getElementById("city").value = data[0].city;
	})
}

function postData(){
    console.log("postData() called");
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var city = document.getElementById("city").value;
    data = {name:name, age:age, city:city};
    // console.log(data);
    fetch(api_url, {
        method:"post",
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        },
        body: JSON.stringify(data)
    }).then((response)=> response.json)
    .then((data)=>{
        // let newData = data.save();
        console.log(data);
        window.location.href="index.html";
    })
}

function putData(){
    
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var city = document.getElementById("city").value;
    data = {id:id,name:name, age:age, city:city};
    console.log(data);
    // console.log(data);
    fetch(api_url, {
        method:"put",
        headers:{
            'Accept':"application/json",
            'Content-Type':"application/json"
        },
        body: JSON.stringify(data)
    }).then((response)=> response.json)
    .then((data)=>{
        // let newData = data.save();
        console.log(data);
        window.location.href="index.html";
    })
}

function deleteData(id){
    user_input= confirm("Are you Sure: You want to delete the record")
    if(user_input){
        fetch(api_url, {
            method:"delete",
            headers:{
                'Accept':"application/json",
                'Content-Type':"application/json"
            },
            body: JSON.stringify({"id":id})
        }).then((response)=> response.json)
        .then((data)=>{
            // let newData = data.save();
            console.log(data);
            window.location.href="index.html";
        })
    }
}