var expected_ouputs=[0,1,1,0];
var inputs=[[0,0],[0,1],[1,0],[1,1]], random_arrays=[], final_error_array=[],final_error=0;
var sum_first_hidden_input_array=[],sum_second_hidden_input_array=[],final_ouput=[];
var count0=1,count1=1,final_output=0, hidden_to_ouput_0=[],hidden_to_ouput_1=[];

function sigmoidal(z){
  return 1/(1+Math.exp(-z));
}

function generate_weights(quantity){
  var ws=[];
  for(var i = 0; i < quantity; i++){
    ws[i]=Math.random();
  }
  return ws;
}
 
 function calculate_first_inputs(){
  var weights=generate_weights(4);
    sum_first_hidden_input_array.push(sigmoidal(inputs[0][0]*weights[0]+inputs[0][1]*weights[2]),sigmoidal(inputs[2][0]*weights[0]+inputs[2][1]*weights[2]));
    sum_second_hidden_input_array.push(sigmoidal(inputs[1][0]*weights[1]+inputs[1][1]*weights[3]),sigmoidal(inputs[3][0]*weights[1]+inputs[3][1]*weights[3]));
 } 

 function calculate_second_inputs(){
    calculate_first_inputs();
    var qs=generate_weights(2);
    for(var i=0; i < 2; i++){
      hidden_to_ouput_0.push(Math.pow(sigmoidal(sum_first_hidden_input_array[i]*qs[0])-expected_ouputs[i],2));
      final_ouput.push(sigmoidal(sum_first_hidden_input_array[i]*qs[0]));
      hidden_to_ouput_1.push(Math.pow(sigmoidal(sum_second_hidden_input_array[i]*qs[1])-expected_ouputs[i+2],2));
      final_ouput.push(sigmoidal(sum_second_hidden_input_array[i]*qs[1]));
    }
      var val1= hidden_to_ouput_0.reduce(function(a, b){return a+b;})
      var val2= hidden_to_ouput_1.reduce(function(a, b){return a+b;})
      return val1+val2;
  }
    
console.log("-====================XOR Problem ANN FIME-ITS Juan Ortiz===================-");
function generate_randoms_and_select(){
  hidden_to_ouput_0.length=0; hidden_to_ouput_1.length=0;
  if(random_arrays.length<2){
    random_arrays.push(calculate_second_inputs());
    console.log("Ouputs for the "+random_arrays.length+" random training ",final_ouput);
    final_ouput.length=0;
    generate_randoms_and_select();
  }else{
    console.log("First Selected Ouputs: ", random_arrays);
    var recent=0;
    while(!(count0==10 || count1==10)){
      if(random_arrays[0] < random_arrays[1]){
        recent=random_arrays[0];
        hidden_to_ouput_0.length=0; hidden_to_ouput_1.length=0;
        final_ouput.length=0;
        random_arrays.splice(1,1,calculate_second_inputs());
        console.log("Minimum value: ",random_arrays[0]); 
        if(count0==0){
        console.log("New Outputs ",final_ouput);      
        }
        count1=0;count0++; 
      }else{
        hidden_to_ouput_0.length=0; hidden_to_ouput_1.length=0;
        final_ouput.length=0;
        random_arrays.splice(0,1,calculate_second_inputs());
        if(count1==0){
        console.log("Minimum value: ",random_arrays[1]);
        console.log("New Outputs ",final_ouput);      
         }
        count0=0;count1++;
      }
    }
    final_output=Math.min(random_arrays[0],random_arrays[1]);
  }
}
generate_randoms_and_select();

