var fileName;
  
var doesExist = process.argv[2];

  if (doesExist == null){
    fileName = "database.json";
    console.log("no new file");
  }
  else if(doesExist != null){
    fileName = doesExist;
    console.log(doesExist);
  }



function doesFileExist(){
  const fs = require('fs')

  const path = fileName;

  try {
    if (fs.existsSync(path)) {
      console.log("existsssssssss");
    }
    else {
      var x = JSON.stringify(tasks);
      fs = require('fs');
      fs.writeFileSync(fileName, x);
    }
  } catch(err) {
    console.error(err)
  }
}

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  load();
  doesFileExist();
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

var tasks = [];


/**
 * shows tasks
 *
 * @returns {tasks}
 */
 function list(){
  for ( var i = 0 ; i < tasks.length ; i++ ){
    console.log((i+1) + ' - ' + tasks[i].checkbox + ' ' + tasks[i].task);
  }
}

/**
 * add tasks
 *
 * @add {task}
 */
function add(toAdd){
  var str = toAdd;
  var x = {check:"false" , checkbox:"[ ]" , task:str};
  tasks.push(x);
}


/**
 * remove last task
 *
 * @remove {last task}
 */
function remove(){
  tasks.pop();
}
/**
 * remove the specific task
 *
 * @remove {specific task}
 */
function removeTask(taskNum){
  var num = taskNum - 1;
  if( taskNum < 0 || taskNum > tasks.length){
    console.log("Number doesn't exist");
  }
  tasks.splice(num,1);
}

/**
 * edits the specific task
 *
 * @edits {specific task}
 */
function edit(editNum,toEdit){
  var num = editNum - 1;
  tasks[num].task = toEdit;
}

/**
 * edits the last task
 *
 * @edits {last task}
 */
function editLast(toEdit){
  var num = tasks.length-1;
  tasks[num].task = toEdit;
}


/**
 * checks the finished task
 *
 * @checks {checks task}
 */
function check(checkNum){
  var num = checkNum - 1;
  tasks[num].check = true;
  tasks[num].checkbox = "[x]";
}

/**
 * unchecks the unfinished task
 *
 * @unchecks {unchecks task}
 */
function uncheck(uncheckNum){
  var num = uncheckNum - 1;
  tasks[num].check = false;
  tasks[num].checkbox = "[ ]";
}

/**
 * shows help
 * shows all commands
 *
 * @returns {void}
 */
 function help(){
  console.log('--------------------------------------------------------');
  console.log('hello              -------> prints hello');
  console.log('hello + name       -------> prints hello name');
  console.log('add + task         -------> adds new task to existing list');
  console.log('remove             -------> removes the last task from the list');
  console.log('remove + number    -------> removes the defined task number from the list');
  console.log('edit + number      -------> edits the task number at the specified number from the list');
  console.log('edit + task        -------> edits the last task from the list');
  console.log('check + number     -------> checks the task done from the list');
  console.log('uncheck + number   -------> unchecks the task not finished from the list');
  console.log('list               -------> shows all tasks');
  console.log('help               -------> shows all commands');
  console.log('quit               -------> quits file');
  console.log('exit               -------> exits file');
  console.log('--------------------------------------------------------');
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  let name = text.substr(5);
  let toAdd = text.substr(4);
  let taskNum = text.substr(6); //remove 4
  let toEdit = text.substr(7);
  let toEditlast = text.substr(5);
  let editNum = text.substring(5,6);
  let checkNum = text.substr(5);
  let uncheckNum = text.substr(7);
  //console.log(toEdit);
  //console.log(uncheckNum);
  //var x = JSON.stringify(tasks);
  //console.log(x);

  if (text.split(" ",1) == 'hello'){
    greeting(name);
  }
  else if (text.split(" ", 1) == 'add'){
    add(toAdd);
  }
  else if (text === 'check\n'){
    console.log('error');
  }
  else if (text.split(" ",1) == 'check'){
    check(checkNum);
  }
  else if (text === 'uncheck\n'){
    console.log('error');
  }
  else if (text.split(" ",1) == 'uncheck'){
    uncheck(uncheckNum);
  }
  else if (text === 'add\n'){
    console.log('error');
  }
  else if (text === 'remove\n'){
    remove();
  }
  else if (text.split(" ",1) == 'remove'){
    removeTask(taskNum);
  }
  else if (text === 'edit\n'){
    console.log('error');
  }
  else if (text.match(/edit\s\d+/)){
    edit(editNum,toEdit);
  }
  else if (text.match(/edit\s\D+\w*/)){
    editLast(toEditlast);
  }
  else if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === 'hello\n'){
    hello();
  }
  else if(text === 'help\n'){
    help();
  }
  else if(text === 'list\n'){
    list();
  }
  else if(text === 'save\n'){
    save();
  }




  else if(text=== 'load\n'){
    load();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello + name
 *
 * @returns {hello + name}
 */
function greeting(name){
  name = name.trim();
  console.log('Hello '+name+'!');
}
/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!')
}



function load(){
  const fs = require('fs');

  let rawdata = fs.readFileSync(fileName);
  tasks = JSON.parse(rawdata);
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  var x = JSON.stringify(tasks);
  fs = require('fs');
  fs.writeFileSync(fileName, x);
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Abbass Kaouk")
