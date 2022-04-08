function getStyle(elem, styleName){  
    if(elem.style[styleName]){ //获取内联样式  
        return elem.style[styleName];  
    }  
    else if(elem.currentStyle){ //IE特有的属性  
        return elem.currentStyle[styleName];  
    }  
    else if(window.getComputedStyle){ //DOM标准属性  
        return window.getComputedStyle(elem, null)[styleName];  
    }  
    else{   
        return null;  
    }  
}  