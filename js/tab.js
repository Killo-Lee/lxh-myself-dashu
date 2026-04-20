function tab(dom1,dom2,on){
   var btns = document.querySelectorAll(dom1);
   var divs = document.querySelectorAll(dom2);
   //遍历循环按钮 给每个按钮添加点击事件
    // i = 0 1  2  3
    for(var i=0;i<btns.length;i++){
        //给每个按钮添加id属性
        // dom.属性 =下标
         btns[i].index =i
       
        //事件的里面访问不了i，因为当我点击按钮的时候i已经执行完毕了所以事件的里面i=4
        //btn[i].onclick = btn[i]['onclick']
        btns[i][on] = function(){
            //清空所有类名
            for(var j = 0;j<btns.length;j++){
                btns[j].className = "";
                //隐藏所有的div
                divs[j].style.display = 'none';                                          
            }
            // 只给当前点击的添加类名
            this.className='active'
            // console.log(this,'你点击了那个按钮this就属于谁')
            divs[this.index].style.display = 'block';
        }
    }
}