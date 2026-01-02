
const { createApp, ref } = Vue;

var serviceApp=createApp({
    data(){
        return{
            Services: []
        }
    }
}).mount("#services");


$.ajax({
    url:"/services",
    method:"get",
    dataType:"json",
    success: (result)=>{
        serviceApp.Services = result;
    }
})



var portfolioApp=createApp({
    setup(){
        return{
            Portfolio: ref([])
        }
    }
}).mount("#portfolio");

$.ajax({
    url:"/portfolio",
    method:"get",
    dataType:"json",
    success: (result)=>{
        portfolioApp.Portfolio = result;
    }
})



var YOOOOApp=createApp({
    setup(){
        return{
            YOOOO: ref([])
        }
    }
}).mount("#YOOOO");

$.ajax({
    url:"/YOOOO",
    method:"get",
    dataType:"json",
    success: (result)=>{
        YOOOOApp.YOOOO = result;
    }
})