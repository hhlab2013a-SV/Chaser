{}
//---
function calculate(){
    var result = 0;
    var type;
    var age;

    age = 10;
    type = 1;

    if(age <= 11){
        if(type == 1){
            result = 3900;
        }else{
            result = 6900;
        }
    }else if(age <= 17){
        if(type == 1){
            result = 5000;
        }else{
            result = 8800;
        }
    }else{
        if(type == 1){
            result = 5800;
        }else{
            result = 10000;
        }
    }

    return result;
}

calculate();
